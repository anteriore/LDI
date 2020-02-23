
var materialissuance = {
  templateUrl: './material-issuances.html',
  controller: 'MaterialIssuancesController'
};

angular
  .module('admin.dashboard')
  .component('materialissuance', materialissuance)
  .config(function ($stateProvider) {
    $stateProvider
      .state('materialissuance', {
        parent: 'app',
        url: '/admin/dashboard/material-issuance',
        component: 'materialissuance'
      });
  });