
function ReceivingReceiptNewController($state, ReceivingReceiptsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.rr = {
    		company: $rootScope.selectedCompany,
    		receivedBy: ctrl.user
    };
  };

  ctrl.createReceivingReceipt = function (event) {
    ReceivingReceiptsService.save(event.rr).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
      $state.go('receiving-receipts');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('ReceivingReceiptNewController', ReceivingReceiptNewController);
