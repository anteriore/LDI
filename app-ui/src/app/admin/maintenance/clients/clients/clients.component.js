
var client = {
  templateUrl: './clients.html',
  controller: 'ClientController'
};

angular
  .module('admin.maintenance')
  .component('client', client)
  .config(function ($stateProvider) {
    $stateProvider
      .state('clients', {
        parent: 'app',
        url: '/admin/maintenance/client',
        component: 'client'
      });
  });