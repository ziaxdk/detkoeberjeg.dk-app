angular.module('detkoeberjeg.controllers', ['detkoeberjeg.services'])

.controller('LoginCtrl', function($rootScope, $scope, $location, $state, $ionicViewService, $timeout, User) {
  $scope.user = {};
  $scope.signIn = function (user) {
    // console.log(user, $scope.user, $scope);
    if (user.email === 'a' && user.password === 'a') {
      var theUser = User.create(user.email, user.password);
      User.store(theUser);
      $rootScope.user = theUser;
      $state.go('app.current');
    }
  };
})

.controller('CurrentCtrl', function($rootScope, $scope, $ionicModal, ShoppingList) {
  console.log('CurrentCtrl');
  var shoppingList = ShoppingList.current(),
      products = shoppingList.list;

  $ionicModal.fromTemplateUrl('current-new-line.html', {
    scope: $scope,
    focusFirstInput: true,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalNewLine = modal;
  });

  $scope.newProduct = {};
  $scope.currentShoppingList = shoppingList;

  $scope.tap = function(line) {
    // $scope.items.remove(line);
  };

  $scope.clearNewProduct = function() {
    $scope.newProduct = {};
  };

  $scope.createNewProduct = function(line) {
    // console.log(line)
    products.push(angular.copy(line));
    $scope.newProduct = {};
  };

  $scope.setBought = function(item) {
    console.log('setBought', item, $rootScope.user.settings.slideRightBuy);
    if ($rootScope.user.settings.slideRightBuy)
      products.spliceRem(function(val) { return val.id == item.id; });
  };

  $scope.transfer = function(item) {
    if ($rootScope.user.settings.slideLeftTransfer)
      console.log('Transferring', item);
  };

  $scope.debug = function(evt) {
    console.log('debug', evt);
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
})

.controller('SettingsCtrl', function($rootScope, $scope, User) {

  $scope.save = function() {
    console.log('save');
    User.store($rootScope.user);
  };
});
