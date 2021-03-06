
function InventoryMovementNewController($state, InventoryMovementsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function(){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  ctrl.inventoryMovement = {
	    		company: $rootScope.selectedCompany,
	    		requestedBy: ctrl.user
	    };
  };
  
  ctrl.createMRIS = function (event) {
    InventoryMovementsService.save(event.inventorymovement).then(function (response) {
        $state.go('inventory-movements');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('InventoryMovementNewController', InventoryMovementNewController);
