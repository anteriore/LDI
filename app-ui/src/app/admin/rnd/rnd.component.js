
var rnd = {
    templateUrl: './rnd.html',
    controller: 'RndController'
  };
  
  angular
    .module('admin.rnd')
    .component('rnd', rnd)
    .config(function ($stateProvider) {
      $stateProvider
        .state('rnd', {
          parent: 'app',
          url: '/admin/rnd',
          component: 'rnd'
        });
    });