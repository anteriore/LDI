var printRsReport = {
	templateUrl : './print-rs-report.html',
	controller : 'PrintRsReportController'
};

angular.module('admin.shared')
.component('printRsReport', printRsReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-rs-report', {
        url: '/admin/shared/print-rs-report/depot/:depotId/start/:startDate/end/:endDate',
		component: 'printRsReport',
		params: {
			depotId:null,
			startDate: null,
			endDate: null
		}
	  });
	});
