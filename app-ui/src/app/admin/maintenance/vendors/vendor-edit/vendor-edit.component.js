var vendorEdit = {
    templateUrl: './vendor-edit.html',
    controller: 'VendorEditController'
  };
  
  angular
    .module('admin.maintenance')
    .component('vendorEdit', vendorEdit)
    .config(function ($stateProvider) {
      $stateProvider
        .state('vendor-edit', {
          parent: 'app',
          url: '/admin/maintenance/vendor/edit/:vendorId',
          component: 'vendorEdit'
        });
    });
  