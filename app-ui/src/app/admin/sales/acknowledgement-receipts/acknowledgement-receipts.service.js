function AcknowledgementReceiptsService($http, globalConfig) {
  this.list = function() {
    return $http.get(globalConfig.baseUrl + '/rest/acknowledgement-receipts');
  };

  this.save = function(acknowledgementReceipt) {
    return $http.post(
      globalConfig.baseUrl + '/rest/acknowledgement-receipts',
      acknowledgementReceipt
    );
  };

  this.update = function(acknowledgementReceipt) {
    return $http.post(
      globalConfig.baseUrl + '/rest/acknowledgement-receipts/',
      acknowledgementReceipt
    );
  };

  this.get = function(id) {
    return $http.get(
      globalConfig.baseUrl + '/rest/acknowledgement-receipts/' + id
    );
  };

  this.listByCompany = function(id) {
    return $http.get(
      globalConfig.baseUrl + '/rest/acknowledgement-receipts/company/' + id
    );
  };

  this.listByDepot = function(id) {
    return $http.get(
      globalConfig.baseUrl + '/rest/acknowledgement-receipts/depot/' + id
    );
  };

  this.listByDepotWithSIAmount = function(id) {
    return $http.get(
      globalConfig.baseUrl +
        '/rest/acknowledgement-receipts/depot/' +
        id +
        '/with-si'
    );
  };
}

/**
 * @ngdoc service
 * @name AcknowledgementReceiptsService
 * @module components.auth
 *
 */
angular
  .module('admin.sales')
  .service('AcknowledgementReceiptsService', AcknowledgementReceiptsService);
