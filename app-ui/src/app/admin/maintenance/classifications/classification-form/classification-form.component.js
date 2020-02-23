var classificationForm = {
  bindings: {
    classification: '=',
    company: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './classification-form.html',
  controller: 'ClassificationFormController'
};

angular
  .module('admin.maintenance')
  .component('classificationForm', classificationForm);
