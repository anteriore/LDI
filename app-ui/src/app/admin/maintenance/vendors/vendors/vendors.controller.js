
function VendorController($state, VendorsService, CompanyService, $rootScope, _) {
  var ctrl = this;
  ctrl.vendors = [];
  ctrl.companies = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.searchTin = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addVendor = false;
	  ctrl.error = null;
	  loadVendors();
  };
  
  function loadVendors(){
	  ctrl.company = $rootScope.selectedCompany;
	  VendorsService.listByCompany(ctrl.company.id).then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.vendors = response.data;
	  });
  }
  
  ctrl.goToEdit = function(id) {
    $state.go("vendor-edit",  { 'vendorId': id });
  }
  
  /*
  ctrl.showAddVendor = function (show){
	  ctrl.addVendor = show;
  };
  
  ctrl.editVendor = function (id) {
	  VendorsService.get(id).then(function(response){
		  ctrl.vendor = response.data;
	  });
	  ctrl.addVendor = true;
  };
  
  ctrl.saveVendor = function (event) {
	    event.vendor.company = $rootScope.selectedCompany;
	    console.log(event.vendor.company);
	    VendorsService.save(event.vendor).then(function () {
	    	
	    	  loadVendors();
	    	  ctrl.showAddVendor(false);
	    	  ctrl.vendor = null;
	    });
  };
  
  ctrl.deleteVendor = function (id){
	  VendorsService.delete(id).then(function(response){
		  loadVendors();
	  });
  };*/
}

angular
  .module('admin.maintenance')
  .controller('VendorController', VendorController);
