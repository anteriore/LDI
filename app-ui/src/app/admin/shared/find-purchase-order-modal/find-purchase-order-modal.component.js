var findPurchaseOrderModal = {
	bindings : {
		po : '=',
		receiveditems: '=',
		receiveditemsview: '=',
		button : '@',
		message : '@'
	},
	templateUrl : './find-purchase-order-modal.html',
	controller : 'FindPurchaseOrderModalController'
};

angular.module('admin.shared').component('findPurchaseOrderModal', findPurchaseOrderModal);