var React = require('react');
var Router = require('react-router');

var RankProfilePage = require('../components/RankProfilePage.react');

var Route = Router.Route;
//var RouterHandler = Router.RouteHandler;

var routes = (
  <Route>
    <Route handler={RankProfilePage} path='/rank'/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.getElementById('rank'));
});