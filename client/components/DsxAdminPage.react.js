var _ = require('lodash'),
    React = require('react'),
    Reflux = require('reflux'),
    DsxStore = require('../stores/Dsx.store'),
    Actions = require('../actions/Actions'),
    Loader = require('react-loader'),
    SearchField = require('./SearchField.react'),
    DsxList = require('./DsxList.react'),
    DsxListItem = require('./DsxListItem.react'),
    DsxRecommendations = require('./DsxRecommendations.react'),
    DsxSelected = require('./DsxSelected.react');

var DsxAdminModule = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    return DsxStore.getState();
  },
  componentDidMount: function() {
    this.listenTo(DsxStore, () => {
      this.setState(DsxStore.getState());
    });
  },
  _onSubmit : function (value) {
    Actions.search(value);
  },
  _mapResultWithSelected: function (result, selected) {
    return result.map((element) => {
      element.selected = selected.filter((select) => select.id === element.id).length > 0;
      return element;
    });
  },
  _selectItem: function(item) {
    console.log(item);
    if (!item.selected)
      Actions.select(item);
    else
      Actions.unselect(item);
  },

  render: function () {
    var result = this.state.search.result && this._mapResultWithSelected(this.state.search.result, this.state.selected) || [];
    return (
      <div className='search row'>
      <div className='input-wrapper large-6 columns'>
      <div className="large-12 columns">
      <h2>Search</h2>
        <SearchField initialValue={this.state.query} submit={this._onSubmit} button={true} buttonValue='Søg' />
      <h2>Recommendations</h2>
        <DsxRecommendations/>
      </div>
        <div class='large-12 columns'>
          <h2>Select List</h2>
          <DsxSelected elements={this.state.selected} />
        </div>
      </div>
      <div className="output-wrapper large-6 columns">
      <h2>Search Result</h2>
        <Loader loaded={!this.state.search.pending}>
          <DsxList itemType={DsxListItem} listItems={result} itemOnClick={this._selectItem} />
        </Loader>
      </div>
      </div>
      );
  }
});
module.exports = DsxAdminModule;
