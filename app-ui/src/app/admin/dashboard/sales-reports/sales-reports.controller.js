
function SalesReportsController($state, SalesOrdersService, UsersService, ProductCategoriesService, ProductsService, CategoryService, ProductDivisionCodesService, SalesReportsService, ReportsService, SalesRepsService, $rootScope) {
  var ctrl = this;
  
  
  ctrl.$onInit = function () {
	  ctrl.company = $rootScope.selectedCompany;

	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
	  SalesRepsService.list().then(function(response){
		 ctrl.salesReps = response.data;
		 console.log(ctrl.salesReps);
	  });
	  
	  ProductsService.list().then(function(response){
		  ctrl.items = response.data;
	  });
	  
	  ProductDivisionCodesService.list().then(function(response){
		  ctrl.divisions = response.data;
	  });
	  
	  ProductCategoriesService.list().then(function(response){
		 ctrl.categories = response.data;
	  });
  };
  /*
  ctrl.exportGeneralSalesReport = function() {
	  var reportTitle = {title: 'Report : General Sales Report'};
	  var dates = {date: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  var headers = {
			    title: 'Account Title'.replace(/,/g, ''), // remove commas to avoid errors
			    credit: "Credit",
			    debit: "Debit"
	  };
	  SalesReportssService.getJVSalesReports(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print.csv");
	  });
  }
  
  */
  ctrl.generateGeneralSalesReport = function () {
	  SalesOrdersService.getTotalAmountAndQuantity(ctrl.userAssignedDepot.id, ctrl.startDate, ctrl.endDate, ctrl.salesRep.id).then(function(response){
		 if(response){
			 ctrl.gsrAmount = response.data.gsrAmount;
			 ctrl.gsrQuantity = response.data.gsrQuantity;
		 } 
	  });
  };
  
  
  ctrl.generateItemSalesReport = function () {
		  SalesReportsService.itemSalesReport(ctrl.userAssignedDepot.id, ctrl.startDate, ctrl.endDate, ctrl.item.id).then(function(response){
			 if(response){
				 ctrl.itemAmount = response.data.itemAmount;
				 ctrl.itemQuantity = response.data.itemQuantity;
			 } 
		  });
  };
  
  ctrl.generateItemSalesReportByCategory = function () {
		  SalesReportsService.itemSalesReportByCategory(ctrl.userAssignedDepot.id, ctrl.startDate, ctrl.endDate, ctrl.division.id, ctrl.category.id).then(function(response){
				 if(response){
					 ctrl.itemAmount2 = response.data.itemAmount;
					 ctrl.itemQuantity2 = response.data.itemQuantity;
				 } 
		  });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('SalesReportsController', SalesReportsController);
