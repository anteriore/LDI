var productMovementForm = {
  bindings: {
    pm: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './product-movement-form.html',
  controller: 'ProductMovementFormController'
};

angular
  .module('admin.dashboard')
  .component('productMovementForm', productMovementForm);
