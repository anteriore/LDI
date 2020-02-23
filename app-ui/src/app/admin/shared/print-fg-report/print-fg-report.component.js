var printFgReport = {
	templateUrl : './print-fg-report.html',
	controller : 'PrintFgReportController'
};

angular.module('admin.shared')
.component('printFgReport', printFgReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-fg-report', {
        url: '/admin/shared/print-fg-report/:depotId',
		component: 'printFgReport',
		params: {
			depotId: null
		}
	  });
	});
