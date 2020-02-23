
function PurchaseVouchersService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-vouchers');
	};

	this.save = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/purchase-vouchers', receivingReceipt);
	};

	this.update = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/purchase-vouchers/', receivingReceipt);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-vouchers/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-vouchers/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/purchase-vouchers/delete/',id);
	};
	
	
	this.isRrNumberValid = function(companyId, rrNumber){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-vouchers/company/' + companyId + '/rr-number/' + rrNumber);
	};
	
	this.approve = function(pvId, userId){
		return $http.post(globalConfig.baseUrl + '/rest/purchase-vouchers/approve/' + pvId + '/user/' + userId);
	};
	
	this.getIdByNumberAndCompany = function (companyId, number){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-vouchers/company/' + companyId + '/number/' + number)
	};
	
	this.getPvWithoutAdjustmentsByCompanyAndVendorAndStatus = function(companyId, vendorId, status){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-vouchers/company/'+companyId+'/vendor/'+vendorId+'/status/'+status+'/purchase-vouchers-no-adjustment');
	};
	
	this.getByCompanyAndDates = function (companyId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-vouchers/company/' + companyId + '/start/' + startDate + '/end/' +endDate);
	};
}

/**
 * @ngdoc service
 * @name PurchaseVouchersService
 * @module components.auth
 *
 */

angular.module('admin.accounting').service('PurchaseVouchersService', PurchaseVouchersService);
