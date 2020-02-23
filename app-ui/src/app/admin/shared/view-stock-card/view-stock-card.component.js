var viewStockCardModal = {
	bindings : {
		item: '=',
		stockcards: '='
	},
	templateUrl : './view-stock-card.html',
	controller : 'ViewStockCardModalController'
};

angular.module('admin.shared').component('viewStockCardModal', viewStockCardModal);