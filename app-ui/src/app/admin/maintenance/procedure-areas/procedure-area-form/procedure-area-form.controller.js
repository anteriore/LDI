
function ProcedureAreaFormController($state, ProcedureAreasService) {
  var ctrl = this;
  ctrl.$onChanges = function (changes) {
    if (changes.procedurearea) {
      ctrl.procedurearea = angular.copy(ctrl.procedurearea);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.procedurearea));
    ctrl.onSubmit({
      $event: {
    	  procedurearea: ctrl.procedurearea
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('ProcedureAreaFormController', ProcedureAreaFormController);
