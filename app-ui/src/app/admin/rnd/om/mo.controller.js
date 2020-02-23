
function MoController(MoInventoryService, $state, _) {
    var ctrl = this;

    MoInventoryService.list().then(function(res) {
      ctrl.moList = res.data;
    });

    ctrl.manufactureOrder = function(mo) {
      $state.go('mo-manufacture', {id: mo.id});
    }

    ctrl.view = function(moId) {
      $state.go('mo-manufacture', {id: moId});
    }
   
  }
  
  angular
    .module('admin.rnd')
    .controller('MoController', MoController);
  