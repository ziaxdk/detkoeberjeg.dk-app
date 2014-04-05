angular.module('detkoeberjeg', ['ionic', 'detkoeberjeg.controllers', 'detkoeberjeg.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url: '/login',
      // abstract: true,
      templateUrl: "tmpl/login.html",
      controller: 'LoginCtrl'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    })

    .state('app', {
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

document.addEventListener('deviceready', function () {
  angular.bootstrap(document, [ 'detkoeberjeg' ]);
}, false);