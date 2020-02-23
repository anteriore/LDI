
var orderReceipt = {
  templateUrl: './order-receipts.html',
  controller: 'OrderReceiptController'
};

angular
  .module('admin.sales')
  .component('orderReceipt', orderReceipt)
  .config(function ($stateProvider) {
    $stateProvider
      .state('order-receipts', {
        parent: 'app',
        url: '/admin/sales/order-receipt',
        component: 'orderReceipt'
      });
  });