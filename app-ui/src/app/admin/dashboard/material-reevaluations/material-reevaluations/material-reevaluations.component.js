
var materialReevaluation = {
  templateUrl: './material-reevaluations.html',
  controller: 'MaterialReevaluationController'
};

angular
  .module('admin.dashboard')
  .component('materialReevaluation', materialReevaluation)
  .config(function ($stateProvider) {
    $stateProvider
      .state('material-reevaluations', {
        parent: 'app',
        url: '/admin/dashboard/material-reevaluation',
        component: 'materialReevaluation'
      });
  });