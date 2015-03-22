var React = require('react');
var Actions  = require('../actions/Actions');

var DsxListItem = React.createClass({
  _onClick: function (event) {
    if (this.props.itemOnClick){
      this.props.itemOnClick(this.props.item);
    }
  },
  render : function() {
    var item = this.props.element;
     return (
      <div className={"dsx-list-item" + (item.selected && ' selected' || '')} onClick={() => this.props.onClick(item)} >
      <span className="title">{item.title.replace(/-/g, ' ')}</span>
      <span className="author">{item.creator[0].replace(/-/g, ' ')}</span>
     </div>)
  }
});


module.exports = DsxListItem;
