var departmentForm = {
  bindings: {
    department: '=',
    company: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './department-form.html',
  controller: 'DepartmentFormController'
};

angular
  .module('admin.maintenance')
  .component('departmentForm', departmentForm);
