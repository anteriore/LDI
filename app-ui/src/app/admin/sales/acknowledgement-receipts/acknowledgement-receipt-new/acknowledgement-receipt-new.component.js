var acknowledgementReceiptNew = {
  templateUrl: './acknowledgement-receipt-new.html',
  controller: 'AcknowledgementReceiptNewController'
};

angular
  .module('admin.sales')
  .component('acknowledgementReceiptNew', acknowledgementReceiptNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('acknowledgement-receipt-new', {
        parent: 'app',
        url: '/admin/sales/acknowledgement-receipt/new',
        component: 'acknowledgementReceiptNew'
      });
  });
