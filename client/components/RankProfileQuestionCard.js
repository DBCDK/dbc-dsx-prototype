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
    var covers = this.props.covers;
    var cover = (covers.length == 0) ? '/dummy.jpg' : covers[3].url;
    return (
      <div className="rank--question-card">
        <div className="rank--question-card-img">
          <img className="image" src={cover}/>
        </div>

        <h3>{this.props.title}</h3>

        <p>{this.props.creators}</p>
      </div>
    );
  }
});

module.exports = Question;