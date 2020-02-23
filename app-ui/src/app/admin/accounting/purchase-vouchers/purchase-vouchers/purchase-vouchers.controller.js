
function PurchaseVoucherController($state, ReportsService, PurchaseVouchersService, $rootScope) {
  var ctrl = this;
  
  ctrl.purchaseVouchers = [];

  ctrl.searchNumber = '';
  ctrl.searchRRNumber = '';
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  
  ctrl.$onInit = function () {
	  ctrl.addPurchaseRequest = false;
	  ctrl.error = null;
	  loadPurchaseVouchers();
  };
  
  ctrl.exportReport = function (){
	  var reportTitle = {title: 'Report : Purchase Journal Voucher Report'};
	  var dates = {dates: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  var headers = {
			    number: 'PJV No'.replace(/,/g, ''), // remove commas to avoid errors
			    date: "Date",
			    payee: "Payee",
			    amount: "Amount",
			    status: "Status"
	  };
	  
	  PurchaseVouchersService.getByCompanyAndDates(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  console.log(response.data);
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print");
	  });
  };
  
  
  function loadPurchaseVouchers(){
	ctrl.company = $rootScope.selectedCompany;
	PurchaseVouchersService.listByCompany(ctrl.company.id).then((response) => {
      ctrl.purchaseVouchers = response.data;
      console.log("response purchase voucher" + JSON.stringify(ctrl.purchaseVouchers));
    });
	
	  
  }

  ctrl.openModal = function(purchaseVoucher){
	  console.log("openModal");
    ctrl.pv = purchaseVoucher;
  };
  
  ctrl.approve = function(pvId){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  PurchaseVouchersService.approve(pvId, ctrl.user.id).then(function(response){
		  if(response.data){
			  alert("Approved");
			  loadPurchaseVouchers();
		  }
	  });
  };
  
  ctrl.print = function(){
	  window.print();
  };
  
  ctrl.goToEdit = function (id) {
	    $state.go('purchase-voucher-edit', { 'purchaseVoucherId': id });
   }
/*
  ctrl.openModalApprovedItem = function(approvedItem) {
    console.log("openModalApprovedItem");
    ctrl.approvedItem = approvedItem;
  };*/
  
}

angular
  .module('admin.accounting')
  .controller('PurchaseVoucherController', PurchaseVoucherController);
