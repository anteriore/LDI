var findMaterialIssuanceModal = {
	bindings : {
		mis : '=',
		message : '@'
	},
	templateUrl : './find-mis-modal.html',
	controller : 'FindMaterialIssuanceModalController'
};

angular.module('admin.shared').component('findMaterialIssuanceModal', findMaterialIssuanceModal);