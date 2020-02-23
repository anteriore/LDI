
var procedure = {
  templateUrl: './procedures.html',
  controller: 'ProcedureController'
};

angular
  .module('admin.maintenance')
  .component('procedure', procedure)
  .config(function ($stateProvider) {
    $stateProvider
      .state('procedures', {
        parent: 'app',
        url: '/admin/maintenance/procedure',
        component: 'procedure'
      });
  });