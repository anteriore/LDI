var clientInformationEdit = {
  templateUrl: './client-information-edit.html',
  controller: 'ClientInformationEditController'
};

angular
  .module('admin.maintenance')
  .component('clientInformationEdit', clientInformationEdit)
  .config(function ($stateProvider) {
    $stateProvider
      .state('client-information-edit', {
        parent: 'app',
        url: '/admin/maintenance/client-information/edit/:clientId',
        component: 'clientInformationEdit'
      });
  });
