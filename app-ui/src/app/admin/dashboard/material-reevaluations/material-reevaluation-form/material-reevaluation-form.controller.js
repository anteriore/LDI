
function MaterialReevaluationFormController($state, MaterialReevaluationsService, ApprovedItemsService, _) {
  var ctrl = this;
  
  ctrl.$onChanges = function (changes) {
    if (changes.mr) {
      ctrl.mr = angular.copy(ctrl.mr);
    }
  };

  ctrl.$onInit = function(){
	 ctrl.mr.reevaluatedBy = JSON.parse(window.localStorage.getItem("currentUser"));
	 ctrl.name = ctrl.mr.reevaluatedBy.firstName + " " + ctrl.mr.reevaluatedBy.lastName;
  };
  
  ctrl.submitForm = function () {	   
    console.log('submitForm: ' + JSON.stringify(ctrl.mr));
    ctrl.onSubmit({
      $event: {
    	  mr: ctrl.mr
      }
    });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('MaterialReevaluationFormController', MaterialReevaluationFormController);
