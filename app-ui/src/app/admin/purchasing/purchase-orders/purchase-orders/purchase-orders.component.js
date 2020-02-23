
var purchaseOrders = {
  bindings: {
  },
  templateUrl: './purchase-orders.html',
  controller: 'PurchaseOrdersController'
};

angular
  .module('admin.purchasing')
  .component('purchaseOrders', purchaseOrders)
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase-orders', {
        parent: 'app',
        url: '/admin/purchasing',
        component: 'purchaseOrders'
      });
  });