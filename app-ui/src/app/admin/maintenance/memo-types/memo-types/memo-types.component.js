
var memoType = {
  templateUrl: './memo-types.html',
  controller: 'MemoTypeController'
};

angular
  .module('admin.maintenance')
  .component('memoType', memoType)
  .config(function ($stateProvider) {
    $stateProvider
      .state('memo-types', {
        parent: 'app',
        url: '/admin/maintenance/memo-type',
        component: 'memoType'
      });
  });