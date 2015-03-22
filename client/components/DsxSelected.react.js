var React = require('react');
var Actions  = require('../actions/Actions');
var Utils = require('../utils/Dbc.utils');
var DsxList = require('./DsxList.react');
var DsxListItem = require('./DsxListItem.react');


var DsxSelected = React.createClass({

  getInitialState: function () {
    return {json : false};
  },

  _onClick: function(event) {
    Utils.selectElementContents(event.target);
  },

  _getRecommendations: function() {
    let ids = this.props.elements.map((element) => element.id);
    Actions.getRecommendations(ids);
  },

  render: function () {
    var viewer;
    if (this.state.json) {
      viewer = (<pre onClick={this._onClick} contentEditable='false'>{JSON.stringify(this.props.elements, null, 3)}</pre>);
    } else {
      viewer = (<DsxList itemType={DsxListItem} listItems={this.props.elements} />);
    }

    return (
    <div className="dsx-selected large-12 columns" onClick={this._onClick}>
      <div className="selected-viewer">
      {viewer}
      </div>
      <input className="button alert" type="button" value="clear" onClick={ () => Actions.clear('selected')} />
      <input className="button" type="button" value={this.state.json ? "list" : "json"} onClick={ () => this.setState({json : !this.state.json})} />
      <input className="button success" type="button" value='Get Recommendations' onClick={this.$_getRecommendations} />
    </div>
    );
  }
});

module.exports = DsxSelected;
