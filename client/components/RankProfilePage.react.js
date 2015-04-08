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
    var currentQuestion = this._getCurrentQuestion();

    var searchLink = '';
    if(!currentQuestion) {
      searchLink = <a href='/search'>Videre til søgning &#8594;</a>
    }

    return (
      <div className="rank--page">
        <QuestionCard question={currentQuestion} />

        <div className="rank--buttons">
          <a className="rank--buttons-button" onClick={() => this._onClick()}><img src="images/no-button-normal.png"/></a>
          <a className="rank--buttons-button" onClick={() => this._onClick(true)}><img src="images/yes-button-normal.png"/></a>
        </div>
        <div className="rank--searchlink">{searchLink}</div>
      </div>
    );
  },

  _onClick: function(added) {
    "use strict";
    var currentQuestion = this._getCurrentQuestion();
    var pid = currentQuestion.id;
    if(!pid){
      return;
    }

    if(added) {
      var positivePids = JSON.parse(localStorage.getItem('pids'));
      positivePids.push(pid);
      localStorage.setItem('pids', JSON.stringify(positivePids));
    }

    this.setState((previousState) => {
      return {currentQuestion: previousState.currentQuestion + 1};
    });
  },

  _getCurrentQuestion: function() {
    "use strict";
    var currentQuestionIndex = this.state.currentQuestion;
    if(this.state.questions.length >= currentQuestionIndex + 1){
      return this.state.questions[currentQuestionIndex];
    }

    return false;
  }
});

module.exports = RankProfile;