var viewOsModal = {
	bindings : {
		os : '=',
	},
	templateUrl : './view-os-modal.html',
	controller : 'ViewOsModalController'
};

angular.module('admin.shared').component('viewOsModal', viewOsModal);