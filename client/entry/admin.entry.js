var React = require('react'),
    DsxSearch = require('../components/DsxSearch.react');

// export for http://fb.me/react-devtools
window.React = React;

React.render(<DsxSearch />, document.getElementById('admin'));
