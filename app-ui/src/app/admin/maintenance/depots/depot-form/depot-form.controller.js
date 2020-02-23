
function DepotFormController($state, DepotsService, AreasService, $rootScope) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.depot) {
      ctrl.depot = angular.copy(ctrl.depot);
    }
  };
  
  ctrl.$onInit = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  AreasService.listByCompany(ctrl.company.id).then(function(response){
		  console.log(JSON.stringify(response.data));
		  ctrl.areas = response.data;
	  });
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.depot));
    ctrl.onSubmit({
      $event: {
    	  depot: ctrl.depot
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('DepotFormController', DepotFormController);
