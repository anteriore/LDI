function ApprovedItemsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/approved-items');
	};

	this.save = function(approvedItem) {
		return $http.post(globalConfig.baseUrl + '/rest/approved-items', approvedItem);
	};

	this.update = function(approvedItem) {
		return $http.post(globalConfig.baseUrl + '/rest/approved-items/', approvedItem);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/approved-items/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/approved-items/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/approved-items/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name ApprovedItemsService
 * @module components.auth
 *
 */
angular.module('admin.shared').service('ApprovedItemsService', ApprovedItemsService);
