angular.module('detkoeberjeg.directives', [])

.directive('zSwipeRight', function($ionicGesture, $parse, $interpolate) {
  return {
    link: function($scope, $element, $attrs) {
      $ionicGesture.on('swiperight', function(e) {
        $scope.$apply($attrs.zSwipeRight);
      }, $element);
    }
  };
})

.directive('zSwipeLeft', function($ionicGesture) {
  return {
    link: function($scope, $element, $attrs) {
      $ionicGesture.on('swipeleft', function(e) {
        $scope.$apply($attrs.zSwipeLeft);
      }, $element);
    }
  };
});