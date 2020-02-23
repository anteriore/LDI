var productIssuanceForm = {
  bindings: {
    pis: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './product-issuance-form.html',
  controller: 'ProductIssuanceFormController'
};

angular
  .module('admin.dashboard')
  .component('productIssuanceForm', productIssuanceForm);
