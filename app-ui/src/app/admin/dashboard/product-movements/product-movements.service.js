function ProductMovementsService($http, globalConfig) {

  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/product-movements');
  };

  this.save = function (productMovement) {
    return $http.post(globalConfig.baseUrl + '/rest/product-movements', productMovement);
  };

  this.update = function (productMovement) {
    return $http.post(globalConfig.baseUrl + '/rest/product-movements/', productMovement);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/product-movements/' + id);
  };

  this.listByCompany = function(id) {
	return $http.get(globalConfig.baseUrl + '/rest/product-movements/company/' + id);  
  };

}

/**
 * @ngdoc service
 * @name ProductMovementsService
 * @module components.auth
 *
 */
angular
  .module('admin.dashboard')
  .service('ProductMovementsService', ProductMovementsService);
