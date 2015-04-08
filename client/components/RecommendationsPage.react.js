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

    if(this.state.pids.length >= 1) {
      Store.getRecommendations(this.state.pids);
    }
  },

  render: function() {
    "use strict";
    return (
      <div className='search--pagewrapper'>
        <div className='search--wrapper'>
          <h2>Lav en søgning</h2>

          <span className="p centered">Så rankerer vi resultatet ud fra din profil</span>
          <span className="rank--buttons-button centered">
            <a href="/search"><img src="images/arrow-right-knap.png"/></a>
          </span>
          <span className="p centered">eller</span>
        </div>

        <RecommendationsSearchResult result={this.state.result} pending={this.state.pending}/>
      </div>
    );
  }
});

module.exports = RecommendationsPage;