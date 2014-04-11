angular.module('detkoeberjeg.services', [])

.service('User', function($window) {
  return {
    get: function() {
      var user;
      if (user) return user;
      var json = $window.localStorage.getItem('user');
      if (!json) return;
      user = JSON.parse(json);
      return user;
    },
    create: function(email, password) {
      var user = {
        email: email,
        password: password,
        name: 'ziaxdk',
        settings: {
          closeWindowNewProduct: true,
          slideLeftTransfer: true,
          slideRightBuy: true
        }
      };
      return user;
    },
    store: function(user) {
      $window.localStorage.setItem('user', JSON.stringify(user));
    },
    remove: function() {
      $window.localStorage.removeItem('user');
    }
  };
})

.service('ShoppingList', function(User) {
  return {
    current: function() {
      return {
        list: [
          { id: 1, count: 2, unit: 'l', text: 'mælk'  },
          { id: 2, count: 6, unit: 'stk', text: 'æg'  },
          { id: 3, count: 3, unit: 'pk', text: 'pasta'  },
          { id: 4, count: 500, unit: 'gr', text: 'oksekød'  },
          { id: 5, count: 0, unit: 'pk', text: 'pålæg'  }
        ]
      };
    },
  };
});