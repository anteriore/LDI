
function FindProductModalController($state, ProductInventoryService) {
  var ctrl = this;
  
  ctrl.products = [];
  ctrl.issuedlist = [];
  ctrl.productlist = [];
  ctrl.stockonhand = [];
  ctrl.issuedproductlist = [];

  ctrl.$onInit = function() {
	  
  }
  
  ctrl.selectProduct = function(productInventory){
	  
	  if(ctrl.issuedproductlist.indexOf(productInventory.product) !== -1){
		  var index = ctrl.issuedlist.indexOf(productInventory.product);
		  ctrl.issuedlist.splice(index, 1);
		  ctrl.stockonhand.splice(index, 1);
		  ctrl.issuedproductlist.splice(index, 1);
	  }else{
		  ctrl.issuedproductlist.push(productInventory.product);
		  ctrl.issuedlist.push(
				  {
					  product:productInventory.product,
					  quantity:0
				  });
		  ctrl.stockonhand.push(productInventory.quantity);
		  console.log(ctrl.stockonhand);
	  }
  };

  
}

angular
  .module('admin.shared')
  .controller('FindProductModalController', FindProductModalController);
