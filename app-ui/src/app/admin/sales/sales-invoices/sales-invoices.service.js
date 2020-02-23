function SalesInvoicesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/sales-invoices');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/sales-invoices', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/sales-invoices/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-invoices/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/sales-invoices/delete/',id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-invoices/company/'+ companyId);
	};
	
	this.listByDepot = function(depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-invoices/depot/'+ depotId);
	};

	this.listByDateFromAndDateToAndDepot = function(depotId, dateFrom, dateTo){
		return $http.get(globalConfig.baseUrl + '/rest/sales-invoices/depot/' + depotId + '/dateFrom/' + dateFrom +'/dateTo/' + dateTo);
	};
}

/**
 * @ngdoc service
 * @name SalesInvoicesService
 * @module components.auth
 *
 */
angular.module('admin.sales').service('SalesInvoicesService', SalesInvoicesService);
