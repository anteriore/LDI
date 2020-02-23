function AreasService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/areas');
	};

	this.save = function(department) {
		return $http.post(globalConfig.baseUrl + '/rest/areas', department);
	};

	this.update = function(department) {
		return $http.post(globalConfig.baseUrl + '/rest/areas/', department);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/areas/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/areas/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/areas/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name AreasService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('AreasService', AreasService);
