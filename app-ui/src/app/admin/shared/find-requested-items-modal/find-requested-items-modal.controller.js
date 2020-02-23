
function FindRequestedItemsModalController($state, PurchaseRequestsService) {
  var ctrl = this;
  ctrl.requestedItems = [];
  ctrl.selectedItems = [];
  ctrl.ordereditems = [];
  ctrl.$onInit = function(){
	ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	if(ctrl.user.department.name === "Engineering"){
		loadEngineeringPurchaseRequests();
	}else{
		loadPurchaseRequests();
	}
	
  };
	
	ctrl.sortType = 'number';
	ctrl.sortReverse = false;
  
  function loadEngineeringPurchaseRequests(){
	  ctrl.company = JSON.parse(window.localStorage.getItem('company'));
	  PurchaseRequestsService.getRequestedItemsByCompanyAndType(ctrl.company.id, "ENG").then(function(response){
		  ctrl.requestedItems = response.data;
		  console.log(JSON.stringify(response.data));
	  });
  }
  
  function loadPurchaseRequests(){
	  console.log("HELLO");
	  ctrl.company = JSON.parse(window.localStorage.getItem('company'));
	  PurchaseRequestsService.getRequestedItemsByCompany(ctrl.company.id).then(function(response){
		  ctrl.requestedItems = response.data;
		  console.log(JSON.stringify(response.data));
	  });
  }
  
  
  ctrl.selectRequestedItem = function(requestedItem){
	  if(ctrl.selectedItems.indexOf(requestedItem) !== -1){
		  var index = ctrl.selectedItems.indexOf(requestedItem);
		  ctrl.selectedItems.splice(index, 1);
		  
		  ctrl.ordereditems.splice(index, 1);
		  
	  }else{
		  ctrl.selectedItems.push(requestedItem);
		  ctrl.ordereditems.push(
				  {
					  item:requestedItem.item,
					  quantity:requestedItem.quantityRequested,
					  unitPrice:0,
					  amount:0,
					  prfNumber:requestedItem.prfNumber,
					  unit: requestedItem.unit,
					  requestedItemId: requestedItem.id
				  }
		  );
	  }
	  
  };
}

angular
  .module('admin.shared')
  .controller('FindRequestedItemsModalController', FindRequestedItemsModalController);
