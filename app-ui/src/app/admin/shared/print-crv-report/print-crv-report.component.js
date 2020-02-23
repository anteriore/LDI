var printCrvReport = {
	templateUrl : './print-crv-report.html',
	controller : 'PrintCrvReportController'
};

angular.module('admin.shared')
.component('printCrvReport', printCrvReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-crv-report', {
        url: '/admin/shared/print-crv-report/start/:startDate/end/:endDate',
		component: 'printCrvReport',
		params: {
			startDate: null,
			endDate: null
		}
	  });
	});
