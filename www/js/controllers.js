angular.module('detkoeberjeg.controllers', ['detkoeberjeg.services'])

.controller('LoginCtrl', function($rootScope, $scope, $state, $timeout, User) {
  $rootScope.user = User.get();
  if ($rootScope.user) {
    alert('redir');
    $timeout(function() {
      alert('redir');
      $state.go('app.current');
    }, 2000);
    return;
  }

  $scope.user = {};
  $scope.signIn = function (user) {
    // console.log(user, $scope.user, $scope);
    if (user.email === '1' && user.password === '2') {
      User.store({ id: '1', email: '1', name: 'ziaxdk' });
      $state.go('app.current');
    }
  };


})

.controller('CurrentCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('current-new-line.html', {
    scope: $scope,
    focusFirstInput: true,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalNewLine = modal;
  });

  $scope.newline = {};
  $scope.items = [{id: '1', count: 2, unit: 'l', text: 'mælk' }, { id: 2, count: 6, unit: 'stk', text: 'æg' }];

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

  $scope.$on('$destroy', function() {
    $scope.modalNewLine.remove();
  });

})

.controller('AppCtrl', function($scope) {
})

.controller('LogoutCtrl', function($scope, $state, User) {
  console.log('Logout');
  User.remove();
  $state.go('login');
});
