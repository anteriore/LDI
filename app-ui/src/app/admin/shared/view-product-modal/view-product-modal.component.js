var viewProductModal = {
	bindings : {
		product : '='
	},
	templateUrl : './view-product-modal.html',
	controller : 'ViewProductModalController'
};

angular.module('admin.shared').component('viewProductModal', viewProductModal);