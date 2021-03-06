function ReturnSlipsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/return-slips');
	};

	this.save = function(purchaseRequest) {
		return $http.post(globalConfig.baseUrl + '/rest/return-slips', purchaseRequest);
	};

	this.update = function(purchaseRequest) {
		return $http.post(globalConfig.baseUrl + '/rest/return-slips/', purchaseRequest);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/return-slips/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/return-slips/company/' + companyId);
	};
	
	this.listByDepot = function(depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/return-slips/depot/' + depotId);
	};
	
	this.getByDepotAndDates = function(depotId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/return-slips/depot/' + depotId + '/start/' + startDate + '/end/' +endDate);
	};
	
}

/**
 * @ngdoc service
 * @name ReturnSlipsService
 * @module components.auth
 * 
 */
angular.module('admin.sales').service('ReturnSlipsService', ReturnSlipsService);