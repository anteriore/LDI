
var costingSave = {
  bindings: {
    id: '<'
  },
  templateUrl: './costing-save.html',
  controller: 'CostingSaveController'
};

angular
  .module('admin.dashboard')
  .component('costingSave', costingSave)
  .config(function ($stateProvider) {
    $stateProvider
      .state('costing-save', {
        parent: 'app',
        url: '/admin/costing-save?id',
        component: 'costingSave',
        params: {
          id: null
        },
        resolve: {
          id: function ($transition$) {
            return $transition$.params();
          }
        }
      });
  });