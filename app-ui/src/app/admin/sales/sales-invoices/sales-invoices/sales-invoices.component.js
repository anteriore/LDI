
var salesInvoice = {
  templateUrl: './sales-invoices.html',
  controller: 'SalesInvoiceController'
};

angular
  .module('admin.sales')
  .component('salesInvoice', salesInvoice)
  .config(function ($stateProvider) {
    $stateProvider
      .state('sales-invoices', {
        parent: 'app',
        url: '/admin/sales/sales-invoice',
        component: 'salesInvoice'
      });
  });