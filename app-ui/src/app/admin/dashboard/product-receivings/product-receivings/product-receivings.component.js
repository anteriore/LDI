
var productReceivings = {
  templateUrl: './product-receivings.html',
  controller: 'ProductReceivingsController'
};

angular
  .module('admin.dashboard')
  .component('productReceivings', productReceivings)
  .config(function ($stateProvider) {
    $stateProvider
      .state('productReceivings', {
        parent: 'app',
        url: '/admin/dashboard/product-receivings',
        component: 'productReceivings'
      });
  });