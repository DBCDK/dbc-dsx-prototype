var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Socket = require('socket.io-client').connect();

var _store = {
  ranked: {},
  normal: {},
  pending: true,
  searching: false
};

var RankSearchStore = Reflux.createStore({
  getState: function() {
    "use strict";
    return _store;
  },

  normalSearch: function() {
    "use strict";

  },

  rankedSearch: function(query) {
    "use strict";
    console.log(query);
    var pids = userStorage.get();
    console.log(pids);

    Socket.emit('dsxRankSearchRequest', {
      query: query.split(' '),
      like: pids
    });
  },

  rankedSearchResult: function(result) {
    "use strict";
    console.log(result);
  },

  clear: function() {
    "use strict";

  },

  init: function() {
    "use strict";
    this.listenTo(Actions.rankSearch, this.rankedSearch);
    Socket.on('dsxRankSearchResponse', this.rankedSearchResult);

  },

  pushState: function() {
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
