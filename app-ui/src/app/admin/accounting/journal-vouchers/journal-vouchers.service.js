
function JournalVouchersService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/journal-vouchers');
	};

	this.save = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/journal-vouchers', receivingReceipt);
	};

	this.update = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/journal-vouchers/', receivingReceipt);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/journal-vouchers/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/journal-vouchers/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/journal-vouchers/delete/',id);
	};
	
	this.approve = function(jvId, userId){
		return $http.post(globalConfig.baseUrl + '/rest/journal-vouchers/approve/' + jvId + '/user/' + userId);
	};
	
	this.listAdjustmentsOfVoucherByCompany = function(voucherId, companyId){
		return $http.get(globalConfig.baseUrl + '/rest/journal-vouchers/company/' + companyId + '/voucher/' + voucherId + '/adjustments');
	};
	
	this.getJvWithoutAdjustmentsByCompanyAndVendorAndStatus = function (companyId, vendorId, status){
		return $http.get(globalConfig.baseUrl + '/rest/journal-vouchers/company/'+companyId+'/vendor/'+vendorId+'/status/'+status+'/journal-vouchers-no-adjustment');
	};
	
	this.getByCompanyAndDates = function (companyId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/journal-vouchers/company/' + companyId + '/start/' + startDate + '/end/' +endDate);
	};
	
	this.getJournalReport= function (companyId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/journal-vouchers/journal-report/company/' + companyId + '/start/' + startDate + '/end/' +endDate);
	};
	
}

/**
 * @ngdoc service
 * @name JournalVouchersService
 * @module components.auth
 *
 */

angular.module('admin.accounting').service('JournalVouchersService', JournalVouchersService);
