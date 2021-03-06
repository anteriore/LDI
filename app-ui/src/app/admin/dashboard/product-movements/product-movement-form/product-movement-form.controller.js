
function ProductMovementFormController($state, ProductMovementsService, CategoryService, UnitsService, UsersService, ClassificationsService, ProductInventoryService) {
  var ctrl = this;
  ctrl.$onChanges = function (changes) {
    if (changes.pm) {
      ctrl.pm = angular.copy(ctrl.pm);
    }
  };
  
  ctrl.$onInit = function(){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));

	  ClassificationsService.list().then(function(response){
		  ctrl.classifications = response.data;
	  });
	  CategoryService.list().then(function(response){
		  ctrl.categories = response.data;
	  });
	  UnitsService.list().then(function(response){
		  ctrl.units = response.data;
	  });
	  
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.depots = response.data.depots;
	  });
	  
	  ctrl.stockOnHandList = [];
  };
  
  ctrl.createNewProduct = function(){
	  ctrl.showProduct = true;
  };
  
  ctrl.changeType = function (){
	  ctrl.showProduct = false;
	  ctrl.pm.product = null;
  };
  
  ctrl.createProductList = function(){
	  ctrl.company = JSON.parse(window.localStorage.getItem('company'));
	  ctrl.showProduct = true;
  };
  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.pm));
    
    ctrl.onSubmit({
      $event: {
    	  pm: ctrl.pm
      }
    });
  };
  
  ctrl.findProduct = function(){
	  ProductInventoryService.listByDepot(ctrl.pm.depot.id).then(function(response){
		  ctrl.productsInDepot = response.data;
		  console.log(JSON.stringify(response.data));
		  $("#findProductModal").modal('show');
	  });
  };



  
}

angular
  .module('admin.dashboard')
  .controller('ProductMovementFormController', ProductMovementFormController);
