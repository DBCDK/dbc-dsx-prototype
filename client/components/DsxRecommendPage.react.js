var _ = require('lodash'),
    React = require('react'),
    Reflux = require('reflux'),
    DsxStore = require('../stores/Dsx.store'),
    Actions = require('../actions/Actions'),
    Loader = require('react-loader'),
    DsxList = require('./DsxList.react'),
    DsxListItem = require('./DsxListItem.react'),
    DsxRecommendations = require('./DsxRecommendations.react');

var DsxRecommendPage = React.createClass({
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
    if (!item.selected)
      Actions.select(item);
    else
      Actions.unselect(item);
  },

  render: function () {
    var result = this.state.search.result && this._mapResultWithSelected(this.state.search.result, this.state.selected) || [];
    return (
      <div className='recommendations row'>
      <div className="large-12 columns">
      <h2>Recommendations</h2>
        <DsxRecommendations/>
        <Loader loaded={!this.state.search.pending}>
          <DsxList itemType={DsxListItem} listItems={result} itemOnClick={this._selectItem} />
        </Loader>
      </div>
      </div>
      );
  }
});


  module.exports = DsxRecommendPage;
