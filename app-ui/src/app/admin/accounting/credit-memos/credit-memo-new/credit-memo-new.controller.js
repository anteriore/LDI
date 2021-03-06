
function CreditMemoNewController($state, CreditMemosService, CompanyService, DepartmentsService, PermissionsService) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = JSON.parse(window.localStorage.getItem('company'));
    ctrl.cm = {
    		date: new Date()
    };
  };

  ctrl.createCreditMemo = function (event) {
	console.log("create " + JSON.stringify(event.cm));
    CreditMemosService.save(event.cm).then(function () {
      $state.go('credit-memos');
    });

  };
}

angular
  .module('admin.accounting')
  .controller('CreditMemoNewController', CreditMemoNewController);
