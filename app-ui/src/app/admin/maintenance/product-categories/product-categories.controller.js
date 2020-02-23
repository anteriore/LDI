
function ProductCategoriesController($state, ProductCategoriesService, ProductDivisionCodesService, _) {
  var ctrl = this;
  ctrl.productCategories = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.productCategory = {};
  ctrl.$onInit = function () {
	  ctrl.addProductCategories = false;
	  ctrl.error = null;
	  
	  ProductDivisionCodesService.list().then(function(response){
		  ctrl.divisions = response.data;
	  });
	  
	  loadProductCategories();
  };
  
  function loadProductCategories(){
	  ProductCategoriesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.productCategories = response.data;
	  });
  }
  
  ctrl.showAddProductCategory = function (show){
	  ctrl.addProductCategory = show;
  };
  
  ctrl.editProductCategories = function (id) {
	  ProductCategoriesService.get(id).then(function(response){
		  ctrl.productCategories = response.data;
	  });
	  ctrl.addProductCategories = true;
  };
  
  ctrl.saveProductCategory = function () {
	    ProductCategoriesService.save(ctrl.productCategory).then(function () {
	    	  loadProductCategories();
	    	  ctrl.showAddProductCategory(false);
	    	  ctrl.productCategories = null;
	    });
  };
  
  ctrl.deleteProductCategories = function (id){
	  ProductCategoriesService.delete(id).then(function(response){
		  loadProductCategories();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ProductCategoriesController', ProductCategoriesController);
