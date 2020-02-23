
function OrderReceiptController($state, OrderReceiptsService, UsersService, $rootScope, $location, _) {
  var ctrl = this;
  ctrl.orderReceipts = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addOrderReceipt = false;
	  ctrl.error = null;
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
  };
  
  ctrl.selectDepot = function (){
	  loadOrderReceipts();
  };
  
  function loadOrderReceipts(){
	  ctrl.company = $rootScope.selectedCompany;
	  OrderReceiptsService.listByDepot(ctrl.userAssignedDepot.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.orderReceipts = response.data;
	  });
  }
  
  ctrl.openModal = function(or){
	  ctrl.or = or;
  };
  
  ctrl.createNewOrderReceipt = function (event) {
	    console.log('createNewOrderReceipt');
	    $state.go('order-receipt-new');
	    
  };
  
 
}

angular
  .module('admin.sales')
  .controller('OrderReceiptController', OrderReceiptController);
