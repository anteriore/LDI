
var debitMemo = {
  templateUrl: './debit-memos.html',
  controller: 'DebitMemoController'
};

angular
  .module('admin.accounting')
  .component('debitMemo', debitMemo)
  .config(function ($stateProvider) {
    $stateProvider
      .state('debit-memos', {
        parent: 'app',
        url: '/admin/accounting/debit-memo',
        component: 'debitMemo'
      });
  });