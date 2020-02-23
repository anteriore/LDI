var findItemModal = {
	bindings : {
		itemlist: '=',
		button : '@',
		message : '@',
		onSubmit: '&'
	},
	templateUrl : './find-item-modal.html',
	controller : 'FindItemModalController'
};

angular.module('admin.shared').component('findItemModal', findItemModal);