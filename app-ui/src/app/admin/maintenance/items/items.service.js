function ItemsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/items');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/items', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/items/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/items/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/items/delete/',id);
	};
	
	this.listRmPm = function(){
		return $http.get(globalConfig.baseUrl + '/rest/items/rm-pm');
	};
	
	this.listEngineering = function(){
		return $http.get(globalConfig.baseUrl + '/rest/items/type/ENG');
	};
	
	this.listEngineering = function(){
		return $http.get(globalConfig.baseUrl + '/rest/items/type/ENG');
	};
}

/**
 * @ngdoc service
 * @name ItemsService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ItemsService', ItemsService);
