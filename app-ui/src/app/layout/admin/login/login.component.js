
var login = {
  bindings: {
  },
  templateUrl: './login.html',
  controller: 'LoginController'
};

angular
  .module('admin.common')
  .component('login', login)
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        component: 'login'
      });
  });