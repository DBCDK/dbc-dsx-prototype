var _ = require('lodash'),
  React = require('react'),
  Reflux = require('reflux'),
  DsxStore = require('../stores/Dsx.store'),
  Actions = require('../actions/Actions'),
  Loader = require('react-loader'),
  DsxRank = require('./DsxRank.react'),
  DsxList = require('./DsxList.react'),
  DsxListItem = require('./DsxListItem.react'),
  DsxRecommendations = require('./DsxRecommendations.react');

var DsxRankPage = React.createClass({
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
  _selectItem: function(item) {
    if(!item.selected) {
      Actions.select(item);
    }
    else {
      Actions.unselect(item);
    }
  },

  render: function() {
    return (
      <div className='recommendations row'>
        <div className="large-12 columns">
          <div className="navigation-links row">
            <div className="large-12 columns">
              <a href="/admin">Admin</a>
              <a href="/admin/recommend">Recommend</a>
            </div>
          </div>
          <div className="large-12 columns">
            <h2>Rank</h2>
          </div>
          <DsxRank store={this.state.search}/>
        </div>
      </div>
    );
  }
});

module.exports = DsxRankPage;
