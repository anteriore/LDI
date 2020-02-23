function JobOrdersService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/job-orders');
	};

	this.save = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/job-orders', materialReevaluation);
	};

	this.update = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/job-orders/', materialReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/job-orders/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/job-orders/company/' + companyId);
	};
	
	this.listByStatus = function (status) {
		return $http.get(globalConfig.baseUrl + '/rest/job-orders/status/' + status);
	};

	this.listByMoInventory = function (moInventoryId) {
		return $http.get(globalConfig.baseUrl + '/rest/job-orders/moInventory/' + moInventoryId);
	}
}

/**
 * @ngdoc service
 * @name JobOrdersService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('JobOrdersService', JobOrdersService);
