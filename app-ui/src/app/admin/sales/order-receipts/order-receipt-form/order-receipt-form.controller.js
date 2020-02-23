

function OrderReceiptFormController($state, OrderReceiptsService, OrderSlipsService, AcknowledgementReceiptsService, UsersService, SalesSlipsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onChanges = function (changes) {
    if (changes.or) {
      ctrl.or = angular.copy(ctrl.or);
    }
  };
  
  ctrl.$onInit = function() {
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.depots = response.data.depots;
	  });
	  ctrl.or.date = new Date();
	  ctrl.or.acknowledgementReceipt = {};
	  ctrl.payments = [];
  };

  ctrl.findAcknowledgementReceipt = function(){
	  AcknowledgementReceiptsService.listByDepotWithSIAmount(ctrl.or.depot.id).then(function(response){
		  ctrl.acknowledgementReceipts = response.data;
		  console.log(response.data);
	  });
  };
  
  ctrl.selectAcknowledgementReceipt = function(ar){
	  ctrl.or.acknowledgementReceipt = ar;
	  for(let payment of ctrl.or.acknowledgementReceipt.payments){
		  if(payment.reference.salesOrder.type === "DR_SI"){
			  ctrl.payments.push(payment);
		  }
	  }
  };
  
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
    	  or: ctrl.or
      }
    });
  };
  
}

angular
  .module('admin.sales')
  .controller('OrderReceiptFormController', OrderReceiptFormController);
