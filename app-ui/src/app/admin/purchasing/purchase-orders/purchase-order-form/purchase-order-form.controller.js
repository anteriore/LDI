
function PurchaseOrderFormController($state, PurchaseOrdersService, AreasService, DepartmentsService) {
  var ctrl = this;
  
  ctrl.$onChanges = function (changes) {
    if (changes.po) {
      ctrl.po = angular.copy(ctrl.po);
    }
  };
  
  ctrl.$onInit = function() {
	  DepartmentsService.list().then(function(response){
		  ctrl.departments = response.data;
	  });
	  AreasService.list().then(function(response){
		  ctrl.areas = response.data;
		  ctrl.po.area = ctrl.areas[0];
	  });
	  ctrl.po.purchaseRequests = [];
	  ctrl.po.orderedItems = [];
	  

  };

  ctrl.computeTotalAmount = function(value, index){
	  ctrl.po.orderedItems[index].amount = value;
	  ctrl.po.totalAmount = 0;
	  for(var i = 0; i < ctrl.po.orderedItems.length; i++){
		  ctrl.po.totalAmount += ctrl.po.orderedItems[i].quantity * ctrl.po.orderedItems[i].unitPrice ;
	  }
  };
  
  ctrl.addVat = function(){
	  if(ctrl.po.vat){
		 ctrl.po.totalAmount = ctrl.po.totalAmount + (ctrl.po.totalAmount * 0.12);
	  }else{
		 ctrl.po.totalAmount = ctrl.po.totalAmount - (ctrl.po.totalAmount * 0.12);
	  }
  };
  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.po));
    ctrl.onSubmit({
      $event: {
    	  po: ctrl.po
      }
    });
  };
  
}

angular
  .module('admin.purchasing')
  .controller('PurchaseOrderFormController', PurchaseOrderFormController);
