

function AppController(globalConfig, $http) {
    var ctrl = this;
    ctrl.appVersion = globalConfig.version;
    ctrl.superadminServerVersion = "offline";
    $http.get(globalConfig.baseUrl + '/version').then(function(response) {
        console.log("server version response: " + response.data.version);
        ctrl.superadminServerVersion = response.data.version;
    });
};

/**
 * @ngdoc type
 * @module admin.common
 * @name AppController
 *
 */
angular
  .module('admin.common')
  .controller('AppController', AppController);