var React = require('react');

var ArrowLink = React.createClass({
  render: function() {
    return (
      <div className={this.props.class}>
        <a onClick={this.props.click} className="inliner">Vis mig noget
           <object type="image/svg+xml" data="/arrow.svg" className="svg"/>
        </a>
      </div>
    );
  }
});

module.exports = ArrowLink;
