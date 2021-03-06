
function FindInventoryModalController($state, InventoryService, $rootScope) {
  var ctrl = this;
  ctrl.issuedlist = [];
  ctrl.issuedinventorylist = [];
  ctrl.stockonhand = [];
  
	ctrl.sortType = 'controlNumber';
	ctrl.sortReverse = false;
  
  ctrl.$onInit = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  InventoryService.listByCompany(ctrl.company.id).then(function(response){
		  ctrl.inventorylist = response.data;
		  console.log(JSON.stringify(ctrl.inventorylist));
	  });  
  };
  
  ctrl.selectInventory = function(inventory){
	  if(ctrl.issuedlist.indexOf(inventory) !== -1){
		  var index = ctrl.issuedlist.indexOf(inventory);
		  ctrl.issuedlist.splice(index, 1);
		  ctrl.issuedinventorylist.splice(index, 1);
		  ctrl.stockonhand.splice(index, 1);
	  }else{
		  ctrl.issuedlist.push(inventory);
		  ctrl.issuedinventorylist.push(
				  {
					  item:inventory.item,
					  controlNumber:inventory.controlNumber,
					  quantity:0
				  }
		  );
		  ctrl.stockonhand.push(inventory.quantity);
		  console.log(ctrl.stockonhand);
	  }
	  
  };
}

angular
  .module('admin.shared')
  .controller('FindInventoryModalController', FindInventoryModalController);
