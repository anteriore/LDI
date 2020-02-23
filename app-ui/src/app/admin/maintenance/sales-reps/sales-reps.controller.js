
function SalesRepController($state, SalesRepsService, RegionCodesService, CategoryService,_) {
  var ctrl = this;
  ctrl.salesReps = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.salesRep = {};
  ctrl.regionCodes = [];
  ctrl.productCategories= [];
  ctrl.$onInit = function () {
	  ctrl.addSalesRep = false;
	  ctrl.error = null;
	  loadSalesReps();
	  RegionCodesService.list().then(function(response){
		  ctrl.regionCodes = response.data;
	  });
	  
	  CategoryService.list().then(function(response){
		  ctrl.productCategories = response.data;
	  });
  };
  
  function loadSalesReps(){
	  SalesRepsService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.salesReps = response.data;
	  });
  }
  
  ctrl.showAddSalesRep = function (show){
	  ctrl.addSalesRep = show;
  };
  
  ctrl.editSalesRep = function (id) {
	  SalesRepsService.get(id).then(function(response){
		  ctrl.salesRep = response.data;
	  });
	  ctrl.addSalesRep = true;
  };
  
  ctrl.saveSalesRep = function () {
	    SalesRepsService.save(ctrl.salesRep).then(function () {
	    	  loadSalesReps();
	    	  ctrl.showAddSalesRep(false);
	    	  ctrl.salesRep = null;
	    });
  };
  
  ctrl.deleteSalesRep = function (id){
	  SalesRepsService.delete(id).then(function(response){
		  loadSalesReps();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('SalesRepController', SalesRepController);
