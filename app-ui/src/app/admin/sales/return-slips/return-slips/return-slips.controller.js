
function ReturnSlipController($state, ReturnSlipsService, UsersService, $rootScope, $location, _) {
  var ctrl = this;
  ctrl.returnSlips = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addReturnSlip = false;
	  ctrl.error = null;
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
  };
  
  ctrl.selectDepot = function(){
	  loadReturnSlips();
  };
  
  function loadReturnSlips(){
	  ctrl.company = $rootScope.selectedCompany;
	  ReturnSlipsService.listByDepot(ctrl.userAssignedDepot.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.returnSlips = response.data;
	  });
  }
  
  ctrl.searchPrf = function(event){
	  ctrl.prfTable.DataTable.search(event).draw();
  };
  
  ctrl.createNewReturnSlip = function (event) {
	    console.log('createNewReturnSlip');
	    $state.go('return-slip-new');
	    
  };
  
  /*
  ctrl.openModal = function(returnSlip){
	  console.log("show modal" +  ctrl.showModal);
	  ctrl.so = returnSlip;
	  ReturnSlipsService.getLatestCancelledReqs(ctrl.so.id).then(function(response){
		  ctrl.cancelreqs = response.data;
		  for(var i = 0; i < ctrl.so.products.length; i++){
			  for(var j = 0; j < ctrl.cancelreqs.length; j++){
				  if(ctrl.so.products[i].id == ctrl.cancelreqs[j].returnSlipProduct.id){
					  console.log("hi" + ctrl.cancelreqs);
					  ctrl.so.products[i].cancelReq = ctrl.cancelreqs[j];
				  }
			  }
		  }
	  });
	  
	  console.log("returnSlip" + JSON.stringify(ctrl.so));

	  $('#soInfoModal').modal('show');
	  
  };
  */
  ctrl.edit = function (so) {
	  $state.go('return-slip-edit', { 'soId': so.id });
  };
  /*
  ctrl.showAddReturnSlip = function (show){
	  ctrl.addReturnSlip = show;
  };
  
  
  
  ctrl.saveReturnSlip = function (event) {
	    ReturnSlipsService.save(event.purchaserequest).then(function () {
	    	  loadReturnSlips();
	    	  ctrl.showAddReturnSlip(false);
	    	  ctrl.purchaserequest = null;
	    });
  };
  */
  
  ctrl.deleteReturnSlip = function (id){
	  ReturnSlipsService.delete(id).then(function(response){
		  loadReturnSlips();
	  });
  };
  
 
}

angular
  .module('admin.sales')
  .controller('ReturnSlipController', ReturnSlipController);
