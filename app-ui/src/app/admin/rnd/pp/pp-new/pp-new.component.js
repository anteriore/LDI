
var ppNew = {
    templateUrl: './pp-new.html',
    controller: 'PpNewController'
  };
  
  angular
    .module('admin.rnd')
    .component('ppNew', ppNew)
    .config(function ($stateProvider) {
      $stateProvider
        .state('pp-new', {
          parent: 'app',
          url: '/admin/rnd/pp/new',
          component: 'ppNew'
        });
    });