
var productMovement = {
  templateUrl: './product-movements.html',
  controller: 'ProductMovementController'
};

angular
  .module('admin.dashboard')
  .component('productMovement', productMovement)
  .config(function ($stateProvider) {
    $stateProvider
      .state('product-movements', {
        parent: 'app',
        url: '/admin/dashboard/product-movements',
        component: 'productMovement'
      });
  });