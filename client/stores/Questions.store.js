var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Socket = require('socket.io-client').connect();

var _store = {
  questions: [
    {
      "id": "870970-basis:28315341",
      "title": "tusmørke",
      "creator": [
        "meyer-stephenie"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28844891",
      "title": "mount-københavn",
      "creator": [
        "colling-nielsen-kaspar"
      ],
      "abstract": null,
      "selected": true
    }/*,
    {
      "id": "870970-basis:29541256",
      "title": "førsteelskeren",
      "creator": [
        "skov-leonora-christina"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:25993055",
      "title": "filosofi-i-terrorens-tid",
      "creator": [
        "jürgen-habermas"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:29648530",
      "title": "messi",
      "creator": [
        "faccio-leonardo"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:50715272",
      "title": "jeg-er-zlatan",
      "creator": [
        "david-lagercrantz"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:26212871",
      "title": "isprinsessen",
      "creator": [
        "läckberg-camilla"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:24594688",
      "title": "fluefiskeri",
      "creator": [
        "jensen-michael"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28935951",
      "title": "trafikkens-forurening",
      "creator": [
        "kåre-press-kristensen"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:26643325",
      "title": "spil-skak",
      "creator": [
        "novrup-svend"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:25486706",
      "title": "kost-og-graviditet",
      "creator": [
        "langer-jerk-w-"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:26500990",
      "title": "overgangsalder",
      "creator": [
        "langer-jerk-w-"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:50784460",
      "title": "slank-med-low-carb",
      "creator": [
        "helena-møller"
      ],
      "abstract": null,
      "selected": true
    }*/
  ],
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
      if(item.id == pid) {
        item.covers = images;
        item.pending = false;
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
        pid: item.id
      };
      Socket.emit('getImagesRequest', params);
    }
  });
}

module.exports = QuestionsStore;