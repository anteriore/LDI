
var groupAndCategory = {
  bindings: {

  },
  templateUrl: './groups-and-categories.html',
  controller: 'GroupAndCategoryController'
};

angular
  .module('admin.maintenance')
  .component('groupAndCategory', groupAndCategory)
  .config(function ($stateProvider) {
    $stateProvider
      .state('group-and-category', {
        parent: 'app',
        url: '/admin/maintenance/group-and-category',
        component: 'groupAndCategory'
      });
  });