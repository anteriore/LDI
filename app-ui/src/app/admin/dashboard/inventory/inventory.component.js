
var inventory = {
  templateUrl: './inventory.html',
  controller: 'InventoryController'
};

angular
  .module('admin.dashboard')
  .component('inventory', inventory)
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory', {
        parent: 'app',
        url: '/admin/dashboard/inventory',
        component: 'inventory'
      });
  });