
var employee = {
  templateUrl: './employees.html',
  controller: 'EmployeesController'
};

angular
  .module('admin.dashboard')
  .component('employee', employee)
  .config(function ($stateProvider) {
    $stateProvider
      .state('employee', {
        parent: 'app',
        url: '/admin/dashboard/employee',
        component: 'employee'
      });
  });