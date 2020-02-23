var userEdit = {
  templateUrl: './user-edit.html',
  controller: 'UserEditController'
};

angular
  .module('admin.users')
  .component('userEdit', userEdit)
  .config(function ($stateProvider) {
    $stateProvider
      .state('user-edit', {
        parent: 'app',
        url: '/admin/users/edit/:userId',
        component: 'userEdit'
      });
  });
