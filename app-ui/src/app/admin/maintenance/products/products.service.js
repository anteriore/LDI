function ProductsService($http, globalConfig) {

  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/products');
  };

  this.save = function (product) {
    return $http.post(globalConfig.baseUrl + '/rest/products', product);
  };

  this.update = function (product) {
    return $http.post(globalConfig.baseUrl + '/rest/products/', product);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/products/' + id);
  };

  this.listByCompany = function(id) {
	return $http.get(globalConfig.baseUrl + '/rest/products/company/' + id);  
  };

}

/**
 * @ngdoc service
 * @name ProductsService
 * @module components.auth
 *
 */
angular
  .module('admin.maintenance')
  .service('ProductsService', ProductsService);
