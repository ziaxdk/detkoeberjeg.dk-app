angular.module('detkoeberjeg.directives', [])

.directive('zSwipeRight', function($ionicGesture, $parse) {
  return {
    link: function($scope, $element, $attrs) {
      $ionicGesture.on('swiperight', function(e) {
        console.log('z-swipe-right', $attrs.zSwipeRight, $parse($attrs.zSwipeRight)($scope));
      }, $element);
    }
  };
})

.directive('zSwipeLeft', function($ionicGesture) {
  return {
    link: function($scope, $element, $attrs) {
      $ionicGesture.on('swipeleft', function(e) {
        console.log('z-swipe-left', $attrs.zSwipeLeft);
      }, $element);
    }
  };
});