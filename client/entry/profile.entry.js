var React = require('react');
var Router = require('react-router');

var RankProfilePage = require('../components/RankProfilePage.react');

var Route = Router.Route;

var routes = (
  <Route>
    <Route handler={RankProfilePage} path='/profile'/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.getElementById('profile'));
});