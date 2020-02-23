function StockCardsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/stock-cards');
	};

	this.save = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/stock-cards', materialReevaluation);
	};

	this.update = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/stock-cards/', materialReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/stock-cards/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/stock-cards/company/' + companyId);
	};
	
	this.listByControlNumberAndCompany = function(controlNumber,companyId){
		return $http.get(globalConfig.baseUrl + '/rest/stock-cards/company/'+companyId+'/control-number/' + controlNumber);
	};
	
	this.listByItemAndCompany = function(itemId, companyId){
		return $http.get(globalConfig.baseUrl + '/rest/stock-cards/company/' + companyId + '/item/'+ itemId);
	};
}

/**
 * @ngdoc service
 * @name StockCardsService
 * @module components.auth
 *
 */
angular.module('admin.shared').service('StockCardsService', StockCardsService);
