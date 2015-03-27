var Hammer = require('hammerjs');

var _offset = 0;

function SwipeEvent(element, cb) {
  var element = element;
  element.style.left = _offset + 'px';
  var hammer = Hammer(element);
  hammer.on('pan panend swipe', actOnSwipe);

  function actOnSwipe(event) {
    switch(event.type) {
      case 'pan' :
        move(event.deltaX, element, 'none');
        break;
      case 'panend':
        if(Math.abs(event.deltaX) > 150) {
          var direction = (event.deltaX > 0) ? Hammer.DIRECTION_RIGHT : Hammer.DIRECTION_LEFT;
          swipeout(direction, element);
        }
        else {
          move(0, element, 'left 200ms ease-out');
        }
        break;
      case 'swipe' :
        swipeout(event.direction, element);
        break;
    }
  }

  function move(distance, element, transition) {
    element.style.transition = transition;
    element.style.left = (_offset + distance) + 'px';
    var rotate = (distance / 20) + 'deg';
    element.style.transform = "rotate(" + rotate + ")";
    element.style.webkitTransform = "rotate(" + rotate + ")";
  }

  function clickToSwipe(option) {
    var direction = (option === 0) ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
    swipeout(direction);
  }

  function swipeout(direction) {
    hammer.stop(true);
    var option = (direction === Hammer.DIRECTION_LEFT) ? 0 : 1;
    var pos = (direction === Hammer.DIRECTION_LEFT) ? '-400px' : '800px';
    element.style.transition = 'left 200ms';
    element.style.left = pos;
    element.addEventListener('transitionend', function() {
      cb(option);
    });
  }

  return {
    clickToSwipe: clickToSwipe
  }
}

module.exports = SwipeEvent;
