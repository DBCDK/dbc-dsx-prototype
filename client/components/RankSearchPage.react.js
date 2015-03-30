var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var SearchResult = require('./RankSearchResult');

var SearchFieldComponent = require('./SearchField.react');

var RankSearchStore = require('../stores/RankSearch.store');

var SearchPage = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    "use strict";
    return RankSearchStore.getState();
  },

  render: function() {
    "use strict";
    var resultView = (this.state.searching) ? <SearchResult pending={this.state.pending} /> : '';

    return (
      <div className='search--pagewrapper'>
        <div className='search--wrapper'>
          <h2>Søgning</h2>

          <p>Vi rankerer resultatet af søgningen ud fra de materialer, du har udvalgt</p>
          <SearchFieldComponent columns='small-10 columns' change={this._onChange} submit={this.submit}/>

          <a className="right search--button" onClick={this.submit}><img src="images/yes-button-normal.png"/></a>
        </div>

        <div className='search--resultwrapper'>
          <hr/>
          {resultView}
        </div>
      </div>
    );
  },

  _onChange: function(text) {
    "use strict";
    this.setState({text: text});
  },

  submit: function() {
    "use strict";
    if(!this.state.text) {
      return;
    }
    this.setState({searching:true});
    Actions.rankSearch(this.state.text);
  }
});

module.exports = SearchPage;
