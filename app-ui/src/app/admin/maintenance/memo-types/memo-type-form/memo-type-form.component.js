var memoTypeForm = {
  bindings: {
    memotype: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './memo-type-form.html',
  controller: 'MemoTypeFormController'
};

angular
  .module('admin.maintenance')
  .component('memoTypeForm', memoTypeForm);
