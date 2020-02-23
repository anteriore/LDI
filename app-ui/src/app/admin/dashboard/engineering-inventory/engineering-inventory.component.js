
var engineeringInventory = {
  templateUrl: './engineering-inventory.html',
  controller: 'EngineeringInventoryController'
};

angular
  .module('admin.dashboard')
  .component('engineeringInventory', engineeringInventory)
  .config(function ($stateProvider) {
    $stateProvider
      .state('engineeringInventory', {
        parent: 'app',
        url: '/admin/dashboard/engineering-inventory',
        component: 'engineeringInventory'
      });
  });