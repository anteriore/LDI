
function AccountSummaryReportController($state, AccountSummaryReportsService, ReportsService, $rootScope) {
  var ctrl = this;
  
  
  ctrl.$onInit = function () {
	  ctrl.company = $rootScope.selectedCompany;

  };
  
  ctrl.exportJV = function() {
	  var reportTitle = {title: 'Report : JV Account Summary Report'};
	  var dates = {date: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  var headers = {
			    title: 'Account Title'.replace(/,/g, ''), // remove commas to avoid errors
			    credit: "Credit",
			    debit: "Debit"
	  };
	  AccountSummaryReportsService.getJVAccountSummaryReport(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print.csv");
	  });
  }
  
  ctrl.exportPJV = function() {
	  var reportTitle = {title: 'Report : PJV Account Summary Report'};
	  var dates = {date: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  
	  var headers = {
			    title: 'Account Title'.replace(/,/g, ''), // remove commas to avoid errors
			    credit: "Credit",
			    debit: "Debit"
	  };
	  AccountSummaryReportsService.getPJVAccountSummaryReport(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  console.log(response.data);
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print");
	  });
  }
  
  ctrl.printCDV = function() {
	  var headers = {
			    title: 'Account Title'.replace(/,/g, ''), // remove commas to avoid errors
			    credit: "Credit",
			    debit: "Debit"
	  };
	  AccountSummaryReportsService.getCDVAccountSummaryReport(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  //exportCSVFile(headers, response.data, "print.csv");
	  });
  }
  
  ctrl.exportVP = function () {
	  var reportTitle = {title: 'Report : VP Account Summary Report'};
	  var dates = {date: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  
	  var headers = {
			    title: 'Account Title'.replace(/,/g, ''), // remove commas to avoid errors
			    credit: "Credit",
			    debit: "Debit"
	  };
	  AccountSummaryReportsService.getVPAccountSummaryReport(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  console.log(response.data);
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print");
	  });
  }
  
}

angular
  .module('admin.dashboard')
  .controller('AccountSummaryReportController', AccountSummaryReportController);
