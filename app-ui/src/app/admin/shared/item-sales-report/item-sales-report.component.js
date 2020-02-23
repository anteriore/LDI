var itemSalesReport = {
	templateUrl : './item-sales-report.html',
	controller : 'itemSalesReportController'
};

angular.module('admin.shared')
.component('itemSalesReport', itemSalesReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('item-sales-report', {
        url: '/admin/shared/item-sales-report/depot/:depotId/start/:startDate/end/:endDate/item/:itemId',
		component: 'itemSalesReport',
		params: {
			startDate: null,
			endDate: null,
			depotId: null,
			itemId: null
		}
	  });
	});
