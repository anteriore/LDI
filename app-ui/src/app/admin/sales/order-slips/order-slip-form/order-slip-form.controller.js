
function OrderSlipFormController($state, OrderSlipsService, SalesOrdersService, ProductInventoryService, UsersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onChanges = function (changes) {
    if (changes.os) {
      ctrl.os = angular.copy(ctrl.os);
    }
  };
  
  ctrl.$onInit = function() {
	  ctrl.os.orderedProducts = [];
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.depots = response.data.depots;
	  });
	  ctrl.type = "OS";
	  ctrl.os.date = new Date();
  };

  ctrl.computeTotalAmount = function(value, index){
	  ctrl.os.orderedProducts[index].amount = value;
	  ctrl.os.totalAmount = 0;
	  for(var i = 0; i < ctrl.os.orderedProducts.length; i++){
		  ctrl.os.totalAmount += ctrl.os.orderedProducts[i].quantity * ctrl.os.orderedProducts[i].unitPrice ;
	  }
  };
  

  
  ctrl.showSoProductModal = function(fg){
	  ctrl.company = $rootScope.selectedCompany;
	  console.log("SALES ORDER NUMBER" + ctrl.os.salesOrder.number);
	  ProductInventoryService.listByDepotAndFinishedGood(ctrl.os.depot.id, fg.id).then(function(response){
		  ctrl.inventorylist = response.data;
		  $("#findSoProductModal").modal('show');
		  
	  });
	  
	  
  };
  
  
  ctrl.getProductsOfFg = function (fg){
	  var array = [];
	  for(var i = 0; i < ctrl.os.orderedProducts.length ; i++){
		  if(fg.finishedGood.id == ctrl.os.orderedProducts[i].product.finishedGood.id){
			  array.push(ctrl.os.orderedProducts[i]);
		  }
	  }
	  return array;
  };
  
  ctrl.findSoModal = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  SalesOrdersService.listNotCompletedByCompanyAndDepot(ctrl.company.id, ctrl.os.depot.id, ctrl.type).then(function(response){
		  ctrl.salesOrders = response.data;
		  console.log("ressonse" + JSON.stringify(ctrl.salesOrders));
		  $("#findSoModal").modal("show");
	  });
	  
  };
  
  ctrl.getTotalQuantity = function(fg){
	  var sum = 0;
	  for(var i = 0; i < ctrl.os.orderedProducts.length ; i++){
		  if(fg.finishedGood.id == ctrl.os.orderedProducts[i].product.finishedGood.id){
			  sum += ctrl.os.orderedProducts[i].quantity;
		  }
	  }
	  return sum;
  };
 
  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.os));
    for(var i = 0; i < ctrl.os.orderedProducts.length; i++){
    	ctrl.os.orderedProducts[i].orderSlipNo = ctrl.os.number;
    }
    
    ctrl.os.type ="OS";
    ctrl.onSubmit({
      $event: {
    	  os: ctrl.os
      }
    });
  };
  
}

angular
  .module('admin.sales')
  .controller('OrderSlipFormController', OrderSlipFormController);
