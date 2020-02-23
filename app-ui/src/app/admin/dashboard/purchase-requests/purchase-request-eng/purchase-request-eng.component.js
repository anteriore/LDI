var purchaseRequestEng = {
  templateUrl: './purchase-request-eng.html',
  controller: 'PurchaseRequestEngController'
};

angular
  .module('admin.dashboard')
  .component('purchaseRequestEng', purchaseRequestEng)
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase-request-eng', {
        parent: 'app',
        url: '/admin/dashboard/purchase-request/eng',
        component: 'purchaseRequestEng'
      });
  });
