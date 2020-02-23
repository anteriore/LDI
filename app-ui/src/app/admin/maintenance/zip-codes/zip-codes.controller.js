
function ZipCodeController($state, ZipCodesService, RegionCodesService, ProvinceCodesService,_) {
  var ctrl = this;
  ctrl.zipCodes = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.zipCode = {};
  ctrl.regionCodes = [];
  ctrl.provinceCodes= [];
  ctrl.$onInit = function () {
	  ctrl.addZipCode = false;
	  ctrl.error = null;
	  loadZipCodes();
	  RegionCodesService.list().then(function(response){
		  ctrl.regionCodes = response.data;
	  });
	  
	  ProvinceCodesService.list().then(function(response){
		  ctrl.provinceCodes = response.data;
	  });
  };
  
  function loadZipCodes(){
	  ZipCodesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.zipCodes = response.data;
	  });
  }
  
  ctrl.showAddZipCode = function (show){
	  ctrl.addZipCode = show;
  };
  
  ctrl.editZipCode = function (id) {
	  ZipCodesService.get(id).then(function(response){
		  ctrl.zipCode = response.data;
	  });
	  ctrl.addZipCode = true;
  };
  
  ctrl.saveZipCode = function () {
	    ZipCodesService.save(ctrl.zipCode).then(function () {
	    	  loadZipCodes();
	    	  ctrl.showAddZipCode(false);
	    	  ctrl.zipCode = null;
	    });
  };
  
  ctrl.deleteZipCode = function (id){
	  ZipCodesService.delete(id).then(function(response){
		  loadZipCodes();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ZipCodeController', ZipCodeController);
