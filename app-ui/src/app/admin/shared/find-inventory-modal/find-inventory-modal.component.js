var findInventoryModal = {
	bindings : {
		issuedinventorylist : '=',
		stockonhand : '=',
		button : '@',
		message : '@'
	},
	templateUrl : './find-inventory-modal.html',
	controller : 'FindInventoryModalController'
};

angular.module('admin.shared').component('findInventoryModal', findInventoryModal);