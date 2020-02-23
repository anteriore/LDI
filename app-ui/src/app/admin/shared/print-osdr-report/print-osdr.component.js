var printOsdrReport = {
	templateUrl : './print-osdr-report.html',
	controller : 'PrintOsdrReportController'
};

angular.module('admin.shared')
.component('printOsdrReport', printOsdrReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-osdr-report', {
        url: '/admin/shared/print-osdr-report/depot/:depotId/start/:startDate/end/:endDate',
		component: 'printOsdrReport',
		params: {
			depotId:null,
			startDate: null,
			endDate: null
		}
	  });
	});
