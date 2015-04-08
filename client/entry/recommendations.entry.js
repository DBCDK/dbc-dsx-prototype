var React = require('react');
var Router = require('react-router');

var RecommendationsPage = require('../components/RecommendationsPage.react');

var Route  = Router.Route;

var routes = (
  <Route>
    <Route handler={RecommendationsPage} path='/recommendations' />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  "use strict";
  React.render(<Handler />, document.getElementById('recommendations'));
});
