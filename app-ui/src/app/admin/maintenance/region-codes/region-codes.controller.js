
function RegionCodeController($state, RegionCodesService, _) {
  var ctrl = this;
  ctrl.regionCodes = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.regionCode = {};
  
  ctrl.$onInit = function () {
	  ctrl.addRegionCode = false;
	  ctrl.error = null;
	  loadRegionCodes();
  };
  
  function loadRegionCodes(){
	  RegionCodesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.regionCodes = response.data;
	  });
  }
  
  ctrl.showAddRegionCode = function (show){
	  ctrl.addRegionCode = show;
  };
  
  ctrl.editRegionCode = function (id) {
	  RegionCodesService.get(id).then(function(response){
		  ctrl.regionCode = response.data;
	  });
	  ctrl.addRegionCode = true;
  };
  
  ctrl.saveRegionCode = function () {
	    RegionCodesService.save(ctrl.regionCode).then(function () {
	    	  loadRegionCodes();
	    	  ctrl.showAddRegionCode(false);
	    	  ctrl.regionCode = null;
	    });
  };
  
  ctrl.deleteRegionCode = function (id){
	  RegionCodesService.delete(id).then(function(response){
		  loadRegionCodes();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('RegionCodeController', RegionCodeController);
