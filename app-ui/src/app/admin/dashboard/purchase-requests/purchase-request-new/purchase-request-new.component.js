var purchaseRequestNew = {
  templateUrl: './purchase-request-new.html',
  controller: 'PurchaseRequestNewController'
};

angular
  .module('admin.dashboard')
  .component('purchaseRequestNew', purchaseRequestNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase-request-new', {
        parent: 'app',
        url: '/admin/dashboard/purchase-request/new',
        component: 'purchaseRequestNew'
      });
  });
