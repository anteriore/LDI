var clientForm = {
  bindings: {
    client: '=',
    company: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './client-form.html',
  controller: 'ClientFormController'
};

angular
  .module('admin.maintenance')
  .component('clientForm', clientForm);
