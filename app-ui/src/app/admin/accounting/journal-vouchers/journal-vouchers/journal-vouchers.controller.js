
function JournalVoucherController($state, JournalVouchersService, ReportsService, $rootScope) {
  var ctrl = this;
  
  ctrl.journalVouchers = [];

  ctrl.searchNumber = '';
  ctrl.searchRRNumber = '';
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  
  ctrl.$onInit = function () {
	  ctrl.addJournalRequest = false;
	  ctrl.error = null;
	  loadJournalVouchers();
  };
  
  ctrl.exportReport = function (){
	  var reportTitle = {title: 'Report : Journal Voucher Report'};
	  var dates = {dates: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  var headers = {
			    number: 'JV No'.replace(/,/g, ''), // remove commas to avoid errors
			    date: "Date",
			    payee: "Payee",
			    amount: "Amount",
			    status: "Status"
	  };
	  
	  JournalVouchersService.getByCompanyAndDates(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  console.log(response.data);
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print");
	  });
  };
  
  function loadJournalVouchers(){
	ctrl.company = $rootScope.selectedCompany;
	JournalVouchersService.listByCompany(ctrl.company.id).then((response) => {
      ctrl.journalVouchers = response.data;
      console.log("response journal voucher" + JSON.stringify(ctrl.journalVouchers));
    });
	  
  }

  ctrl.openModal = function(journalVoucher){
	  console.log("openModal");
    ctrl.jv = journalVoucher;
  };
  
  ctrl.approve = function(jvId){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  JournalVouchersService.approve(jvId, ctrl.user.id).then(function(response){
		  if(response.data){
			  alert("Approved");
			  loadJournalVouchers();
		  }
	  });
  };
  
  ctrl.goToEdit = function (id) {
	    $state.go('journal-voucher-edit', { 'journalVoucherId': id });
   }
/*
  ctrl.openModalApprovedItem = function(approvedItem) {
    console.log("openModalApprovedItem");
    ctrl.approvedItem = approvedItem;
  };*/
  
}

angular
  .module('admin.accounting')
  .controller('JournalVoucherController', JournalVoucherController);
