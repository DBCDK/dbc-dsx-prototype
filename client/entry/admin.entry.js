var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    DsxAdminPage = require('../components/DsxAdminPage.react'),
    DsxRankPage = require('../components/DsxRankPage.react'),
    DsxRecommendPage = require('../components/DsxRecommendPage.react');

// export for http://fb.me/react-devtools
window.React = React;

var routes = (
  <Route>
  <Route handler={DsxAdminPage} path="/admin/" />
  <Route handler={DsxRankPage} name="rank" path="/admin/rank" />
  <Route handler={DsxRecommendPage} name="recommend" path="/admin/recommend" />
  </Route>

);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.getElementById('admin'));
});
