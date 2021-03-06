
function ProductMovementController($state, ProductMovementsService, $rootScope, _) {
  var ctrl = this;
  ctrl.products = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addProductMovement = false;
	  ctrl.error = null;
	  loadProductMovements();
  };
  
  function loadProductMovements(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  ProductMovementsService.listByCompany(ctrl.company.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.productMovements = response.data;
	  });
  }
  
  ctrl.searchPrf = function(event){
	  ctrl.productTable.DataTable.search(event).draw();
  };
  
  ctrl.createNewProductMovement = function (event) {
	    console.log('createNewProductMovement');
	    $state.go('product-movement-new');
  };
  
  ctrl.openModal = function(product){
	  console.log("show modal" +  ctrl.showModal);
	  console.log("product" + JSON.stringify(product));
	  ctrl.product = product;
	  $('#productInfoModal').modal('show');
	  
  };
  
}

angular
  .module('admin.dashboard')
  .controller('ProductMovementController', ProductMovementController);
