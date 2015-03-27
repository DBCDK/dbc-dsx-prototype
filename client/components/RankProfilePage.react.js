var React = require('react');
var Reflux = require('reflux');
var QuestionStore = require('../stores/Questions.store');
var QuestionCard = require('./RankProfileQuestionCard');

var RankProfile = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return QuestionStore.getState();
  },

  componentDidMount: function() {
    "use strict";
    this.listenTo(QuestionStore, () => {
      this.setState(QuestionStore.getState());
    });
  },

  render: function() {
    var currentQuestionIndex = this.state.currentQuestion;
    var currentQuestion = this.state.questions[currentQuestionIndex];
    return (
      <div>
        <QuestionCard covers={currentQuestion.covers} title={currentQuestion.title} creators={currentQuestion.creators[0]}/>

        <div className="rank--buttons">
          <a className="rank--buttons-button" onClick={() => this._onClick('hest')}><img src="images/no-button-normal.png"/></a>
          <a className="rank--buttons-button"><img src="images/yes-button-normal.png"/></a>
        </div>
      </div>
    );
  },

  _onClick: function(event) {
    "use strict";
    console.log(event);
  }
});

module.exports = RankProfile;