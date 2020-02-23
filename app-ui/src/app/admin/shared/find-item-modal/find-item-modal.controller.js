
function FindItemModalController($state, ItemsService, PurchaseRequestsService, PurchaseOrdersService, ReceivingReceiptsService, InventoryService, $rootScope, _) {
  var ctrl = this;
  ctrl.rawItems = [];
  ctrl.packagingItems = [];
  ctrl.itemsWithDetails = [];
  ctrl.packagingItemsWithDetails = [];
  ctrl.rawItemList = [];
  ctrl.packagingItemList = [];
  
  ctrl.$onInit = function(){
	ctrl.itemlist = [];
	ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	console.log(window.location.href);
	if(window.location.href.includes("eng")){
		loadEngineeringItems();
		ctrl.engineering = true;
	}else{
		loadItems();
	}
  };
  
  function loadEngineeringItems(){
	  ctrl.company = $rootScope.selectedCompany;
	  ItemsService.listEngineering().then(function(response){
		  ctrl.items = response.data;
		  for(var i = 0; i < ctrl.items.length; i++){
			  (function(i){
				  ctrl.itemsWithDetails.push({
					  item:ctrl.items[i], 
					  stockOnHand:0,
					  pendingPrf:0,
					  pendingPo:0,
					  pendingRr:0
				  });
				  var itemId = ctrl.items[i].id;
				  InventoryService.getStockQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.itemsWithDetails[i].stockOnHand = response.data;
				  });
				  PurchaseRequestsService.getPrfQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.itemsWithDetails[i].pendingPrf = response.data;
					  console.log("pending" + ctrl.itemsWithDetails[i].pendingPrf);
				  });
				  PurchaseOrdersService.getPurchaseOrderQuantity(itemId, ctrl.company.id).then(function(response){
					  ctrl.itemsWithDetails[i].pendingPo = response.data;
				  });
				  ReceivingReceiptsService.getQuarantinedQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.itemsWithDetails[i].pendingRr = response.data;
				  });
			  })(i);
		  }
	  });
  }
  
  function loadItems(){
	  ctrl.company = $rootScope.selectedCompany;
	  ItemsService.list().then(function(response){
		  ctrl.items = response.data;
		  for(var i = 0; i < ctrl.items.length; i++){
			  (function(i){
				  ctrl.itemsWithDetails.push({
					  item:ctrl.items[i], 
					  stockOnHand:0,
					  pendingPrf:0,
					  pendingPo:0,
					  pendingRr:0
				  });
				  var itemId = ctrl.items[i].id;
				  InventoryService.getStockQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.itemsWithDetails[i].stockOnHand = response.data;
				  });
				  PurchaseRequestsService.getPrfQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.itemsWithDetails[i].pendingPrf = response.data;
					  console.log("pending" + ctrl.itemsWithDetails[i].pendingPrf);
				  });
				  PurchaseOrdersService.getPurchaseOrderQuantity(itemId, ctrl.company.id).then(function(response){
					  ctrl.itemsWithDetails[i].pendingPo = response.data;
				  });
				  ReceivingReceiptsService.getQuarantinedQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.itemsWithDetails[i].pendingRr = response.data;
				  });
			  })(i);
		  }
	  });
	  
	  
  }
  
  
  ctrl.isItemPresent = function(item){
	  for(var i = 0; i < ctrl.itemlist.length; i++){
		  if(ctrl.itemlist[i].item.id == item.item.id){
			  return i;
		  }
	  }
	  
	  return -1;
  };
  /*
  function loadRawItems(){
	  ctrl.company = $rootScope.selectedCompany;
	  ItemsService.listRaw().then(function(response){
		  ctrl.rawItems = response.data;
		  for(var i = 0; i < ctrl.rawItems.length; i++){
			  (function(i){
				  ctrl.rawItemsWithDetails.push({
						  rawItem:ctrl.rawItems[i], 
						  stockOnHand:0,
						  pendingPrf:0,
						  pendingPo:0,
						  pendingRr:0
				  });
				  var itemId = ctrl.rawItems[i].id;
				  InventoryService.getStockQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.rawItemsWithDetails[i].stockOnHand = response.data;
				  });
				  PurchaseRequestsService.getPrfQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.rawItemsWithDetails[i].pendingPrf = response.data;
					  console.log("pending" + ctrl.rawItemsWithDetails[i].pendingPrf);
				  });
				  PurchaseOrdersService.getPurchaseOrderQuantity(itemId, ctrl.company.id).then(function(response){
					  ctrl.rawItemsWithDetails[i].pendingPo = response.data;
				  });
				  ReceivingReceiptsService.getQuarantinedQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.rawItemsWithDetails[i].pendingRr = response.data;
				  });
			  })(i);
		  } 
	  });
  }
  
  function loadPackagingItems(){
	  ItemsService.listPackaging().then(function(response){
		  ctrl.packagingItems = response.data;
		  for(var i = 0; i < ctrl.packagingItems.length; i++){
			  (function(i){
				  ctrl.packagingItemsWithDetails.push({
						  packagingItem:ctrl.packagingItems[i], 
						  stockOnHand:0,
						  pendingPrf:0,
						  pendingPo:0,
						  pendingRr:0
				  });
				  var itemId = ctrl.packagingItems[i].id;
				  InventoryService.getStockQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.packagingItemsWithDetails[i].stockOnHand = response.data;
				  });
				  PurchaseRequestsService.getPrfQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.packagingItemsWithDetails[i].pendingPrf = response.data;
				  });
				  PurchaseOrdersService.getPurchaseOrderQuantity(itemId, ctrl.company.id).then(function(response){
					  ctrl.packagingItemsWithDetails[i].pendingPo = response.data;
				  });
				  ReceivingReceiptsService.getQuarantinedQuantityOfItem(itemId, ctrl.company.id).then(function(response){
					  ctrl.packagingItemsWithDetails[i].pendingRr = response.data;
				  });
			  })(i);
		  }
	  });
	  
	  
  }
  */
  
  ctrl.getItem = function(item){
	  if(ctrl.isItemPresent(item) !== -1){
			var index = ctrl.isItemPresent(item);
			ctrl.itemlist.splice(index, 1);
		}else{
			ctrl.itemlist.push(item);
		}
  };
  /*
  ctrl.getRawItem = function(item){
	if(ctrl.rawItemList.indexOf(item) !== -1){
		var index = ctrl.rawItemList.indexOf(item);
		ctrl.rawItemList.splice(index, 1);
		var index2 = ctrl.itemlist.indexOf(item);
		ctrl.itemlist.splice(index2, 1);
	}else{
		ctrl.itemlist.push(item);
		ctrl.rawItemList.push(item);
	}
  };
*/
  ctrl.onButtonSelect = function() {
	  console.log("on-submit");
	ctrl.onSubmit({
		$event: {
		
		}
	  });
  }
  /*
  ctrl.getPackagingItem = function(item){
	if(ctrl.packagingItemList.indexOf(item) !== -1){
		var index = ctrl.packagingItemList.indexOf(item);
		ctrl.packagingItemList.splice(index, 1);
		var index2 = ctrl.itemlist.indexOf(item);
		ctrl.itemlist.splice(index2, 1);
	}else{
		ctrl.itemlist.push(item);
		ctrl.packagingItemList.push(item);
	}
  };*/
}

angular
  .module('admin.shared')
  .controller('FindItemModalController', FindItemModalController);
