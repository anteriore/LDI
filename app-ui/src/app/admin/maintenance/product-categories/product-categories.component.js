
var productCategory = {
  templateUrl: './product-categories.html',
  controller: 'ProductCategoriesController'
};

angular
  .module('admin.maintenance')
  .component('productCategory', productCategory)
  .config(function ($stateProvider) {
    $stateProvider
      .state('product-categories', {
        parent: 'app',
        url: '/admin/maintenance/product-category',
        component: 'productCategory'
      });
  });