function ClusterCodesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/cluster-codes');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/cluster-codes', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/cluster-codes/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/cluster-codes/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/cluster-codes/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name ClusterCodesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ClusterCodesService', ClusterCodesService);
