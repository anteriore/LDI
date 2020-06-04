function FinishedGoodsService($http, globalConfig) {
  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/finished-goods');
  };

  this.paginate = function (itemsPerPage, offset) {
    return $http.get(
      globalConfig.baseUrl +
        '/rest/finished-goods/paginate/' +
        itemsPerPage +
        '/' +
        offset
    );
  };

  this.save = function (client) {
    return $http.post(globalConfig.baseUrl + '/rest/finished-goods', client);
  };

  this.update = function (client) {
    return $http.post(globalConfig.baseUrl + '/rest/finished-goods/', client);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/finished-goods/' + id);
  };

  this.delete = function (id) {
    return $http.post(
      globalConfig.baseUrl + '/rest/finished-goods/delete/',
      id
    );
  };
}

/**
 * @ngdoc service
 * @name FinishedGoodsService
 * @module components.auth
 *
 */
angular
  .module('admin.maintenance')
  .service('FinishedGoodsService', FinishedGoodsService);
