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
    "use strict";
    let question = this.props.question;
    if(!question) {
      return this._basicTemplate();
    }

    let cover = 'images/loader.gif';
    let covers = question.covers;

    if(covers) {
      cover = (covers.length == 0) ? 'images/dummy.jpg' : covers[3].url;
    }

    return (
      <div className="rank--question-card">
        <div className="rank--question-card-img">
          <img className="image" src={cover}/>
        </div>

        <h3>{question.title}</h3>

        <p>{question.creator[0]}</p>
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