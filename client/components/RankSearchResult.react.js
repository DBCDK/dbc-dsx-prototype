var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var RankPicker = require('./RankSearchResultRankPicker.react');
var ResultItem = require('./RankSearchResultItem.react');

var SearchResult = React.createClass({
  didScrollView: false,

  componentDidMount: function(){
    "use strict";
    this.didScrollView = false;
  },

  componentDidUpdate: function(){
    "use strict";
    var scrollYdest = 110;
    this.didScrollView = (!(!this.didScrollView && window.scrollY < scrollYdest));
    if(!this.didScrollView && !_.isEmpty(this.props.normalSearchResult) && !_.isEmpty(this.props.rankedSearchResult)){
      window.scrollTo(0, scrollYdest);
      this.didScrollView = true;
    }
  },

  render: function() {
    "use strict";
    console.log(this.props);
    if(_.isEmpty(this.props.normalSearchResult) && _.isEmpty(this.props.rankedSearchResult) && !this.props.searching) {
      return this._pendingTemplate();
    }

    let rankedCount = this.props.rankedSearchResult.length;
    let normalCount = this.props.normalSearchResult.length;

    if(_.isEmpty(this.props.rankedSearchResult)){
      return this._emptyResultTemplate();
    }

    let searchResult = (this.props.view == 'personal') ? this.props.rankedSearchResult : this.props.normalSearchResult;

    let items = [];
    searchResult.forEach((item, key) => {
      let creator = _.startCase(item.creator[0]);
      let title = _.startCase(item.title);
      let rankedKey = item.rankedKey;
      let normalKey = item.normalKey;
      items.push(
        <ResultItem title={title} creator={creator} key={key} rankedKey={rankedKey} normalKey={normalKey} currentView={this.props.view}/>);
    });

    return (
      <div className='search--result'>
        <h2>Resultat</h2>

        <p>Vælg rankering</p>
        <RankPicker
          normalCount={normalCount}
          rankedCount={rankedCount}
          viewSelectorCallback={this.props.viewSelectorCallback}
          currentView={this.props.view}
          />
        {items}
      </div>
    );
  },

  _pendingTemplate: function() {
    "use strict";
    let loader = (this.props.pending) ? <img src='images/pacman.gif'/> : '';
    return (
      <div className='search--result'>
        {loader}
      </div>
    );
  },

  _emptyResultTemplate: function() {
    "use strict";
    return (
      <div className='search--result'>
        <h4>Ingen resultater fundet</h4>
      </div>
    );
  }
});

module.exports = SearchResult; 

