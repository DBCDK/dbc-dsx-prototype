var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var RankPicker = require('./RankSearchResultRankPicker.react');
var ResultItem = require('./RankSearchResultItem.react');

var SearchResult = React.createClass({
  render: function() {
    "use strict";
    if(this.props.pending){
      return this._pendingTemplate();
    }

    var items = [];
    var ranked = this.props.ranked;
    ranked.forEach((item, key) => {
      let creator = _.startCase(item.creator[0]);
      let title = _.startCase(item.title);
      let rankedKey = item.rankedKey;
      let normalKey = item.normalKey;
      items.push(<ResultItem title={title} creator={creator} key={key} rankedKey={rankedKey} normalKey={normalKey}/>);
    });

    return (
      <div className='search--result'>
        <h2>Resultat</h2>

        <p>Vælg rankering</p>
        <RankPicker />
        {items}
      </div>
    );
  },

  _pendingTemplate: function(){
    "use strict";
    return (
      <div className='search--result'>
        <img src='images/pacman.gif'/>
      </div>
    );
  }
});

module.exports = SearchResult; 

