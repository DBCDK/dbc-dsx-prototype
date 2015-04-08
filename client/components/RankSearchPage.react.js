var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var SearchResult = require('./RankSearchResult.react.js');

var SearchFieldComponent = require('./SearchField.react');

var RankSearchStore = require('../stores/RankSearch.store');

var SearchPage = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    "use strict";
    return RankSearchStore.getState();
  },

  componentDidMount: function() {
    "use strict";
    this.listenTo(RankSearchStore, function() {
      this.setState(RankSearchStore.getState());
    });
  },

  render: function() {
    "use strict";
    let buttonClasses = (this.state.text.length >= 4) ? 'right search--button small-2 columns' : 'hide';

    return (
      <div className='search--pagewrapper'>
        <div className='search--wrapper'>
          <div className="search--close-btn">
            <a href="/"><img src="images/close-knap.png" /></a>
          </div>
          <h2>Søgning</h2>

          <p>Vi rankerer resultatet af søgningen ud fra de materialer, du har udvalgt</p>
          <SearchFieldComponent columns='small-10 columns' change={this._onChange} submit={this.submit}/>

          <a className={buttonClasses} onClick={this.submit}><img src='images/yes-knap.png'/></a>
        </div>

        <div className='search--resultwrapper'>
          <hr/>
          <SearchResult
            view={this.state.view}
            viewSelectorCallback={this._selectView}
            rankedSearchResult={this.state.ranked}
            normalSearchResult={this.state.normal}
            pending={this.state.pending}
            didSearch={this.state.didSearch}
            />
        </div>
      </div>
    );
  },

  _onChange: function(text) {
    "use strict";
    this.setState({text: text});
  },

  _selectView: function(view) {
    "use strict";
    this.setState({view: view});
  },

  submit: function() {
    "use strict";
    if(!this.state.text) {
      return;
    }

    Actions.rank(this.state.text);
  }
});

module.exports = SearchPage;
