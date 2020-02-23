
function MaterialReceivingNewController($state, MaterialReceivingsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
  };

  ctrl.createMRS = function (event) {
    MaterialReceivingsService.save(event.mrs).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
        $state.go('materialreceiving');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('MaterialReceivingNewController', MaterialReceivingNewController);
