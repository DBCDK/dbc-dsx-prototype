var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var socket = require('socket.io-client').connect();

var _store = {
  ranked: {},
  normal: {},
  pending: false,
  searching: false
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

  normalSearchResult: function(result){
    "use strict";
    _store.pending = false;
    this.pushStore();
  },

  rankedSearch: function(query) {
    "use strict";
    var pids = userStorage.get();
    socket.emit('dsxRankSearchRequest', {
      query: query.split(' '),
      like: pids
    });
  },

  rankedSearchResult: function(result) {
    "use strict";
    _store.pending = false;
    this.pushStore();
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
