
var pp = {
    templateUrl: './pp.html',
    controller: 'PpController'
  };
  
  angular
    .module('admin.rnd')
    .component('pp', pp)
    .config(function ($stateProvider) {
      $stateProvider
        .state('pp', {
          parent: 'app',
          url: '/admin/rnd/pp',
          component: 'pp'
        });
    });