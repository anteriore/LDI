var findFgInventoryModal = {
	bindings : {
		fglist : '=',
		fglistview : '=',
		message : '@'
	},
	templateUrl : './find-fg-inventory-modal.html',
	controller : 'FindFgInventoryModalController'
};

angular.module('admin.shared').component('findFgInventoryModal', findFgInventoryModal);