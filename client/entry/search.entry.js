var React = require('react');
var Router = require('react-router');

var RankSearchPage = require('../components/RankSearchPage.react');

var Route  = Router.Route;

var routes = (
  <Route>
    <Route handler={RankSearchPage} path='/search' />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  "use strict";
  React.render(<Handler />, document.getElementById('search'));
});
