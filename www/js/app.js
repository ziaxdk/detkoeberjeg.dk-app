angular.module('detkoeberjeg', ['ionic', 'detkoeberjeg.controllers', 'detkoeberjeg.services', 'detkoeberjeg.directives'])

.run(function($ionicPlatform, $rootScope, $state, $timeout, User) {
  function out() {
    console.log(arguments);
  }

  // $ionicPlatform.ready(function() {
  //   if(window.StatusBar) {
  //     StatusBar.styleDefault();
  //   }
  // });

  $rootScope.user = User.get();

  $rootScope.$on('$stateChangeError', function() {
    console.log('$stateChangeError', arguments);
  });

  $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromstate, fromParams) {
    if ($rootScope.user && toState.name == 'login') {
      // console.log('$stateChangeStart', toState);
      // evt.preventDefault();
      $timeout(function() {
        $state.go('app.current', {}, { notify: true });
      }, 1);
      return;
    }

    if (!$rootScope.user && "login logout".indexOf($state.current.name) != -1) {
      $timeout(function() {
        $state.go('login', {}, { notify: true });
      }, 1);
      return;
    }
  });

  Array.prototype.spliceRem = function(cb) {
    for (var i = this.length - 1; i >= 0; i--) {
      if (cb(this[i]))
        this.splice(i, 1);
      // if (this[i].id == item.id) {
      //   this.splice(i, 1);
      // }
    }
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: "tmpl/login.html",
      controller: 'LoginCtrl'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl',
      resolve: {
        logout: function(User) {
          console.log('resolve', User);
        }
      }
    })

    .state('app', {
      data: { protected: true },
      url: "/app",
      abstract: true,
      templateUrl: "tmpl/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.current', {
      url: "/current",
      views: {
        'menuContent' :{
          templateUrl: "tmpl/current.html",
          controller: 'CurrentCtrl'
        }
      }
    })
    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "tmpl/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/login');
});

// document.addEventListener('deviceready', function () {
//   angular.bootstrap(document.body, [ 'detkoeberjeg' ]);
// }, false);