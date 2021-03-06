
var productDivisionCode = {
  templateUrl: './product-division-codes.html',
  controller: 'ProductDivisionCodeController'
};

angular
  .module('admin.maintenance')
  .component('productDivisionCode', productDivisionCode)
  .config(function ($stateProvider) {
    $stateProvider
      .state('product-division-codes', {
        parent: 'app',
        url: '/admin/maintenance/product-division-code',
        component: 'productDivisionCode'
      });
  });