var _ = require('lodash'),
    React = require('react'),
    Reflux = require('reflux'),
    DsxStore = require('../stores/Dsx.store'),
    Actions = require('../actions/Actions'),
    Loader = require('react-loader'),
    SearchField = require('../components/SearchField');

/**
 * Main search module
 *
 * Contains searchfield and searchresult
 * and is the main controller of data
 *
 * The components used in this component, should be dump components, only
 * reacting to the propeties comming from the state of this component
 *
 * state object contains
 * {
 *   query: Current query being send to OpenSearch,
 *   pending: is a searchresult being loaded,
 *   result: search Result object
 * }
 */

var DsxAdminModule = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    return DsxStore.getState();
  },
  componentDidMount: function() {
    this.listenTo(DsxStore, () => {
      this.setState(DsxStore.getState());
    });
  },
  _onSubmit : function (value) {
    Actions.search(value);
  },
  _mapResultWithSelected: function (result, selected) {
    return result.map((element) => {
      element.selected = selected.filter((select) => select.id === element.id).length > 0;
      return element;
    });
  },
  _selectItem: function(item) {
    console.log(item);
    if (!item.selected)
      Actions.select(item);
    else
      Actions.unselect(item);
  },

  render: function () {
    var result = this.state.search.result && this._mapResultWithSelected(this.state.search.result, this.state.selected) || [];
    return (
      <div className='search row'>
      <div className='input-wrapper large-6 columns'>
      <div className="large-12 columns">
      <h2>Search</h2>
        <SearchField initialValue={this.state.query} submit={this._onSubmit} button={true} buttonValue='Søg' />
      <h2>Recommendations</h2>
        <DsxRecommendations/>
      </div>
        <div class='large-12 columns'>
          <h2>Select List</h2>
          <DsxSelected elements={this.state.selected} />
        </div>
      </div>
      <div className="output-wrapper large-6 columns">
      <h2>Search Result</h2>
        <Loader loaded={!this.state.search.pending}>
          <DsxList itemType={DsxListItem} listItems={result} itemOnClick={this._selectItem} />
        </Loader>
      </div>
      </div>
      );
  }
});

var DsxSelected = React.createClass({
  getInitialState: function () {
    return {json : false};
  },
  _onClick: function(event) {
    DsxUtils.selectElementContents(event.target);
  },

  render: function () {
    var viewer;
    if (this.state.json) {
      viewer = (<pre onClick={this._onClick} contentEditable='false'>{JSON.stringify(this.props.elements, null, 3)}</pre>);
    } else {
      viewer = (<DsxList itemType={DsxListItem} listItems={this.props.elements} />);
    }
    return (
    <div className="dsx-selected large-12 columns" onClick={this._onClick}>
      <div className="selected-viewer">
      {viewer}
      </div>
      <input className="button alert" type="button" value="clear" onClick={ () => Actions.clear('selected')} />
      <input className="button" type="button" value={this.state.json ? "list" : "json"} onClick={ () => this.setState({json : !this.state.json})} />
    </div>
    );
  }
});


var DsxRecommendations = React.createClass({
  getInitialState: function () {
     return {
      value : '',
     }
  },
  _onClick: function () {
    let ids = JSON.parse(this.state.value).map((value) => value.id);
    Actions.getRecommendations(ids);
  },
  _onChange: function(event) {
    this.setState({
      value : event.target.value
    });
  },
  render: function () {
    return (
    <div className="dsx-recommentation-input large-12 columns">
      <textarea value={this.state.value} onChange={this._onChange} />
      <input className="button" type="button" value="get recommendations" onClick={this._onClick} />
    </div>
    );
  }
});

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


var DsxUtils = {
  selectElementContents: function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}


  module.exports = DsxAdminModule;
