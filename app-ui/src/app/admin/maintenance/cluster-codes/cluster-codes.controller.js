
function ClusterCodeController($state, ClusterCodesService, _) {
  var ctrl = this;
  ctrl.clusterCodes = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.clusterCode = {};
  
  ctrl.$onInit = function () {
	  ctrl.addClusterCode = false;
	  ctrl.error = null;
	  loadClusterCodes();
  };
  
  function loadClusterCodes(){
	  ClusterCodesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.clusterCodes = response.data;
	  });
  }
  
  ctrl.showAddClusterCode = function (show){
	  ctrl.addClusterCode = show;
  };
  
  ctrl.editClusterCode = function (id) {
	  ClusterCodesService.get(id).then(function(response){
		  ctrl.clusterCode = response.data;
	  });
	  ctrl.addClusterCode = true;
  };
  
  ctrl.saveClusterCode = function () {
	    ClusterCodesService.save(ctrl.clusterCode).then(function () {
	    	  loadClusterCodes();
	    	  ctrl.showAddClusterCode(false);
	    	  ctrl.clusterCode = null;
	    });
  };
  
  ctrl.deleteClusterCode = function (id){
	  ClusterCodesService.delete(id).then(function(response){
		  loadClusterCodes();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ClusterCodeController', ClusterCodeController);
