
function FindSoModalController($state, ReceivingReceiptsService, SalesOrdersService, $rootScope) {
  var ctrl = this;
  ctrl.salesOrders = [];
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  
  ctrl.getSalesOrder = function(so){
	ctrl.so = so;  
  };
}

angular
  .module('admin.shared')
  .controller('FindSoModalController', FindSoModalController);
