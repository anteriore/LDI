var procedureForm = {
  bindings: {
    procedure: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './procedure-form.html',
  controller: 'ProcedureFormController'
};

angular
  .module('admin.maintenance')
  .component('procedureForm', procedureForm);
