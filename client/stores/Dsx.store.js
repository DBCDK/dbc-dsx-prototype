var reflux = require('reflux');
var actions = require('../actions/Actions.js');
var socket = require('socket.io-client').connect();

var _store = {
  selected : [],
  search: {
  },
  recommendation: {},
  rank: {}
}

function _socketSearch(query) {
  socket.emit('dsxSearchRequest', {query : query.split(' ')});
}

var local = {
  get: function () {
    var stored = localStorage.getItem('dsxStoreState');
    stored && JSON.parse(stored);
    _store = stored && JSON.parse(stored) || _store;
  },
  set: function () {
    var string = JSON.stringify(_store);
    console.log(_store);
    console.log(string);
    localStorage.setItem('dsxStoreState', string);
  }
}

local.get();


var DsxStore = reflux.createStore({
  getState: function() {
    return _store;
  },
  search: function(query) {
    _store.search.pending = true;
    _store.search.query = query;
    _store.search.result = null;
    this.pushStore();
    _socketSearch(query);
  },
  getRecommendations: function (ids) {
    socket.emit('dsxRecommendRequest', {query : ids});
    _store.search.pending = true;
    this.pushStore();
  },
  select: function (element) {
    _store.selected.push(element);
    this.pushStore();
  },
  unselect: function (element) {
    console.log(element);
    _store.selected = _store.selected.filter((item) => item.id !== element.id);
    this.pushStore();
  },

  clear: function (type) {
    _store[type] = Array.isArray(_store[type]) ? [] : {};
    this.pushStore();
  },
  result: function (result) {
    _store.search.pending = false;
    _store.search.result = result.collections;
    this.pushStore();
  },
  init: function() {
    this.listenTo(actions.search, this.search);
    this.listenTo(actions.select, this.select);
    this.listenTo(actions.unselect, this.unselect);
    this.listenTo(actions.clear, this.clear);
    this.listenTo(actions.getRecommendations, this.getRecommendations);
    socket.on('dsxSearchResponse', this.result);
    socket.on('dsxRecommendResponse', this.result);

  },
  pushStore: function () {
    this.trigger(_store);
    local.set();
  }
});

module.exports = DsxStore;
