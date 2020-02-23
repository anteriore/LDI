function CostingsController(CostingService, $rootScope, $state) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.company = $rootScope.selectedCompany;
    CostingService.list().then(function(res) {
      ctrl.costings = res.data;
    });
  };
  
  ctrl.view = function(id) {
    $state.go('costing-view', {id: id});
  }

}

angular
  .module('admin.dashboard')
  .controller('CostingsController', CostingsController);