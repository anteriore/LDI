
var accountCode = {
  templateUrl: './account-codes.html',
  controller: 'AccountCodeController'
};

angular
  .module('admin.maintenance')
  .component('accountCode', accountCode)
  .config(function ($stateProvider) {
    $stateProvider
      .state('account-codes', {
        parent: 'app',
        url: '/admin/maintenance/account-code',
        component: 'accountCode'
      });
  });