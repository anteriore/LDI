
var chequeDisbursement = {
  templateUrl: './cheque-disbursements.html',
  controller: 'ChequeDisbursementController'
};

angular
  .module('admin.accounting')
  .component('chequeDisbursement', chequeDisbursement)
  .config(function ($stateProvider) {
    $stateProvider
      .state('cheque-disbursements', {
        parent: 'app',
        url: '/admin/accounting/cheque-disbursement',
        component: 'chequeDisbursement'
      });
  });