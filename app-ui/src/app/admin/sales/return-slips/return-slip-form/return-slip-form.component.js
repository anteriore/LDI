var returnSlipForm = {
  bindings: {
    rs: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './return-slip-form.html',
  controller: 'ReturnSlipFormController'
};

angular
  .module('admin.sales')
  .component('returnSlipForm', returnSlipForm);
