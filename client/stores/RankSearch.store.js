var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var socket = require('socket.io-client').connect();

var _store = {
  ranked: [],
  normal: [],
  pending: false,
  didSearch: false,
  query: '',
  view: 'personal', //personal or normal
  text: ''
};

var RankSearchStore = Reflux.createStore({
  getState: function() {
    "use strict";
    return _store;
  },

  normalSearch: function(query) {
    "use strict";

    socket.emit('dsxSearchRequest', {
      query: query.split(' ')
    });
  },

  normalSearchResult: function(result) {
    "use strict";
    this._mapToRankedSearch(result.collections);
  },

  _mapToRankedSearch: function(collections) {
    "use strict";
    collections.forEach(function(normalItem, normalKey) {
      normalItem.normalKey = normalKey + 1;
      normalItem.rankedKey = '?';
      _store.ranked.forEach(function(rankedItem, rankedKey) {
        if(normalItem.id == rankedItem.id) {
          normalItem.rankedKey = rankedKey + 1;
          rankedItem.normalKey = normalKey + 1;
        }
      });
    });
    _store.normal = collections;
    this.pushStore();
    this._setStatus(true, false);
  },

  rankedSearch: function(query) {
    "use strict";
    _store.text = query;
    _store.query = query;
    this._setStatus(false, true);
    var pids = userStorage.get();
    socket.emit('dsxRankSearchRequest', {
      query: query.split(' '),
      like: pids
    });
  },

  rankedSearchResult: function(result) {
    "use strict";
    _store.ranked = result.collections;
    _store.ranked.forEach(function(value, key){
      value.rankedKey = key + 1;
      value.normalKey = '?';
    });
    this.normalSearch(_store.query);
  },

  clear: function() {
    "use strict";
  },

  init: function() {
    "use strict";
    this.listenTo(Actions.search, this.normalSearch);
    this.listenTo(Actions.rank, this.rankedSearch);

    socket.on('dsxRankSearchResponse', this.rankedSearchResult);
    socket.on('dsxSearchResponse', this.normalSearchResult);
  },

  pushStore: function() {
    "use strict";
    this.trigger(_store);
  },

  _setStatus: function(searching, pending) {
    "use strict";
    _store.didSearch = searching;
    _store.pending = pending;
    this.pushStore();
  }
});

module.exports = RankSearchStore;

var userStorage = {
  get: function() {
    "use strict";
    var pids = localStorage.getItem('pids');
    return JSON.parse(pids);
  }
};
