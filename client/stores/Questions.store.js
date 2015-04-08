var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Socket = require('socket.io-client').connect();
//var data = require('');

var _store = {
  questions: [
    /*{
      pid: '870970-basis:24490521',
      title: 'Min kamp',
      creators: ['Karl Ove Knausgård'],
      covers: [],
      pending: true
    },
    {
      pid: '870970-basis:23981343',
      title: 'Møgkællinger',
      creators: ['Gretelise Holm'],
      covers: [],
      pending: true
    },
    {
      pid: '870970-basis:20521104',
      title: 'Månen tur-retur',
      creators: ['Hergé'],
      covers: [],
      pending: true
    },*/
    {
      "id": "870970-basis:44839393",
      "title": "1984",
      "creator": [
        "orwell-george"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:24908747",
      "title": "dyrekirkegården",
      "creator": [
        "king-stephen"
      ],
      "abstract": null,
      "selected": true
    },
    /*{
      "id": "870970-basis:22757636",
      "title": "fermats-store-sætning",
      "creator": [
        "singh-simon"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:45275388",
      "title": "fifty-shades-of-grey",
      "creator": [
        "james-e-l-"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:07352409",
      "title": "frøken-smillas-fornemmelse-for-sne",
      "creator": [
        "høeg-peter"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:26285240",
      "title": "harry-potter-og-halvblodsprinsen",
      "creator": [
        "rowling-joanne-k-"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28282745",
      "title": "havets-katedral",
      "creator": [
        "falcones-ildefonso"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:26752418",
      "title": "pippi-langstrømpe",
      "creator": [
        "lindgren-astrid"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:04656504",
      "title": "rosens-navn",
      "creator": [
        "eco-umberto"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27408958",
      "title": "alkymisten",
      "creator": [
        "coelho-paulo"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:22179969",
      "title": "bravo-to-nul",
      "creator": [
        "mcnab-andy"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:25094042",
      "title": "da-vinci-mysteriet",
      "creator": [
        "brown-dan"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27322697",
      "title": "fasandræberne",
      "creator": [
        "adler-olsen-jussi"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:22340034",
      "title": "hobbitten",
      "creator": [
        "tolkien-j-r-r-"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:50787540",
      "title": "michael-laudrup-en-gentleman-i-nye-klæder",
      "creator": [
        "jonas-nyrup"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28237774",
      "title": "norwegian-wood",
      "creator": [
        "murakami-haruki"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27936121",
      "title": "peter-pedal-på-himmelfart",
      "creator": [
        "rey-h-a-"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27223184",
      "title": "pigen-der-legede-med-ilden",
      "creator": [
        "larsson-stieg"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:04581296",
      "title": "staten",
      "creator": [
        "platon"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27088988",
      "title": "vejen",
      "creator": [
        "maccarthy-mccarthy-cormac"
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