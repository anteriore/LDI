
function ViewVpModalController($state, $rootScope) {
  var ctrl = this;
  
  ctrl.approveVp = function(vpId) {
	  ctrl.approve({
		  $event: {
			  vpId: vpId
		  }
	  });
  };
}

angular
  .module('admin.shared')
  .controller('ViewVpModalController', ViewVpModalController);
