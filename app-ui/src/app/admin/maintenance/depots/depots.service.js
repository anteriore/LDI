function DepotsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/depots');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/depots', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/depots/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/depots/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/depots/delete/',id);
	};
	
	this.listDepotsOfUser = function(userId){
		return $http.get(globalConfig.baseUrl + '/rest/depots/user/' + userId);
	};
}

/**
 * @ngdoc service
 * @name DepotsService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('DepotsService', DepotsService);
