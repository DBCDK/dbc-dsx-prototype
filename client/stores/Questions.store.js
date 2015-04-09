var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Socket = require('socket.io-client').connect();
var _ = require('lodash');

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
    },
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
    },
    {
      "id": "870970-basis:24908747",
      "title": "dyrekirkegården",
      "creator": ["king-stephen"],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:22757636",
      "title": "fermats-store-sætning",
      "creator": ["singh-simon"],
      "abstract": null,
      "selected": true
    },

    {
      "id": "870970-basis:29056714",
      "title": "elefantpassernes-børn",
      "creator": ["høeg-peter"],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:26285240",
      "title": "harry-potter-og-halvblodsprinsen",
      "creator": ["rowling-joanne-k-"],
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
      "id": "870970-basis:28822391",
      "title": "pippi-langstrømpe-flytter-ind-i-villa-villekulla-og-andre-historier",
      "creator": [
        "lindgren-astrid"
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
      "id": "870970-basis:23740338",
      "title": "kodeord-firewall",
      "creator": [
        "macnab-mcnab-andy"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28768656",
      "title": "det-forsvundne-tegn",
      "creator": [
        "brown-dan"
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
      "id": "870970-basis:27567010",
      "title": "de-bedste-historier-om-peter-pedal",
      "creator": [
        "rey-margret"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27598420",
      "title": "mænd-der-hader-kvinder",
      "creator": [
        "larsson-stieg"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:23667495",
      "title": "faidon",
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
    },
    {
      "id": "870970-basis:26738016",
      "title": "drivhusdrømme",
      "creator": [
        "dalby-claus"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:50801241",
      "title": "den-hvide-have",
      "creator": [
        "dalby-claus-pht"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:29022658",
      "title": "blodig-genvej",
      "creator": [
        "hastrup-julie"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:25612833",
      "title": "lækker-mad-på-30-minutter",
      "creator": [
        "christiansen-bo"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:23017253",
      "title": "lækker-mad-til-diabetikere",
      "creator": [
        "monika-donath"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:25230922",
      "title": "ainsley-harriotts-grillbibel",
      "creator": [
        "harriott-ainsley"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28536666",
      "title": "hævnens-gudinde",
      "creator": [
        "blædel-sara"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:26731437",
      "title": "sussi-leo-på-den-2-side",
      "creator": [
        "leo-brinkmann"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27276938",
      "title": "identitet",
      "creator": [
        "brinkmann-svend"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:29496161",
      "title": "giganternes-fald",
      "creator": [
        "follett-ken"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:29531714",
      "title": "at-leve-at-tænke-at-se",
      "creator": [
        "hustvedt-siri"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28455275",
      "title": "fucking-flink",
      "creator": [
        "ap-lars"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:50681580",
      "title": "kaptajn-dinesen",
      "creator": [
        "buk-swienty-tom-oth"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:51087100",
      "title": "jeg-lægger-dine-breve-under-madrassen",
      "creator": [
        "sara-schwardt"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27443885",
      "title": "varm-weekend",
      "creator": [
        "joan-ørting"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27992595",
      "title": "prøverummet",
      "creator": [
        "garbers-lotte"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:44820005",
      "title": "cykling-con-amore",
      "creator": [
        "sørensen-rolf"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:51057376",
      "title": "mtb",
      "creator": [
        "svendsen-søren-pht"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:29071241",
      "title": "mænd-biler",
      "creator": [
        "grau-christian"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:24482561",
      "title": "italienske-motorcykler",
      "creator": [
        "poulsen-villy"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28699034",
      "title": "historien-om-honda-shadow",
      "creator": [
        "andersen-poul-helge"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:50961095",
      "title": "hold-da-helt-fest",
      "creator": [
        "hansen-per-helmer"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28990529",
      "title": "pileflet",
      "creator": [
        "enemark-jane"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:26293642",
      "title": "fotografering-med-digital-spejlrefleks",
      "creator": [
        "schurmann-henrik"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:26629276",
      "title": "fantastiske-synsbedrag",
      "creator": [
        "lars-thomas"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:29475911",
      "title": "fashionable-living",
      "creator": [
        "munthe-naja"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:29144478",
      "title": "all-you-knit-is-love",
      "creator": [
        "haumann-susie"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:27590284",
      "title": "origami-teknik-og-tradition",
      "creator": [
        "dybkjær-hans"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:25704886",
      "title": "den-kreative-klasse",
      "creator": [
        "florida-richard"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:28682328",
      "title": "konkurrencestaten",
      "creator": [
        "pedersen-ove-k-"
      ],
      "abstract": null,
      "selected": true
    },
    {
      "id": "870970-basis:29269815",
      "title": "den-utrolige-historie-om-den-kæmpestore-pære",
      "creator": [
        "strid-jakob-martin-drm"
      ],
      "abstract": null,
      "selected": true
    }
  ],
  currentQuestion: 0
};

var QuestionsStore = Reflux.createStore({
  getState: function() {
    return _store;
  },

  init: function() {
    _store.questions = _.shuffle(_store.questions);
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