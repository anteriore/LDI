var pdcVoucherNew = {
  templateUrl: './pdc-voucher-new.html',
  controller: 'PdcVoucherNewController'
};

angular
  .module('admin.accounting')
  .component('pdcVoucherNew', pdcVoucherNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('pdc-voucher-new', {
        parent: 'app',
        url: '/admin/accounting/pdc-voucher/new',
        component: 'pdcVoucherNew'
      });
  });
