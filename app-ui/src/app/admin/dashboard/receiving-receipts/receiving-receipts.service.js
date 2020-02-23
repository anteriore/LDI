function ReceivingReceiptsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/receiving-receipts');
	};

	this.listReceivedItem = function() {
		return $http.get(globalConfig.baseUrl + '/api/receivedItems');
	};

	this.save = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/receiving-receipts', receivingReceipt);
	};

	this.update = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/receiving-receipts/', receivingReceipt);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/receiving-receipts/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/receiving-receipts/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/receiving-receipts/delete/',id);
	};
	
	this.listByCompanyForPo = function(companyId, purchaseOrderId){
		return $http.get(globalConfig.baseUrl + '/rest/receiving-receipts/company/'+companyId+'/po/' + purchaseOrderId);
	};
	
	this.listByCompanyByStatus = function (companyId, status){
		return $http.get(globalConfig.baseUrl + '/rest/receiving-receipts/company/' + companyId + "/status/"+ status);
	};
	
	this.getQuarantinedQuantityOfItem = function (itemId, companyId){
		return $http.get(globalConfig.baseUrl + '/rest/receiving-receipts/company/' + companyId + '/stock/' + itemId);
	};
	
	this.listReceivedItemByStatus = function(status) {
		return $http.get(globalConfig.baseUrl + '/api/receivedItems/status/' + status);
	};
	
	this.listRrWithoutPurchaseVoucher = function(companyId){
		return $http.get(globalConfig.baseUrl + '/rest/receiving-receipts/company/' + companyId + '/no-purchase-voucher');
	};
	
}

/**
 * @ngdoc service
 * @name ReceivingReceiptsService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('ReceivingReceiptsService', ReceivingReceiptsService);
