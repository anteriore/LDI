
function PdcDisbursementController($state, PdcDisbursementsService, ReportsService, $rootScope) {
  var ctrl = this;
  
  ctrl.pdcDisbursements = [];

  ctrl.searchNumber = '';
  ctrl.searchRRNumber = '';
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  ctrl.readonly = true;
  
  ctrl.$onInit = function () {
	  ctrl.addPurchaseRequest = false;
	  ctrl.error = null;
	  loadPdcDisbursements();
  };
  
  
  ctrl.exportReport = function (){
	  var reportTitle = {title: 'Report : PDC Report'};
	  var dates = {dates: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  var headers = {
			    number: 'Payee'.replace(/,/g, ''), // remove commas to avoid errors
			    date: "Cheque Details",
			    payee: "Chk Date",
			    amount: "Amount",
			    status: "Status",
	  };
	  
	  PdcDisbursementsService.getByCompanyAndDates(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  console.log(response.data);
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print");
	  });
  };
  
  
  function loadPdcDisbursements(){
	ctrl.company = $rootScope.selectedCompany;
	PdcDisbursementsService.list().then((response) => {
      ctrl.pdcDisbursements = response.data;
      console.log("response purchase voucher" + JSON.stringify(ctrl.pdcDisbursements));
    });
	
	  
  }

  ctrl.openModal = function(pdcDisbursement){
	  console.log("openModal");
    ctrl.pdc = pdcDisbursement;
  };
  
  
  ctrl.print = function(){
	  window.print();
  };
  
/*
  ctrl.openModalApprovedItem = function(approvedItem) {
    console.log("openModalApprovedItem");
    ctrl.approvedItem = approvedItem;
  };*/
  
}

angular
  .module('admin.accounting')
  .controller('PdcDisbursementController', PdcDisbursementController);
