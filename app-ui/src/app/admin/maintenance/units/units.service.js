function UnitsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/units');
	};

	this.save = function(unit) {
		return $http.post(globalConfig.baseUrl + '/rest/units', unit);
	};

	this.update = function(unit) {
		return $http.post(globalConfig.baseUrl + '/rest/units/', unit);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/units/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/units/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name UnitsService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('UnitsService', UnitsService);
