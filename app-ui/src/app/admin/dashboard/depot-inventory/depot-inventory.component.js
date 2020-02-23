
var depotInventory = {
  templateUrl: './depot-inventory.html',
  controller: 'DepotInventoryController'
};

angular
  .module('admin.dashboard')
  .component('depotInventory', depotInventory)
  .config(function ($stateProvider) {
    $stateProvider
      .state('depot-inventory', {
        parent: 'app',
        url: '/admin/dashboard/depot-inventory',
        component: 'depotInventory'
      });
  });