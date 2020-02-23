var costingMain = {
  bindings: {
    costings: '<'
  },
  templateUrl: './costing-main.html',
  controller: 'CostingMainController'
};

angular
  .module('admin.dashboard')
  .component('costingMain', costingMain)
  .config(function ($stateProvider) {
    $stateProvider
      .state('costing-main', {
        parent: 'app',
        url: '/admin/costing?filter',
        component: 'costingMain',
        params: {
          filter: {
            value: 'none'
          }
        },
        resolve: {
          filter: function ($transition$) {
            return $transition$.params();
          }
        }
      });
  });