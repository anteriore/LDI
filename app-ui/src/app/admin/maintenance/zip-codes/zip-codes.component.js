
var zipCode = {
  templateUrl: './zip-codes.html',
  controller: 'ZipCodeController'
};

angular
  .module('admin.maintenance')
  .component('zipCode', zipCode)
  .config(function ($stateProvider) {
    $stateProvider
      .state('zip-codes', {
        parent: 'app',
        url: '/admin/maintenance/zip-code',
        component: 'zipCode'
      });
  });