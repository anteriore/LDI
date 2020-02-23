var productMovementNew = {
  templateUrl: './product-movement-new.html',
  controller: 'ProductMovementNewController'
};

angular
  .module('admin.dashboard')
  .component('productMovementNew', productMovementNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('product-movement-new', {
        parent: 'app',
        url: '/admin/dashboard/product-movements/new',
        component: 'productMovementNew'
      });
  });
