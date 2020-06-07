function ClientInformationFormController(
  $state,
  ClusterCodesService,
  SalesRepsService,
  InstitutionalCodesService,
  DepotsService
) {
  var ctrl = this;

  var currentUser = localStorage.getItem('currentUser');
  if (currentUser != null) {
    ctrl.currentUser = JSON.parse(currentUser);
  }

  ctrl.$onInit = function () {
    console.log(this);
    ClusterCodesService.list().then(function (response) {
      ctrl.clusters = response.data;
    });
    SalesRepsService.list().then(function (response) {
      ctrl.salesReps = response.data;
    });

    InstitutionalCodesService.list().then(function (response) {
      ctrl.institutionalCodes = response.data;
    });

    DepotsService.list().then(function (response) {
      ctrl.depot = response.data;
      console.log(ctrl.deliveryDepots);
    });

    ctrl.status = [
      { value: 'Active', name: 'Active' },
      { value: 'Not Active', name: 'Not Active' },
    ];
  };

  ctrl.$onChanges = function (changes) {
    if (changes.client) {
      ctrl.client = angular.copy(ctrl.client);
    }
  };

  ctrl.addReference = function () {
    console.log('addReference clicked');
    ctrl.client.clientReferencesList.push({
      name: '',
      type: '',
      branch: '',
      telephoneNumber: '',
    });
  };

  ctrl.submitForm = function () {
    console.log('test');
    ctrl.onSubmit({
      $event: {
        client: ctrl.client,
      },
    });
  };
}

angular
  .module('admin.maintenance')
  .controller(
    'ClientInformationFormController',
    ClientInformationFormController
  );
