
var users = {
  bindings: {
    users: '<',
    departments:'<'
  },
  templateUrl: './users.html',
  controller: 'UsersController'
};

angular
  .module('admin.users')
  .component('users', users)
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        parent: 'app',
        url: '/admin/users',
        component: 'users'
      });
  });