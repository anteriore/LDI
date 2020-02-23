
var bankAccount = {
  templateUrl: './bank-accounts.html',
  controller: 'BankAccountController'
};

angular
  .module('admin.maintenance')
  .component('bankAccount', bankAccount)
  .config(function ($stateProvider) {
    $stateProvider
      .state('bankAccounts', {
        parent: 'app',
        url: '/admin/maintenance/bank-account',
        component: 'bankAccount'
      });
  });