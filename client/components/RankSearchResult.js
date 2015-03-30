var React = require('react');
var Reflux = require('reflux');

var RankPicker = require('./RankSearchResultRankPicker.react');
var ResultItem = require('./RankSearchResultItem.react');

var SearchResult = React.createClass({
  render: function() {
    "use strict";
    console.log(this.props);
    if(this.props.pending){
      return this._pendingTemplate();
    }

    return (
      <div className='search--result'>
        <h2>Resultat</h2>

        <p>Vælg rankering</p>
        <RankPicker />
        <ResultItem />
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

