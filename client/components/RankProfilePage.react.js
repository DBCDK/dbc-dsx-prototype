var React = require('react');
var Reflux = require('reflux');
var QuestionStore = require('../stores/Questions.store');
var QuestionCard = require('./RankProfileQuestionCard');

var RankProfile = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    localStorage.setItem('pids', JSON.stringify([]));
    return QuestionStore.getState();
  },

  componentDidMount: function() {
    "use strict";
    this.listenTo(QuestionStore, () => {
      this.setState(QuestionStore.getState());
    });
  },

  render: function() {
    "use strict";
    let currentQuestion = this._getCurrentQuestion();
    if(!currentQuestion) {
      window.location = "/recommendations";
      return;
    }

    let infotext = (JSON.parse(localStorage.getItem('pids')).length >= 5) ? <a href='/search'>Videre til søgning &#8594;</a> : "Skab din egen profil ved at vælge mindst 5 bøger, du godt kan lide.";

    return (
      <div className="rank--page">
        <QuestionCard question={currentQuestion} />

        <div className="rank--buttons">
          <a className="rank--buttons-button" onClick={() => this._onClick()}><img src="images/no-knap.png"/></a>
          <a className="rank--buttons-button" onClick={() => this._onClick(true)}><img src="images/yes-knap.png"/></a>
        </div>
        <span className="rank--page-infotxt p centered">{infotext}</span>
      </div>
    );
  },

  _onClick: function(added) {
    "use strict";
    let currentQuestion = this._getCurrentQuestion();
    let pid = currentQuestion.id;
    if(!pid){
      return;
    }

    if(added) {
      let positivePids = JSON.parse(localStorage.getItem('pids'));
      positivePids.push(pid);
      localStorage.setItem('pids', JSON.stringify(positivePids));
    }

    this.setState((previousState) => {
      return {currentQuestion: previousState.currentQuestion + 1};
    });
  },

  _getCurrentQuestion: function() {
    "use strict";
    let currentQuestionIndex = this.state.currentQuestion;
    if(this.state.questions.length >= currentQuestionIndex + 1){
      return this.state.questions[currentQuestionIndex];
    }

    return false;
  }
});

module.exports = RankProfile;