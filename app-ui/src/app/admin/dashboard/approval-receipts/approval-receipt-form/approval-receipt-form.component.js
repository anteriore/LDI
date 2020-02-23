var approvedReceiptForm = {
  bindings: {
    ar: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './approval-receipt-form.html',
  controller: 'ApprovedReceiptFormController'
};

angular
  .module('admin.dashboard')
  .component('approvedReceiptForm', approvedReceiptForm);
