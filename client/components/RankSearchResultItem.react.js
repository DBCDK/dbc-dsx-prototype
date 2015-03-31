var React = require('react');
var Reflux = require('reflux');

var ResultItem = React.createClass({
  render: function() {
    "use strict";
    let title = this.props.title;
    let creator = this.props.creator;
    let rankedKey = this.props.rankedKey;
    let normalKey = this.props.normalKey;

    return (
      <div className='search--result-item'>
        <div className='search--result-item-weights small-1 columns'>
          <span className='search--result-item-weights-ranked'>{rankedKey}</span>
          <br/>
          <span className='search--result-item-weights-normal'>{normalKey}</span>
        </div>
        <div className='search--result-item-matinfo small-10 columns'>
          <span className='search--result-item-matinfo-title'>{title}</span>
          <br/>
          <span className='search--result-item-matinfo-creator'>{creator}</span>
        </div>
      </div>
    );
  }
});

module.exports = ResultItem; 

