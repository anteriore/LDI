
var clusterCode = {
  templateUrl: './cluster-codes.html',
  controller: 'ClusterCodeController'
};

angular
  .module('admin.maintenance')
  .component('clusterCode', clusterCode)
  .config(function ($stateProvider) {
    $stateProvider
      .state('cluster-codes', {
        parent: 'app',
        url: '/admin/maintenance/cluster-code',
        component: 'clusterCode'
      });
  });