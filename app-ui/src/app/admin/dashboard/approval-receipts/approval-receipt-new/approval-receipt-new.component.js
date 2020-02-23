var approvedReceiptNew = {
  templateUrl: './approval-receipt-new.html',
  controller: 'ApprovedReceiptNewController'
};

angular
  .module('admin.dashboard')
  .component('approvedReceiptNew', approvedReceiptNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('approved-receipt-new', {
        parent: 'app',
        url: '/admin/dashboard/approved-receipt/new',
        component: 'approvedReceiptNew'
      });
  });
