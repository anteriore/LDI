
function ReturnSlipNewController($state, $stateParams, ReturnSlipsService, CompanyService, DepartmentsService, PermissionsService) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.rs = {
    		company: ctrl.user.company,
    		returnSlipProducts: []
    };
  };

  ctrl.createReturnSlip = function (event) {
	console.log("create " + JSON.stringify(event.rs));
    ReturnSlipsService.save(event.rs).then(function () {
      $state.go('return-slips');
    });

  };
}

angular
  .module('admin.sales')
  .controller('ReturnSlipNewController', ReturnSlipNewController);
