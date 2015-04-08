var React = require('react');
var Actions = require('../actions/Actions');
var SearchField = require('./SearchField.react');
var Loader = require('react-loader');
var DsxList = require('./DsxList.react');
var DsxListItem = require('./DsxListItem.react');

var DsxRank = React.createClass({
  getInitialState: function() {
    return {
      list: '',
      result: []
    };
  },

  _onSubmit: function(value) {
    Actions.rank(value, JSON.parse(this.state.list));
  },

  _updateTextarea: function(event) {
    this.setState({
      list: event.target.value
    });
  },

  render: function() {
    var store = this.props.store;
    var list = this.state.list;
    return (
      <div className="list">
        <div className="large-12 columns">
          <textarea value={list} onChange={this._updateTextarea}/>
        </div>

        <SearchField initialValue="" submit={this._onSubmit} button={true} buttonValue='Søg'/>
        <Loader loaded={!store.pending}>
          <DsxList itemType={DsxListItem} listItems={store.result}/>
        </Loader>
      </div>

    );
  }
});

module.exports = DsxRank;
