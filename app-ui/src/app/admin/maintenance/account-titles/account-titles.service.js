function AccountTitlesService($http, globalConfig) {

  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/account-titles');
  };

  this.save = function (acknowledgementReceipt) {
    return $http.post(globalConfig.baseUrl + '/rest/account-titles', acknowledgementReceipt);
  };

  this.update = function (acknowledgementReceipt) {
    return $http.post(globalConfig.baseUrl + '/rest/account-titles/', acknowledgementReceipt);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/account-titles/' + id);
  };
  
  this.delete = function(id) {
	return $http.post(globalConfig.baseUrl + '/rest/account-titles/delete', id);
  };
  
  this.listByLevelAndParentId = function(level, parentId){
	return $http.get(globalConfig.baseUrl + '/rest/account-titles/level/' + level + '/parent/' + parentId);
  }

  this.findByTitle = function(title){
    return $http.get(globalConfig.baseUrl + '/rest/account-titles/title/' + title);
  }

}

/**
 * @ngdoc service
 * @name AccountTitlesService
 * @module components.auth
 *
 */
angular
  .module('admin.maintenance')
  .service('AccountTitlesService', AccountTitlesService);
