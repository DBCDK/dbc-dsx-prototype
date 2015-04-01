var React = require('react');
var Reflux = require('reflux');

var RankPicker = React.createClass({
  render: function() {
    "use strict";
    let rankedCount = this.props.rankedCount;
    let normalCount = this.props.normalCount;

    let personalSelectorActiveClass = (this.props.currentView == 'personal') ? 'active' : '';
    let normalSelectorActiveClass = (this.props.currentView == 'normal') ? 'active' : '';

    return (
      <div className='search--rankpicker'>
        <a href='#' className={personalSelectorActiveClass} onClick={() => this.props.viewSelectorCallback('personal')}>Personlig ({rankedCount})</a>
        <a href='#' className={normalSelectorActiveClass} onClick={() => this.props.viewSelectorCallback('normal')}>Normal ({normalCount})</a>
      </div>
    );
  }
});

module.exports = RankPicker; 

