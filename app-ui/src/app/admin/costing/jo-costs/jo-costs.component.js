var joCosts = {
  bindings: {
    costings: '<'
  },
  templateUrl: './jo-costs.html',
  controller: 'JoCostsController'
};

angular
  .module('admin.dashboard')
  .component('joCosts', joCosts)
  .config(function ($stateProvider) {
    $stateProvider
      .state('joCosts', {
        parent: 'app',
        url: '/admin/joCosts?filter',
        component: 'joCosts',
        params: {
          filter: {
            value: 'none'
          }
        },
        resolve: {
          filter: function ($transition$) {
            return $transition$.params();
          }
        }
      });
  });