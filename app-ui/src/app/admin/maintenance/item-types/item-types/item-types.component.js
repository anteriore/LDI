
var itemType = {
  templateUrl: './item-types.html',
  controller: 'ItemTypeController'
};

angular
  .module('admin.maintenance')
  .component('itemType', itemType)
  .config(function ($stateProvider) {
    $stateProvider
      .state('item-types', {
        parent: 'app',
        url: '/admin/maintenance/item-type',
        component: 'itemType'
      });
  });