function PdcDisbursementsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/pdc-disbursements');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/pdc-disbursements', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/pdc-disbursements/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/pdc-disbursements/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/pdc-disbursements/delete/',id);
	};
	
	this.listByStatus = function (status){
		return $http.get(globalConfig.baseUrl + '/rest/pdc-disbursements/status/' + status);
	}
	
	this.getByCompanyAndDates = function (companyId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/pdc-disbursements/company/' + companyId + '/start/' + startDate + '/end/' +endDate);
	};
}

/**
 * @ngdoc service
 * @name PdcDisbursementsService
 * @module components.auth
 *
 */
angular.module('admin.accounting').service('PdcDisbursementsService', PdcDisbursementsService);
