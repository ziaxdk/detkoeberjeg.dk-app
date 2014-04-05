angular.module('detkoeberjeg.services', [])

.service('User', function($window) {
  return {
    get: function() {
      alert('get');
      var json = $window.localStorage.getItem('user');
      alert(json);
      if (!json) return;
      var res = JSON.parse(json);
      alert(res);
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