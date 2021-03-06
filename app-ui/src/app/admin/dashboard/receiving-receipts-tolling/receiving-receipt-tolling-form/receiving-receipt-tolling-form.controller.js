
function ReceivingReceiptTollingFormController($state, ReceivingReceiptsService, UnitsService, ItemsService) {
  var ctrl = this;


  
  ctrl.$onInit = function (){
    console.log('onInit', ctrl.rr);
    ctrl.rr.receivedItems = [];  
    UnitsService.list().then((res) => {
      ctrl.units = res.data;
    });

    ItemsService.list().then((res) => {
      ctrl.items = res.data;
    });
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.rr) {
      ctrl.rr = angular.copy(ctrl.rr);
    }
  };

  ctrl.addItemHere = function() {
    console.log('addItem');
    ctrl.rr.receivedItems.push({unit: {code: null, name: null}, item: {code: null, name: null}});
  };

  ctrl.loadReceivedItems = function (receivedItem, index){
	  receivedItem.item = ctrl.rr.purchaseOrder.purchaseRequests[index].item;
	  receivedItem.unit = ctrl.rr.purchaseOrder.purchaseRequests[index].packSize;
  };

  ctrl.removeItem = function (index) {
    ctrl.rr.receivedItems.splice(index, 1);
  }
  
  ctrl.submitForm = function () {
  	console.log("RECEIVED ITEMS" + JSON.stringify(ctrl.rr.receivedItems));
    console.log('submitForm: ' + JSON.stringify(ctrl.rr));
    ctrl.onSubmit({
      $event: {
    	  rr: ctrl.rr
      }
    });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('ReceivingReceiptTollingFormController', ReceivingReceiptTollingFormController);
