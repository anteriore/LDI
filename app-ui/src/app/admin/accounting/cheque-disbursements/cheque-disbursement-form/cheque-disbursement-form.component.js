var chequeDisbursementForm = {
  bindings: {
    cp: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './cheque-disbursement-form.html',
  controller: 'ChequeDisbursementFormController'
};

angular
  .module('admin.accounting')
  .component('chequeDisbursementForm', chequeDisbursementForm);
