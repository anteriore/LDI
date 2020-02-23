
function CashReceiptVouchersService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/cash-receipt-vouchers');
	};

	this.save = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/cash-receipt-vouchers', receivingReceipt);
	};

	this.update = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/cash-receipt-vouchers/', receivingReceipt);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/cash-receipt-vouchers/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/cash-receipt-vouchers/company/' + companyId);
	};
	
	this.getByCompanyAndDates = function (companyId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/cash-receipt-vouchers/company/' + companyId + '/start/' + startDate + '/end/' +endDate);
	};
	
}

/**
 * @ngdoc service
 * @name CashReceiptVouchersService
 * @module components.auth
 *
 */

angular.module('admin.accounting').service('CashReceiptVouchersService', CashReceiptVouchersService);
