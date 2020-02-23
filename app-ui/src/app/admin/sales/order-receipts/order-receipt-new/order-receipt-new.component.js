var orderReceiptNew = {
  templateUrl: './order-receipt-new.html',
  controller: 'OrderReceiptNewController'
};

angular
  .module('admin.sales')
  .component('orderReceiptNew', orderReceiptNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('order-receipt-new', {
        parent: 'app',
        url: '/admin/sales/order-receipt/new',
        component: 'orderReceiptNew'
      });
  });
