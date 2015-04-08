var React = require('react');
var Reflux = require('reflux');

var RecommendationsItem = React.createClass({
  render: function(){
    "use strict";
    let title = this.props.title;
    let creator = this.props.creator;

    return (
      <div className='search--result-item clearfix'>
        <div className='search--result-item-matinfo small-12 columns'>
          <span className='search--result-item-matinfo-title'>{title}</span>
          <br/>
          <span className='search--result-item-matinfo-creator'>{creator}</span>
        </div>
      </div>
    )
  }
});

var RecommendationsSearchResult = React.createClass({

  _getItems:function(){
    "use strict";
    let that = this;
    let result = this.props.result;
    let items = [];

    result.forEach(function(value){
      let title = that._capitalizeFirstWord(value.title);
      let creator = that._capitalizeEachWord(value.creator[0]);
      let item =  <RecommendationsItem key={value.id} title={title} creator={creator} />;
      items.push(item);
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
        <h2>Se vores anbefalinger til dig</h2>
        <span className="p centered">på baggrund af din profil</span>
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

