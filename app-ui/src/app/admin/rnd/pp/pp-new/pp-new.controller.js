
function PpNewController($state, $rootScope, MoInventoryService, PpInventoryService, _) {
    var ctrl = this;

    ctrl.pp = { batchSize: 0};
    ctrl.pp.company = $rootScope.selectedCompany;
    ctrl.inventoryList = [];
    ctrl.pp.type = "";

    
    MoInventoryService.listByCompanyAndRemainingBatchSize(ctrl.pp.company.id).then(function(response){
    // MoInventoryService.listByCompanyAndNonlotNumber(ctrl.pp.company.id).then(function(response){
  		  console.log("MoInventoryService list response: " + JSON.stringify(response.data));
  		  ctrl.moList = response.data;
      });


      ctrl.selectMo = function() {
        ctrl.pp = ctrl.mo;
        ctrl.batchSize = ctrl.mo.remainingBatchSize;
      }

      ctrl.createPP = function() {
        
       

        ctrl.pp.remainingBatchSize -= ctrl.batchSize;
        ctrl.pp.batchSize = ctrl.pp.remainingBatchSize;

        if (ctrl.pp.remainingBatchSize == 0) {
          ctrl.pp.lotNumber = -1;
        }
       
        MoInventoryService.save(ctrl.pp).then(function(res) {
          ctrl.pp.id = null;
          ctrl.pp.remainingBatchSize = 0;
          ctrl.pp.batchSize = ctrl.batchSize;
          ctrl.pp.type = 'ALL';

          // remove moQReserved and move to moQuantity
          _.forEach(ctrl.pp.inventoryList, function(inv) {
            _.forEach(ctrl.pp.recipe.activeIngredientGroup.ingredients, function(ingredient) {
              if (ingredient.item.code === inv.item.code) {
                var recipeItemNeededQuantity = ingredient.quantity * ctrl.mo.batchSize;
                inv.moQuantity += recipeItemNeededQuantity;
                inv.moqReserved -= recipeItemNeededQuantity;
              } 
            });
          });
  

          MoInventoryService.saveWithLotNumber(ctrl.pp).then(function(res) {
            $state.go('mo');
          });
        });

       
      }

      
  }
  
  angular
    .module('admin.rnd')
    .controller('PpNewController', PpNewController);
  