var printPrf = {
	templateUrl : './print-prf.html',
	controller : 'PrintPrfController'
};

angular.module('admin.shared')
.component('printPrf', printPrf)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-prf', {
        url: '/admin/shared/print-prf/:prfId',
		component: 'printPrf',
		params: {
			prfId: null
		}
	  });
	});
