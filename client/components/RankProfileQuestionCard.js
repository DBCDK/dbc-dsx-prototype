var React = require('react/addons');
var Reflux = require('reflux');
var Swiper = require('../utils/SwipeEvents');
var _ = require('lodash');

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
      cover = (covers.length == 0) ? 'images/image-missing.png' : covers[3].url;
    }

    let title = question.title.charAt(0).toUpperCase() + question.title.slice(1);
    title = title.replace(/-/gi, ' ');
    title = "Denne teskt vil gå i to linjer. Måske hvis den er lidt længere";
    let creator = _.startCase(question.creator[0]);

    return (
      <div className="rank--question-card-wrapper">
        <div className="rank--question-card">
          <div className="rank--question-card-img">
            <img className="image" src={cover}/>
          </div>
          <div className="rank--question-card-title">
            <span>{title}</span>
          </div>

          <div className="rank--question-card-creator">
            <span>{creator}</span>
          </div>
        </div>
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