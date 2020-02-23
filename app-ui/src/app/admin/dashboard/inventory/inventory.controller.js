
function InventoryController($state, InventoryService, StockCardsService, $rootScope, _) {
  var ctrl = this;
  ctrl.inventoryList = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addInventory = false;
	  ctrl.error = null;
	  loadInventory();
  };
  
  function loadInventory(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  InventoryService.listInventoryView(ctrl.company.id).then(function(response){
		  ctrl.inventoryList = response.data;
	  });
  }
  
  ctrl.openModal = function(inventory){
	  console.log(JSON.stringify(inventory));
	  ctrl.item = inventory[1];
	  InventoryService.listByCompanyAndItem(ctrl.company.id, inventory[1].id).then(function(response){
		  ctrl.controlList = response.data;
	  });
	  
  };
  
  ctrl.openStockCard = function(inventory){
	  ctrl.controlNumber = inventory.controlNumber;
	  ctrl.company = $rootScope.selectedCompany;
	  StockCardsService.listByControlNumberAndCompany(ctrl.controlNumber, ctrl.company.id).then(function(response){
			 ctrl.stockCards = response.data;
			 console.log("response data size " + ctrl.stockCards.length);
		  });
		  
	  InventoryService.getItemByControlNumber(ctrl.controlNumber).then(function(response){
			  ctrl.item = response.data;
		  });
  }
}

angular
  .module('admin.dashboard')
  .controller('InventoryController', InventoryController);
