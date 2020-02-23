var userNew = {
  templateUrl: './user-new.html',
  controller: 'UserNewController'
};

angular
  .module('admin.users')
  .component('userNew', userNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('user-new', {
        parent: 'app',
        url: '/admin/users/new',
        component: 'userNew'
      });
  });
