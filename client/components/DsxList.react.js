var React = require('react');
var Actions  = require('../actions/Actions');

var DsxList =   React.createClass({
  render: function(){
    var itemType = React.createFactory(this.props.itemType);
    var clickHandler = this.props.itemOnClick || null;
    var listItems = this.props.listItems.map((item) => {
      return itemType({
        element: item,
        onClick : clickHandler
      });
    });
    return (
      <div className="list large-12 columns">
        {listItems}
      </div>
      );
  }
});

module.exports = DsxList;
