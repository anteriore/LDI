
function DebitMemoNewController($state, DebitMemosService, CompanyService, DepartmentsService, PermissionsService) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = JSON.parse(window.localStorage.getItem('company'));
    ctrl.dm = {
    		date: new Date()
    };
  };

  ctrl.createDebitMemo = function (event) {
	console.log("create " + JSON.stringify(event.dm));
    DebitMemosService.save(event.dm).then(function () {
      $state.go('debit-memos');
    });

  };
}

angular
  .module('admin.accounting')
  .controller('DebitMemoNewController', DebitMemoNewController);
