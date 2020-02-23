
function ProductReceivingNewController($state, ProductReceivingsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
  };

  ctrl.createPRS = function (event) {
    ProductReceivingsService.save(event.prs).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
        $state.go('productReceivings');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('ProductReceivingNewController', ProductReceivingNewController);
