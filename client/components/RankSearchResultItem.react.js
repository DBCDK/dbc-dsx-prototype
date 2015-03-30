var React = require('react');
var Reflux = require('reflux');

var ResultItem = React.createClass({
  render: function() {
    "use strict";
    return (
      <div className='search--result-item'>
        <div className='search--result-item-weights small-1 columns'>
          <span className='search--result-item-weights-ranked'>?</span>
          <br/>
          <span className='search--result-item-weights-normal'>?</span>
        </div>
        <div className='search--result-item-matinfo small-10 columns'>
          <span className='search--result-item-matinfo-title'>Title</span>
          <br/>
          <span className='search--result-item-matinfo-creator'>Creator</span>
        </div>
      </div>
    );
  }
});

module.exports = ResultItem; 

