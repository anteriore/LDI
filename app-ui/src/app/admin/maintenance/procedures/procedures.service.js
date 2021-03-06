function ProceduresService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/procedures');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/procedures', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/procedures/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/procedures/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/procedures/delete/',id);
	};
	
	this.listByArea = function(id){
		return $http.get(globalConfig.baseUrl + '/rest/procedures/area/' + id);
	};
}

/**
 * @ngdoc service
 * @name ProceduresService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ProceduresService', ProceduresService);
