(function() {
  var m = angular.module('detkoeberjeg.directives', []);

  "SwipeRight SwipeLeft".split(' ').forEach(function(action) {
    var ngName = 'z' + action;
    m.directive(ngName, function($ionicGesture) {
      return {
        link: function($scope, $element, $attrs) {
          $ionicGesture.on(action.toLowerCase(), function(e) {
            $scope.$apply($attrs[ngName]);
          }, $element);
        }
      };
    });
  });
}());