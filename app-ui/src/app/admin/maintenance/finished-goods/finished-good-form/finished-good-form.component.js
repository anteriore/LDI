var finishedGoodForm = {
  bindings: {
    finishedgood: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './finished-good-form.html',
  controller: 'FinishedGoodFormController'
};

angular
  .module('admin.maintenance')
  .component('finishedGoodForm', finishedGoodForm);
