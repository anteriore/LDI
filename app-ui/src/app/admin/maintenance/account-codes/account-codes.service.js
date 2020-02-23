function AccountCodesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/account-codes');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/account-codes', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/account-codes/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/account-codes/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/account-codes/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name AccountCodesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('AccountCodesService', AccountCodesService);
