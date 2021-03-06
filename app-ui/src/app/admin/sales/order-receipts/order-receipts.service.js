function OrderReceiptsService($http, globalConfig) {

  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/order-receipts');
  };

  this.save = function (orderReceipt) {
    return $http.post(globalConfig.baseUrl + '/rest/order-receipts', orderReceipt);
  };

  this.update = function (orderReceipt) {
    return $http.post(globalConfig.baseUrl + '/rest/order-receipts/', orderReceipt);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/order-receipts/' + id);
  };
  
  this.listByDepot = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/order-receipts/depot/' + id);  
	  };

}

/**
* @ngdoc service
* @name OrderReceiptsService
* @module components.auth
*
*/
angular
.module('admin.sales')
.service('OrderReceiptsService', OrderReceiptsService);
