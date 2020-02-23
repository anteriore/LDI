
function FindVendorModalController($state, VendorsService, $rootScope) {
  var ctrl = this;
  ctrl.vendors = [];
  ctrl.sortType = 'number';
	ctrl.sortReverse = false;
  
  ctrl.$onInit = function(){
	loadVendors();
  };
  
  
  function loadVendors(){
	  ctrl.company = $rootScope.selectedCompany;
	  VendorsService.listByCompany(ctrl.company.id).then(function(response){
		  ctrl.vendors = response.data;
		  console.log("response" + JSON.stringify(ctrl.vendors));
	  });
  }
  
  
  ctrl.getVendor = function(vendor){
	ctrl.vendor = vendor;  
  };
}

angular
  .module('admin.shared')
  .controller('FindVendorModalController', FindVendorModalController);
