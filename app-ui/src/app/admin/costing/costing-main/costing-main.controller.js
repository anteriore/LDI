function CostingMainController(CostingService, $rootScope, $state) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.company = $rootScope.selectedCompany;
   
  };

}

angular
  .module('admin.dashboard')
  .controller('CostingMainController', CostingMainController);