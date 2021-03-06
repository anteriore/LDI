
var inventoryMovements = {
  templateUrl: './inventory-movements.html',
  controller: 'InventoryMovementsController'
};

angular
  .module('admin.dashboard')
  .component('inventoryMovements', inventoryMovements)
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory-movements', {
        parent: 'app',
        url: '/admin/dashboard/inventory-movements',
        component: 'inventoryMovements'
      });
  });