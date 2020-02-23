
function MaterialIssuancesController($state, MaterialIssuancesService, $rootScope, _) {
  var ctrl = this;
  ctrl.materialIssuanceSlips = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addMaterialIssuances = false;
	  ctrl.error = null;
	  loadMaterialIssuances();
  };
  
  function loadMaterialIssuances(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  MaterialIssuancesService.listByCompany(ctrl.company.id).then(function(response){
	  	  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.materialIssuanceSlips = response.data;
	  });
  }
  
  ctrl.openModal = function(inventory){
	  ctrl.mis = inventory;
	  
  };
  
  ctrl.createNewMIS = function (event) {
	  console.log("new mis");
	    $state.go('material-issuance-new');
  };
}

angular
  .module('admin.dashboard')
  .controller('MaterialIssuancesController', MaterialIssuancesController);
