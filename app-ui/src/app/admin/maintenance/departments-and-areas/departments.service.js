function DepartmentsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/departments');
	};

	this.save = function(department) {
		return $http.post(globalConfig.baseUrl + '/rest/departments', department);
	};

	this.update = function(department) {
		return $http.post(globalConfig.baseUrl + '/rest/departments/', department);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/departments/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/departments/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/departments/delete/', id);
	};
	
	this.getByName = function(departmentName){
		return $http.get(globalConfig.baseUrl + '/rest/departments/name/' + departmentName);
	};
}

/**
 * @ngdoc service
 * @name DepartmentsService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('DepartmentsService', DepartmentsService);
