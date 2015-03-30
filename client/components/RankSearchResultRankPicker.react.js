var React = require('react');
var Reflux = require('reflux');

var RankPicker = React.createClass({
  render: function() {
    "use strict";
    return (
      <div className='search--rankpicker'>
        <a href='#' className='active'>Personlig</a>
        <a href='#'>Normal</a>
      </div>
    );
  }
});

module.exports = RankPicker; 

