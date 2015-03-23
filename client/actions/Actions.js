var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'search',
  'holdings',
  'frontpage',
  'getCart',
  'addCartContent',
  'removeCartContent',
  'login',
  'logout',
  //DSX
  'select',
  'unselect',
  'clear',
  'getRecommendations',
  'setRecommendations',
  'rank'
]);

module.exports = Actions;
