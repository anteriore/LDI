
function DepartmentFormController($state, DepartmentsService) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.department) {
      ctrl.department = angular.copy(ctrl.department);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.department));
    ctrl.onSubmit({
      $event: {
    	  department: ctrl.department
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('DepartmentFormController', DepartmentFormController);
