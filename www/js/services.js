angular.module('detkoeberjeg.services', [])

.service('User', function($window) {
  return {
    get: function() {
      var json = $window.localStorage.getItem('user');
      if (!json) return;
      var res = JSON.parse(json);
      return res;
    },
    store: function(user) {
      $window.localStorage.setItem('user', JSON.stringify(user));
    },
    remove: function() {
      $window.localStorage.removeItem('user');
    }
  };
});