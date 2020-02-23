
var cashReceiptVoucher = {
  templateUrl: './cash-receipt-vouchers.html',
  controller: 'CashReceiptVoucherController'
};

angular
  .module('admin.accounting')
  .component('cashReceiptVoucher', cashReceiptVoucher)
  .config(function ($stateProvider) {
    $stateProvider
      .state('cash-receipt-vouchers', {
        parent: 'app',
        url: '/admin/accounting/cash-receipt-voucher',
        component: 'cashReceiptVoucher'
      });
  });