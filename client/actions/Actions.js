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
  //DSX Tinder
  'rank',
]);

module.exports = Actions;
