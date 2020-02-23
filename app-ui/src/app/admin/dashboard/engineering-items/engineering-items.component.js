
var engineeringItems = {
  templateUrl: './engineering-items.html',
  controller: 'EngineeringItemController'
};

angular
  .module('admin.dashboard')
  .component('engineeringItems', engineeringItems)
  .config(function ($stateProvider) {
    $stateProvider
      .state('engineering-items', {
        parent: 'app',
        url: '/admin/dashboard/engineering-items',
        component: 'engineeringItems'
      });
  });