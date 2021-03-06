
function ApprovedReceiptFormController($state, ApprovedReceiptsService, ReceivingReceiptsService, _) {
  var ctrl = this;

  var currentUser = localStorage.getItem('currentUser');
      if (currentUser != null) {
          ctrl.currentUser = JSON.parse(currentUser);
      }
  
  ctrl.$onInit = function (){
    
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.ar) {
      ctrl.ar = angular.copy(ctrl.ar);
    }
  };

  ctrl.findReceivingReceipts = function() {
    ReceivingReceiptsService.listReceivedItemByStatus("Quarantined").then(function(response) {
      ctrl.receivingReceipts = response.data;
    });
  }

  ctrl.calculateTotal = function(approvedItem) {
    approvedItem.approvedQuantity = parseInt(approvedItem.receivedQuantity)  - parseInt(approvedItem.rejectedQuantity) - parseInt(approvedItem.qcSamples);
  }

  ctrl.populateApprovedItems = function(rr) {
    
    ctrl.ar.item = rr.receivedItem.item;
    ctrl.ar.receivedQuantity = rr.receivedItem.quantity;
    ctrl.ar.approvedQuantity = 0;
    ctrl.ar.rejectedQuantity = 0;
    ctrl.ar.qcSamples = 0;
    ctrl.ar.totalQuantity = rr.quantity;
    ctrl.ar.unit = rr.unit;
    ctrl.ar.receivingReceipt = rr;
    ctrl.ar.receivingReceipt.id = rr.rrId;
    ctrl.calculateTotal(ctrl.ar);
    console.log(ctrl.ar);
  }

  
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
    	  ar: ctrl.ar
      }
    });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('ApprovedReceiptFormController', ApprovedReceiptFormController);
