angular.module('detkoeberjeg.controllers', ['detkoeberjeg.services'])

.controller('LoginCtrl', function($rootScope, $scope, $location, $state, $ionicViewService, $timeout, User) {
  $scope.user = {};
  $scope.signIn = function (user) {
    // console.log(user, $scope.user, $scope);
    if (user.email === 'a' && user.password === 'a') {
      user = { id: '1', email: '1', name: 'ziaxdk' };
      User.store(user);
      $rootScope.user = user;
      $state.go('app.current');
    }
  };
})

.controller('CurrentCtrl', function($scope, $ionicModal) {
  console.log('CurrentCtrl');
  $ionicModal.fromTemplateUrl('current-new-line.html', {
    scope: $scope,
    focusFirstInput: true,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalNewLine = modal;
  });

  $scope.newline = {};
  $scope.items = [{id: '1', count: 2, unit: 'l', text: 'mælk' }];
  // $scope.items = [{id: '1', count: 2, unit: 'l', text: 'mælk' }, { id: 2, count: 6, unit: 'stk', text: 'æg' }];

  $scope.tap = function(line) {
    // $scope.items.remove(line);
  };

  $scope.clearNewLine = function(line) {
    $scope.newline = {};
  };

  $scope.createNewLine = function(line) {
    $scope.items.push(angular.copy(line));
    $scope.newline = {};
  };

  $scope.setBought = function(item) {
    $scope.items = _.reject($scope.items, function(val) { return item.id == val.id; });
  };

  $scope.transfer = function(item) {
    console.log('Transferring', item);
  };

  $scope.$on('$destroy', function() {
    $scope.modalNewLine.remove();
  });

})

.controller('AppCtrl', function($scope) {
})

.controller('LogoutCtrl', function($rootScope, $scope, $state, User) {
  console.log('Logout');
  delete $rootScope.user;
  // // $rootScope.user = null;
  User.remove();
  $state.go('login');
});
