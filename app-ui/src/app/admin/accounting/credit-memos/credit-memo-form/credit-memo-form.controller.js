
function CreditMemoFormController($state, CreditMemosService, MemoTypesService, UsersService, SalesSlipsService) {
  var ctrl = this;
  
  ctrl.$onChanges = function (changes) {
    if (changes.cm) {
      ctrl.cm = angular.copy(ctrl.cm);
    }
  };
  
  ctrl.$onInit = function(){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));

	  MemoTypesService.listByType("CM").then(function(response){
		  ctrl.memoTypes = response.data;
	  });
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.depots = response.data.depots;
	  });
	  
	  ctrl.cm.memoSlipType = "CM";
  };
  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.cm));
    
    ctrl.onSubmit({
      $event: {
    	  cm: ctrl.cm
      }
    });
  };
  
  ctrl.loadSalesSlips = function() {
	  console.log("asd");
	  SalesSlipsService.listByDepotAndStatus(ctrl.cm.depot.id, ["Pending","Incomplete"]).then(function(response){
		  ctrl.salesSlips = response.data;
		  console.log("hello" + JSON.stringify(ctrl.salesSlips));
		  $("#findSalesSlipModal").modal("show");
	  });
  };
  



  
}

angular
  .module('admin.accounting')
  .controller('CreditMemoFormController', CreditMemoFormController);
