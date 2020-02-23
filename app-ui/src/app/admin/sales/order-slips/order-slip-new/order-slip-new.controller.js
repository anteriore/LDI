
function OrderSlipNewController($state, OrderSlipsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.os = {
    		company: $rootScope.selectedCompany,
    		preparedBy: ctrl.user,
    		releasedBy: ctrl.user,
    		checkedBy: ctrl.user,
    		approvedBy: ctrl.user
    };
  };

  ctrl.createOrderSlip = function (event) {
    OrderSlipsService.save(event.os).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
      $state.go('order-slips');
    });

  };
}

angular
  .module('admin.sales')
  .controller('OrderSlipNewController', OrderSlipNewController);
