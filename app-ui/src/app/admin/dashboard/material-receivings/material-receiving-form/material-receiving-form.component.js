var materialReceivingForm = {
  bindings: {
    mrs: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './material-receiving-form.html',
  controller: 'MaterialReceivingFormController'
};

angular
  .module('admin.dashboard')
  .component('materialReceivingForm', materialReceivingForm);
