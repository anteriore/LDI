function MaterialReceivingsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/material-receivings');
	};

	this.save = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/material-receivings', materialReevaluation);
	};

	this.update = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/material-receivings/', materialReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/material-receivings/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/material-receivings/company/' + companyId);
	};
}

/**
 * @ngdoc service
 * @name MaterialReceivingsService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('MaterialReceivingsService', MaterialReceivingsService);
