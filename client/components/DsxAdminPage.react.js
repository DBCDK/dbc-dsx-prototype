var _ = require('lodash'),
  React = require('react'),
  Reflux = require('reflux'),
  DsxStore = require('../stores/Dsx.store'),
  Actions = require('../actions/Actions'),
  Loader = require('react-loader'),
  SearchField = require('./SearchField.react'),
  DsxList = require('./DsxList.react'),
  DsxListItem = require('./DsxListItem.react'),
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
  _onSubmit: function(value) {
    Actions.search(value);
  },
  _mapResultWithSelected: function(result, selected) {
    return result.map((element) => {
      element.selected = selected.filter((select) => select.id === element.id).length > 0;
      return element;
    });
  },
  _selectItem: function(item) {
    if(!item.selected) {
      Actions.select(item);
    }
    else {
      Actions.unselect(item);
    }
  },

  render: function() {
    var result = this.state.search.result && this._mapResultWithSelected(this.state.search.result, this.state.selected) || [];
    return (
      <div>
        <div className="navigation-links row">
        <span className="large-12 columns">
          <a href="/admin/rank">Rank</a>
          <a href="/admin/recommend">Recommend</a>
        </span>
        </div>

        <div className='search row'>
          <div className='input-wrapper large-6 columns'>
            <div className="small-12">
              <div className="columns">
                <h2>Search</h2>
              </div>
              <SearchField initialValue={this.state.query} submit={this._onSubmit} button={true} buttonValue='Søg'/>
            </div>
            <div className='small-12'>
              <div className="columns">
                <h2>Select List</h2>
              </div>
              <DsxSelected elements={this.state.selected}/>
            </div>
          </div>
          <div className="output-wrapper">
            <div className=" small-6 columns">
              <h2>Search Result</h2>
            </div>
            <div className=" small-6 columns">
              <Loader loaded={!this.state.search.pending}>
                <DsxList itemType={DsxListItem} listItems={result} itemOnClick={this._selectItem}/>
              </Loader>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = DsxAdminModule;
