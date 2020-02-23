
var salesRep = {
  templateUrl: './sales-reps.html',
  controller: 'SalesRepController'
};

angular
  .module('admin.maintenance')
  .component('salesRep', salesRep)
  .config(function ($stateProvider) {
    $stateProvider
      .state('sales-reps', {
        parent: 'app',
        url: '/admin/maintenance/sales-rep',
        component: 'salesRep'
      });
  });