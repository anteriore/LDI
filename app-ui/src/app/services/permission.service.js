function PermissionsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/permissions');
	};

	this.save = function(permission) {
		return $http.post(globalConfig.baseUrl + '/rest/permissions', permission);
	};

	this.update = function(permission) {
		return $http.post(globalConfig.baseUrl + '/rest/permissions/', permission);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/permissions/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/permissions/delete/', id);
	};
}

/**
 * @ngdoc service
 * @name PermissionsService
 * @module services
 *
 */
angular.module('services').service('PermissionsService', PermissionsService);
