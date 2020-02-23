var userForm = {
  bindings: {
    user: '=',
    companies: '<',
    departments: '=',
    button: '@',
    message: '@',
    onSubmit: '&',
    permissions: '='
  },
  templateUrl: './user-form.html',
  controller: 'UserFormController'
};

angular
  .module('admin.users')
  .component('userForm', userForm);
