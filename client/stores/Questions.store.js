var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Socket = require('socket.io-client').connect();
//var data = require('');

var _store = {
  questions: [
    {
      //id: '870970-basis:228650582',
      pid: '870970-basis:51569253',
      title: 'Min kamp',
      creators: ['Karl Ove Knausgård'],
      covers: []
    },
    {
      pid: '870970-basis:228750978',
      title: 'Møgkællinger',
      creators: ['Gretelise Holm'],
      covers: []
    },
    {
      pid: '870970-basis:01264788',
      title: 'Månen tur-retur',
      creators: ['Hergé'],
      covers: []
    }
  ],
  positivePids: [],
  currentQuestion: 0
};

var QuestionsStore = Reflux.createStore({
  getState: function() {
    return _store;
  },

  init: function() {
    enrichQuestionData(this._addCoverUrl);
  },

  _addCoverUrl: function(result) {
    "use strict";
    var that = this;
    var pid = result.pid;
    var images = result.images;
    _store.questions.forEach(function(item) {
      if(item.pid == pid) {
        item.covers = images;
        that.trigger(_store);
      }
    });
  }
});

function enrichQuestionData(callback) {
  Socket.on('getImagesResponse', callback);
  _store.questions.forEach(function(item) {
    if(!item.cover) {
      var params = {
        pid: item.pid
      };
      Socket.emit('getImagesRequest', params);
    }
  });
}

module.exports = QuestionsStore;