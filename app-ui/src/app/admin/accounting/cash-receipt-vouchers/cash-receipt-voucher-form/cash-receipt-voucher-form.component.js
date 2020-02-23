var cashReceiptVoucherForm = {
  bindings: {
    crv: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './cash-receipt-voucher-form.html',
  controller: 'CashReceiptVoucherFormController'
};

angular
  .module('admin.accounting')
  .component('cashReceiptVoucherForm', cashReceiptVoucherForm);
