
function ChequeDisbursementFormController($state, ChequeDisbursementsService, ChequePrintingsService, UsersService, BankAccountsService, $rootScope) {
	  
  var ctrl = this;
  
  var currentUser = localStorage.getItem('cupventUser');
      if (currentUser != null) {
          ctrl.currentUser = JSON.parse(currentUser);
      }
  
  ctrl.$onInit = function (){
	  ctrl.company = $rootScope.selectedCompany;
	    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));

	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.user = response.data;
	  });
	  
	  BankAccountsService.list().then(function(response){
		  ctrl.bankAccounts = response.data;
	  });
	  
	  ChequePrintingsService.listByCompanyAndStatus(ctrl.company.id, "Approved").then(function(response){
		  ctrl.cpList = response.data;
	  });
	  
	  ctrl.totalAmount = 0;
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.cp) {
      ctrl.cp = angular.copy(ctrl.cp);
    }
  };
  

  ctrl.selectChequePrinting = function (cp){
	  ctrl.cp.chequePrinting = cp;
  };


  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
    	  cp: ctrl.cp
      }
    });
  };

  

}

angular
  .module('admin.accounting')
  .controller('ChequeDisbursementFormController', ChequeDisbursementFormController);
