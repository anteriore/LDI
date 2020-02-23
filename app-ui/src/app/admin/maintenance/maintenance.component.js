
var maintenance = {
  bindings: {
    maintenance: '<'
  },
  templateUrl: './maintenance.html',
  controller: 'MaintenanceController'
};

angular
  .module('admin.maintenance')
  .component('maintenance', maintenance)
  .config(function ($stateProvider) {
    $stateProvider
      .state('maintenance', {
        parent: 'app',
        url: '/admin/maintenance',
        component: 'maintenance'
      });
  });