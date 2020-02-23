
var clientInformation = {
  templateUrl: './client-informations.html',
  controller: 'ClientInformationsController'
};

angular
  .module('admin.maintenance')
  .component('clientInformation', clientInformation)
  .config(function ($stateProvider) {
    $stateProvider
      .state('client-informations', {
        parent: 'app',
        url: '/admin/maintenance/client-information',
        component: 'clientInformation'
      });
  });