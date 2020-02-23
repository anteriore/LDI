var receivingReceiptTollingNew = {
  templateUrl: './receiving-receipt-tolling-new.html',
  controller: 'ReceivingReceiptTollingNewController'
};

angular
  .module('admin.dashboard')
  .component('receivingReceiptTollingNew', receivingReceiptTollingNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('receiving-receipt-tolling-new', {
        parent: 'app',
        url: '/admin/dashboard/receiving-receipt-tolling/new',
        component: 'receivingReceiptTollingNew'
      });
  });
