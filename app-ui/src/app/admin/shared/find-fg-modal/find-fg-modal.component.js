var findFgModal = {
	bindings : {
		fg : '=',
		message : '@'
	},
	templateUrl : './find-fg-modal.html',
	controller : 'FindFgModalController'
};

angular.module('admin.shared').component('findFgModal', findFgModal);