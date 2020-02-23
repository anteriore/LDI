function CreditMemosService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/credit-memos');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/credit-memos', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/credit-memos/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/credit-memos/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/credit-memos/delete/',id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/credit-memos/company/'+ companyId);
	};
	
	this.listByDepot = function(depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/credit-memos/depot/'+ depotId);
	};
	
	this.getCMDMSummaryReport = function ( depotId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/memo-slips/report/depot/' + depotId + '/start/' + startDate + '/end/' + endDate);
	};
	
}

/**
 * @ngdoc service
 * @name CreditMemosService
 * @module components.auth
 *
 */
angular.module('admin.accounting').service('CreditMemosService', CreditMemosService);
