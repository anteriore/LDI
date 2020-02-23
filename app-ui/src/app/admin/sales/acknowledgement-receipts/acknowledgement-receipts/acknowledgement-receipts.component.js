
var acknowledgementReceipt = {
  templateUrl: './acknowledgement-receipts.html',
  controller: 'AcknowledgementReceiptController'
};

angular
  .module('admin.sales')
  .component('acknowledgementReceipt', acknowledgementReceipt)
  .config(function ($stateProvider) {
    $stateProvider
      .state('acknowledgement-receipts', {
        parent: 'app',
        url: '/admin/sales/acknowledgement-receipt',
        component: 'acknowledgementReceipt'
      });
  });