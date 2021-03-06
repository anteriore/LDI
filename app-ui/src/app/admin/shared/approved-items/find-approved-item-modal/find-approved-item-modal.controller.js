
function FindApprovedItemModalController($state, ApprovedReceiptsService, PurchaseRequestsService, $rootScope) {
  var ctrl = this;
  ctrl.approvedItems = [];
	

  ctrl.sortType = 'controlNumber';
	ctrl.sortReverse = false;
	
  ctrl.$onInit = function(){
	loadApprovedItems();
  };
  
  
  function loadApprovedItems(){
	  ctrl.company = $rootScope.selectedCompany;
	  ApprovedReceiptsService.listByCompany(ctrl.company.id).then(function(response){
		  ctrl.approvedItems = response.data;
		  console.log("response" + JSON.stringify(ctrl.approvedItems));
	  });
  }
  
  
  ctrl.getApprovedItem = function(approvedItem){
	ctrl.approvedreceipt = approvedItem; 
  };
}

angular
  .module('admin.shared')
  .controller('FindApprovedItemModalController', FindApprovedItemModalController);
