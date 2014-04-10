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
  console.log('run: user', $rootScope.user);

  $rootScope.$on('$stateChangeError', function() {
    console.log('$stateChangeError', arguments);
  });

  $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromstate, fromParams) {
    return;
    console.log('$stateChangeStart', toState);

    if ($rootScope.user) {
      if (!toState.data || !toState.data.protected) {
        console.log('run: preventDefault');
        evt.preventDefault();
        $timeout(function() {
          $state.go('app.current', {}, { notify: true }).then(out,out);
        }, 100);
      }
    }

    // if ($rootScope.user && (!to.data || !to.data.protected)) {
    //   evt.preventDefault();
    //   $state.go('app.current', {}, { notify: false });
    // }
    // else {
    // }
    
  });


  // if ($rootScope.user) {
  //   console.log('run: User', $rootScope.user);
  //   $state.go('app.current', {}, { notify: false }).then(out, out);
  // }
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
    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "tmpl/search.html"
        }
      }
    });

  $urlRouterProvider.otherwise('/login');
});

// document.addEventListener('deviceready', function () {
//   angular.bootstrap(document.body, [ 'detkoeberjeg' ]);
// }, false);