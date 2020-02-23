
function PurchaseVoucherFormController($state, PurchaseVouchersService, ReceivingReceiptsService, PurchaseOrdersService, UsersService, $rootScope) {
	  
  var ctrl = this;
  
  var currentUser = localStorage.getItem('currentUser');
      if (currentUser != null) {
          ctrl.currentUser = JSON.parse(currentUser);
      }
  
  ctrl.$onInit = function (){
	  ctrl.company = $rootScope.selectedCompany;
	  ctrl.printFlag = false;
	    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));

	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.user = response.data;
	  });
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.pv) {
      ctrl.pv = angular.copy(ctrl.pv);
    }
  };

  
  ctrl.toggleAdjustment = function(flag){
	  
		  ctrl.pv = {date: new Date(),
			  	manual: flag, 
			  	accountTitles: [],
			  	company: ctrl.company,
	    		type: "PJV",
	    		preparedBy: ctrl.user};
  };

  ctrl.findReceivingReceipts = function() {
    ReceivingReceiptsService.listRrWithoutPurchaseVoucher(ctrl.company.id).then(function(response) {
      ctrl.receivingReceipts = response.data;
      console.log(ctrl.receivingReceipts);
    });
  };

  ctrl.selectReceivingReceipt = function (rr){
	  ctrl.pv.rrNumber = rr.number;
	  ctrl.pv.siNumber = rr.siNumber;
	  ctrl.pv.drNumber = rr.drNumber;
	  ctrl.pv.poNumber = rr.poNumber;
	  ctrl.pv.rrDate = rr.date;
	  PurchaseOrdersService.getByNumber(rr.poNumber).then(function(response){
		  ctrl.pv.vendor = response.data.vendor;
	  });
	  ctrl.rrValidFlag = 'true';
  };
  
  ctrl.submitForm = function () {
	ctrl.company = $rootScope.selectedCompany;
    ctrl.onSubmit({
      $event: {
    	  pv: ctrl.pv
      }
    });
    
    ctrl.printFlag = true;
  };
  
  ctrl.validateRrNumber = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  if(ctrl.pv.id == undefined){
		  PurchaseVouchersService.isRrNumberValid(ctrl.company.id, ctrl.pv.rrNumber).then(function(response){
			  ctrl.rrValidFlag = response.data;
			  if(ctrl.rrValidFlag){
				  alert("RR Number is OK");
			  }else{
				  alert("RR already has PJV");
			  }
		  });
	  }
	  else{
		  console.log("ASDASD " + ctrl.pv.id);
		  PurchaseVouchersService.get(ctrl.pv.id).then(function(response){
			  if(ctrl.pv.rrNumber === response.data.rrNumber){
				  alert("RR Number is OK");
			  }else{
				  PurchaseVouchersService.isRrNumberValid(ctrl.company.id, ctrl.pv.rrNumber).then(function(response){
					  ctrl.rrValidFlag = response.data;
					  if(ctrl.rrValidFlag){
						  alert("RR Number is OK");
					  }else{
						  alert("RR already has PJV");
					  }
				  });
			  }
		  });
		  
	  }
	  
  };
  

}

angular
  .module('admin.accounting')
  .controller('PurchaseVoucherFormController', PurchaseVoucherFormController);
