var purchaseVoucherForm = {
  bindings: {
    pv: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './purchase-voucher-form.html',
  controller: 'PurchaseVoucherFormController'
};

angular
  .module('admin.accounting')
  .component('purchaseVoucherForm', purchaseVoucherForm);
