
function ProductMovementNewController($state, ProductMovementsService, CompanyService, DepartmentsService, PermissionsService) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = JSON.parse(window.localStorage.getItem('company'));
    ctrl.pm = {
    		requestedBy: ctrl.user,
    		company: ctrl.company,
    		date: new Date(),
    		products:[]
    };
  };

  ctrl.createProductMovement = function (event) {
	console.log("create " + JSON.stringify(event.pm));
    ProductMovementsService.save(event.pm).then(function () {
      $state.go('product-movements');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('ProductMovementNewController', ProductMovementNewController);
