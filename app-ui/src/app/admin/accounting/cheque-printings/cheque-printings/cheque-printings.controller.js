
function ChequePrintingController($state, ChequePrintingsService, $rootScope) {
  var ctrl = this;
  
  ctrl.chequePrintings = [];

  ctrl.searchNumber = '';
  ctrl.searchRRNumber = '';
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  
  ctrl.$onInit = function () {
	  ctrl.addJournalRequest = false;
	  ctrl.error = null;
	  loadChequePrintings();
  };
  
  
  function loadChequePrintings(){
	ctrl.company = $rootScope.selectedCompany;
	ChequePrintingsService.listByCompany(ctrl.company.id).then((response) => {
      ctrl.chequePrintings = response.data;
      console.log("response v" + JSON.stringify(ctrl.chequePrintings));
    });
	  
  }

  ctrl.viewVp = function(vp){
	  ctrl.vp = vp;
  };
  
  ctrl.openModal = function(chequePrinting){
	  console.log("openModal");
    ctrl.cp = chequePrinting;
  };
  
  ctrl.approve = function(cpId){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  ChequePrintingsService.approve(cpId, ctrl.user.id).then(function(response){
		  if(response.data){
			  alert("Approved");
			  loadChequePrintings();
		  }
	  });
  };
  
  ctrl.print = function(){
	  window.print();
  };
  
  ctrl.goToEdit = function (id) {
	    $state.go('cheque-printing-edit', { 'chequePrintingId': id });
   }
/*
  ctrl.openModalApprovedItem = function(approvedItem) {
    console.log("openModalApprovedItem");
    ctrl.approvedItem = approvedItem;
  };*/
  
}

angular
  .module('admin.accounting')
  .controller('ChequePrintingController', ChequePrintingController);
