var debitMemoForm = {
  bindings: {
    dm: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './debit-memo-form.html',
  controller: 'DebitMemoFormController'
};

angular
  .module('admin.accounting')
  .component('debitMemoForm', debitMemoForm);
