var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var RankPicker = require('./RankSearchResultRankPicker.react');
var ResultItem = require('./RankSearchResultItem.react');

var SearchResult = React.createClass({
  render: function() {
    "use strict";
    //console.log(this.props);
    if(_.isEmpty(this.props.normalSearchResult) && _.isEmpty(this.props.rankedSearchResult)) {
      //console.log('empty');
      return this._pendingTemplate();
    }

    let rankedCount = this.props.rankedSearchResult.length;
    let normalCount = this.props.normalSearchResult.length;

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
  }
});

module.exports = SearchResult; 

