var materialReevaluationForm = {
  bindings: {
    mr: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './material-reevaluation-form.html',
  controller: 'MaterialReevaluationFormController'
};

angular
  .module('admin.dashboard')
  .component('materialReevaluationForm', materialReevaluationForm);
