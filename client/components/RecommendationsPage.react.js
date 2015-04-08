var React = require('react');
var Reflux = require('reflux');

var RecommendationsSearchResult = require('./RecommendationsSearchResult.react');
var Store = require('../stores/RecommendationsStore');

var RecommendationsPage = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    "use strict";
    return Store.getState();
  },

  componentDidMount: function() {
    "use strict";
    this.listenTo(Store, () => {
      this.setState(Store.getState());
    });

    if(this.state.pids.length >= 1){
      Store.getRecommendations(this.state.pids);
    }
  },

  render: function() {
    "use strict";
    return (
      <div className='search--pagewrapper'>
        <div className='search--wrapper'>
          <h2>Søgning</h2>

          <p>Vi rankerer resultatet af søgningen ud fra de materialer, du har udvalgt</p>
        </div>

        <RecommendationsSearchResult result={this.state.result} pending={this.state.pending} />
      </div>
    );
  }
});

module.exports = RecommendationsPage;