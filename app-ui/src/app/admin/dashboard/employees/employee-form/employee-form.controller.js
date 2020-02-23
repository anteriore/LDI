
function EmployeeFormController($state, EmployeesService, $rootScope, _) {
  var ctrl = this;
  
  ctrl.$onChanges = function (changes) {
    if (changes.employee) {
      ctrl.employee = angular.copy(ctrl.employee);
    }
  };
  
  ctrl.submitForm = function () {	   
    console.log('submitForm: ' + JSON.stringify(ctrl.employee));
    ctrl.onSubmit({
      $event: {
    	  employee: ctrl.employee
      }
    });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('EmployeeFormController', EmployeeFormController);
