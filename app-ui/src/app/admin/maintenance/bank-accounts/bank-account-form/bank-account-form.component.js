var bankAccountForm = {
  bindings: {
    bankaccount: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './bank-account-form.html',
  controller: 'BankAccountFormController'
};

angular
  .module('admin.maintenance')
  .component('bankAccountForm', bankAccountForm);
