function ProductReceivingsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/product-receivings');
	};

	this.save = function(productReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/product-receivings', productReevaluation);
	};

	this.update = function(productReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/product-receivings/', productReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/product-receivings/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/product-receivings/company/' + companyId);
	};
	
	this.listByStatus = function (status) {
		return $http.get(globalConfig.baseUrl + '/rest/product-receivings/status/' + status);
	};
}

/**
 * @ngdoc service
 * @name ProductReceivingsService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('ProductReceivingsService', ProductReceivingsService);
