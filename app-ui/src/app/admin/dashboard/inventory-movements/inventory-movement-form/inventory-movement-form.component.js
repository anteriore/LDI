var inventoryMovementForm = {
  bindings: {
    inventorymovement: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './inventory-movement-form.html',
  controller: 'InventoryMovementFormController'
};

angular
  .module('admin.dashboard')
  .component('inventoryMovementForm', inventoryMovementForm);
