function BankAccountsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/bank-accounts');
	};

	this.paginate = function(itemsPerPage, offset) {
		return $http.get(globalConfig.baseUrl + '/rest/bank-accounts/paginate/' + itemsPerPage + '/' + offset);
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/bank-accounts', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/bank-accounts/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/bank-accounts/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/bank-accounts/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name BankAccountsService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('BankAccountsService', BankAccountsService);
