
var productissuance = {
  templateUrl: './product-issuances.html',
  controller: 'ProductIssuancesController'
};

angular
  .module('admin.dashboard')
  .component('productissuance', productissuance)
  .config(function ($stateProvider) {
    $stateProvider
      .state('productissuance', {
        parent: 'app',
        url: '/admin/dashboard/product-issuances',
        component: 'productissuance'
      });
  });