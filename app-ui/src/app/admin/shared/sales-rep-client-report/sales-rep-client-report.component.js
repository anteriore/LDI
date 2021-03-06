var salesRepClientReport = {
	templateUrl : './sales-rep-client-report.html',
	controller : 'SalesRepClientReportController'
};

angular.module('admin.shared')
.component('salesRepClientReport', salesRepClientReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('sales-rep-client-report', {
        url: '/admin/shared/sales-rep-client-report/sales-rep/:salesRepId',
		component: 'salesRepClientReport',
		params: {
			salesRepId:null
		}
	  });
	});
