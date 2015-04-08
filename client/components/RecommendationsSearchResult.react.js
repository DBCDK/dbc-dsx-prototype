var React = require('react');
var Reflux = require('reflux');

var RecommendationsSearchResult = React.createClass({

  _getItems:function(){
    "use strict";
    let that = this;
    let result = this.props.result;
    let items = [];

    result.forEach(function(value){
      let title = that._capitalizeFirstWord(value.title);
      let creator = that._capitalizeEachWord(value.creator[0]);

      items.push((
        <div className='search--result-item clearfix'>
          <div className='search--result-item-matinfo small-12 columns'>
            <span className='search--result-item-matinfo-title'>{title}</span>
            <br/>
            <span className='search--result-item-matinfo-creator'>{creator}</span>
          </div>
        </div>
      ));
    });
    return items;
  },

  render: function() {
    "use strict";
    let loadingIndicator = (this.props.pending) ? (<img src='images/pacman.gif'/>) : '';
    let result = (this.props.pending) ? '' : this._getItems();

    return (
      <div className='search--resultwrapper'>
        <hr/>
        {loadingIndicator}
        {result}
      </div>
    );
  },

  _capitalizeFirstWord: function(string){
    "use strict";
    let str = string.charAt(0).toUpperCase() + string.slice(1);
    return str.replace(/-/gi, ' ');
  },

  _capitalizeEachWord: function(string){
    "use strict";
    let str = string.replace(/-/gi, ' ');
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
});

module.exports = RecommendationsSearchResult; 

