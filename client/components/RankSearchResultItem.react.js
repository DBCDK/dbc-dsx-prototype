var React = require('react');
var Reflux = require('reflux');

var ResultItem = React.createClass({
  render: function() {
    "use strict";
    let title = this.props.title;
    let creator = this.props.creator;
    let rankedKey = this.props.rankedKey;
    let normalKey = this.props.normalKey;

    let rankedKeyClass = (this.props.currentView == 'personal') ? 'active' : '';
    let normalKeyClass = (this.props.currentView == 'normal') ? 'active' : '';

    return (
      <div className='search--result-item'>
        <div className='search--result-item-weights small-1 columns'>
          <span className={rankedKeyClass}>{rankedKey}</span>
          <br/>
          <span className={normalKeyClass}>{normalKey}</span>
        </div>
        <div className='search--result-item-matinfo small-10 columns'>
          <span className='search--result-item-matinfo-title'>{title}</span>
          <br/>
          <span>{creator}</span>
        </div>
      </div>
    );
  }
});

module.exports = ResultItem; 

