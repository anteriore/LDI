var returnSlipNew = {
  templateUrl: './return-slip-new.html',
  controller: 'ReturnSlipNewController'
};

angular
  .module('admin.sales')
  .component('returnSlipNew', returnSlipNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('return-slip-new', {
        parent: 'app',
        url: '/admin/sales/return-slip/new',
        component: 'returnSlipNew'
      });
  });
