function SalesRepsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/sales-reps');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/sales-reps', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/sales-reps/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-reps/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/sales-reps/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name SalesRepsService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('SalesRepsService', SalesRepsService);
