function SalesSlipsService($http, globalConfig) {
	
	this.listByDepotAndClientAndStatus = function(depotId, clientId, status){
		return $http.get(globalConfig.baseUrl + '/rest/sales-slips/depot/' + depotId + '/client/' +clientId + '/status/' + status);
	};
	
	this.listByDepotAndStatus = function(depotId, status){
		return $http.get(globalConfig.baseUrl + '/rest/sales-slips/depot/' + depotId  + '/status/' + status);
	};
	this.listByDepot = function(depotId){
		return $http.get(globalConfig.baseUrl + '/rest/sales-slips/depot/' + depotId);
	};
	
	this.getByDepotAndDates = function(depotId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/sales-slips/depot/' + depotId + '/start/' + startDate + '/end/' +endDate);
	};
}

/**
 * @ngdoc service
 * @name SalesSlipsService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('SalesSlipsService', SalesSlipsService);
