
var orderSlip = {
  templateUrl: './order-slips.html',
  controller: 'OrderSlipController'
};

angular
  .module('admin.sales')
  .component('orderSlip', orderSlip)
  .config(function ($stateProvider) {
    $stateProvider
      .state('order-slips', {
        parent: 'app',
        url: '/admin/sales/order-slip',
        component: 'orderSlip'
      });
  });