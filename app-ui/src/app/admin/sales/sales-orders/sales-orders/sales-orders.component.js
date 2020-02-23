
var salesOrder = {
  templateUrl: './sales-orders.html',
  controller: 'SalesOrderController'
};

angular
  .module('admin.sales')
  .component('salesOrder', salesOrder)
  .config(function ($stateProvider) {
    $stateProvider
      .state('sales-orders', {
        parent: 'app',
        url: '/admin/sales/sales-order',
        component: 'salesOrder'
      });
  });