var vouchersPayableNew = {
  templateUrl: './vouchers-payable-new.html',
  controller: 'VouchersPayableNewController'
};

angular
  .module('admin.accounting')
  .component('vouchersPayableNew', vouchersPayableNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('vouchers-payable-new', {
        parent: 'app',
        url: '/admin/accounting/vouchers-payable/new',
        component: 'vouchersPayableNew'
      });
  });
