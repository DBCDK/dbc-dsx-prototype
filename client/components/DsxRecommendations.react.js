var React = require('react');
var Actions  = require('../actions/Actions');

var DsxRecommendations = React.createClass({
  getInitialState: function () {
     return {
      value : '',
     }
  },
  _onClick: function () {
    let ids = JSON.parse(this.state.value).map((value) => value.id);
    Actions.getRecommendations(ids);
  },
  _onChange: function(event) {
    this.setState({
      value : event.target.value
    });
  },
  render: function () {
    return (
    <div className="dsx-recommentation-input large-12 columns">
      <textarea value={this.state.value} onChange={this._onChange} />
      <input className="button" type="button" value="get recommendations" onClick={this._onClick} />
    </div>
    );
  }
});

module.exports = DsxRecommendations;
