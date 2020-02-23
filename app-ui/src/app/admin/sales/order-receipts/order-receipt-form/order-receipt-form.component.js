var orderReceiptForm = {
  bindings: {
    or: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './order-receipt-form.html',
  controller: 'OrderReceiptFormController'
};

angular
  .module('admin.sales')
  .component('orderReceiptForm', orderReceiptForm);
