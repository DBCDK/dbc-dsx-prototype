var React = require('react/addons');
var Reflux = require('reflux');
var Swiper = require('../utils/SwipeEvents');

var Question = React.createClass({
  mixins: [Reflux.ListenerMixin],
  swiper: null,

  componenetDidMount: function() {
    this.swiper = new Swiper(this.refs.question.getDomNode(), this.props.answer);
  },

  _sendAnswer: function(selectedOption) {
    this.swiper.clickToSwipe(selectedOption);
  },

  render: function() {
    var question = this.props.question;
    if(!question) {
      return this._basicTemplate();
    }

    var cover = 'images/loader.gif';
    var covers = question.covers;
    var pending = question.pending;
    if(!pending) {
      cover = (covers.length == 0) ? 'images/dummy.jpg' : covers[3].url;
    }

    return (
      <div className="rank--question-card">
        <div className="rank--question-card-img">
          <img className="image" src={cover}/>
        </div>

        <h3>{question.title}</h3>

        <p>{question.creators[0]}</p>
      </div>
    );
  },

  _basicTemplate: function() {
    "use strict";
    return (
      <div className="rank--question-card">
        <div className="rank--question-card-img">
        </div>
        <h3>&nbsp;</h3>

        <p>&nbsp;</p>
      </div>
    );
  }
});

module.exports = Question;