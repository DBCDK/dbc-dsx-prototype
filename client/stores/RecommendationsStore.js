var Reflux = require('reflux');
var Actions = require('../actions/Actions.js');
var Socket = require('socket.io-client').connect();

var _store = {
  result: [],
  pending: false,
  pids: []
};

var RecommendationsStore = Reflux.createStore({
  getState: function() {
    "use strict";
    return _store;
  },

  getRecommendations: function(pids){
    "use strict";
    Socket.emit('dsxRecommendRequest', {query: pids});
    _store.pending = true;
    this.pushStore();
  },

  result: function(result){
    "use strict";
    _store.result = result.collections;
    _store.pending = false;
    this.pushStore();
  },

  setPids: function(){
    "use strict";
    let pids = localStorage.getItem('pids');
    _store.pids = JSON.parse(pids);
    this.pushStore();
  },

  init: function() {
    "use strict";
    Socket.on('dsxRecommendResponse', this.result);

    this.setPids();
  },

  pushStore: function() {
    "use strict";
    this.trigger(_store);
  }
});

module.exports = RecommendationsStore;