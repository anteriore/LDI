
function ChequePrintingNewController($state, ChequePrintingsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    ctrl.cp = {
    		company: ctrl.company,
    		chequeDate: new Date(),
    		payables: []
    }
    };

  ctrl.createChequePrinting = function (event) {
    ChequePrintingsService.save(event.cp).then(function (response) {
    	  console.log("createChequePrinting " + JSON.stringify(response.data));
        $state.go('cheque-printings');
    });

  };
}

angular
  .module('admin.accounting')
  .controller('ChequePrintingNewController', ChequePrintingNewController);
