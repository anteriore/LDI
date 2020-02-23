
var depot = {
  templateUrl: './depots.html',
  controller: 'DepotController'
};

angular
  .module('admin.maintenance')
  .component('depot', depot)
  .config(function ($stateProvider) {
    $stateProvider
      .state('depots', {
        parent: 'app',
        url: '/admin/maintenance/depots',
        component: 'depot'
      });
  });