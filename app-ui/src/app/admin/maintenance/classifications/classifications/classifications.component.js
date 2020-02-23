
var classification = {
  templateUrl: './classifications.html',
  controller: 'ClassificationController'
};

angular
  .module('admin.maintenance')
  .component('classification', classification)
  .config(function ($stateProvider) {
    $stateProvider
      .state('classifications', {
        parent: 'app',
        url: '/admin/maintenance/classification',
        component: 'classification'
      });
  });