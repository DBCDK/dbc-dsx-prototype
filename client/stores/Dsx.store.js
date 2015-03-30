var reflux = require('reflux');
var actions = require('../actions/Actions.js');
var socket = require('socket.io-client').connect();

var _store = {
  selected: [],
  search: {},
  recommendation: {},
  rank: {}
};

var local = {
  get: function() {
    var stored = localStorage.getItem('dsxStoreState');
    stored && JSON.parse(stored);
    _store = stored && JSON.parse(stored) || _store;
  },
  set: function() {
    var string = JSON.stringify(_store);
    localStorage.setItem('dsxStoreState', string);
  }
};

local.get();

var DsxStore = reflux.createStore({
  getState: function() {
    return _store;
  },
  search: function(query) {
    console.log('search');
    socket.emit('dsxSearchRequest', {query: query.split(' ')});
    _store.search.pending = true;
    _store.search.query = query;
    _store.search.result = null;
    this.pushStore();
  },
  getRecommendations: function(ids) {
    console.log('getRecommendations');
    socket.emit('dsxRecommendRequest', {query: ids});
    _store.search.pending = true;
    this.pushStore();
  },
  select: function(element) {
    _store.selected.push(element);
    this.pushStore();
  },
  unselect: function(element) {
    _store.selected = _store.selected.filter((item) => item.id !== element.id);
    this.pushStore();
  },
  setRecommendations: function(elements) {
    _store.selected = elements;
    this.pushStore();
  },
  clear: function(type) {
    _store[type] = Array.isArray(_store[type]) ? [] : {};
    this.pushStore();
  },
  result: function(result) {
    console.log(result);
    _store.search.pending = false;
    _store.search.result = result.collections;
    this.pushStore();
  },
  rank: function(query, list) {
    console.log('rank');
    _store.search.pending = true;
    _store.search.result = [];
    console.log(list);
    this.pushStore();
    socket.emit('dsxRankSearchRequest', {
      query: query.split(' '),
      like: list.map((item) => item.id)
    });
  },
  init: function() {
    this.listenTo(actions.search, this.search);
    this.listenTo(actions.select, this.select);
    this.listenTo(actions.unselect, this.unselect);
    this.listenTo(actions.clear, this.clear);
    this.listenTo(actions.getRecommendations, this.getRecommendations);
    this.listenTo(actions.setRecommendations, this.setRecommendations);
    this.listenTo(actions.rank, this.rank);
    socket.on('dsxSearchResponse', this.result);
    socket.on('dsxRecommendResponse', this.result);
    socket.on('dsxRankSearchResponse', this.result);

  },
  pushStore: function() {
    this.trigger(_store);
    local.set();
  }
});

module.exports = DsxStore;
