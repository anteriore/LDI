
var moMultitest = {
    templateUrl: './mo-multi-test.html',
    controller: 'MoMultiTestController'
  };
  
  angular
    .module('admin.rnd')
    .component('moMultitest', moMultitest)
    .config(function ($stateProvider) {
      $stateProvider
        .state('mo-multi-test', {
          parent: 'app',
          url: '/admin/rnd/mo/multi-test',
          component: 'moMultitest'
        });
    });