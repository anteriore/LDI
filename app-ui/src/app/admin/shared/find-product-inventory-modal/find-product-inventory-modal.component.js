var findProductInventoryModal = {
	bindings : {
		inventorylist: '=',
		issuedinventorylist : '=',
		stockonhand : '=',
		button : '@',
		message : '@'
	},
	templateUrl : './find-product-inventory-modal.html',
	controller : 'FindProductInventoryModalController'
};

angular.module('admin.shared').component('findProductInventoryModal', findProductInventoryModal);