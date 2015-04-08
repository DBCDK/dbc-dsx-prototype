var React = require('react');
var Actions = require('../actions/Actions');
var Utils = require('../utils/Dbc.utils');
var DsxList = require('./DsxList.react');
var DsxListItem = require('./DsxListItem.react');

var DsxSelected = React.createClass({

  getInitialState: function() {
    return {
      json: false,
      elements: JSON.stringify(this.props.elements, null, 3)
    };
  },

  _removeFromList: function(item) {
    Actions.unselect(item);
  },

  _onClick: function(event) {
    //event.target.select();
  },

  _onChange: function(event) {
    var value = event.target.value;
    if(Utils.isValidJson(value)) {
      var json = JSON.parse(value);
      Actions.setRecommendations(json);
    }
    this.setState({
      elements: value
    });
  },

  _getRecommendations: function() {
    let ids = this.props.elements.map((element) => element.id);
    Actions.getRecommendations(ids);
  },

  componentWillUpdate: function() {

  },

  render: function() {
    var viewer;
    if(this.state.json) {
      var json = JSON.stringify(this.props.elements, null, 3);
      viewer = (
        <textarea onClick={this._onClick} onChange={this._onChange}>{json}</textarea>);
    }
    else {
      viewer = (
        <DsxList itemType={DsxListItem} itemOnClick={this._removeFromList} listItems={this.props.elements}/>);
    }

    return (
      <div className="dsx-selected large-12" onClick={this._onClick}>
        <div className="selected-viewer">
          {viewer}
        </div>
        <div className="large-12 columns">
          <input className="button" type="button" value={this.state.json ? "list" : "json"} onClick={ () => this.setState({json : !this.state.json})}/>
          <input className="button alert" type="button" value="clear" onClick={ () => Actions.clear('selected')}/>
          <input className="button success" type="button" value='Get Recommendations' onClick={this._getRecommendations}/>
        </div>
      </div>
    );
  }
});

module.exports = DsxSelected;
