
function MoManufactureController($state, RecipesService, FinishedGoodsService, InventoryService, $rootScope, MoInventoryService, _, $stateParams) {
    var ctrl = this;

    MoInventoryService.get($stateParams.id).then(function(res) {
      ctrl.mo = res.data;
    });

    ctrl.createMo = function() {
        // remove moQReserved and move to moQuantity
        _.forEach(ctrl.mo.inventoryList, function(inv) {
         
          _.forEach(ctrl.mo.recipe.activeIngredientGroup.ingredients, function(ingredient) {
            if (ingredient.item.code === inv.item.code) {
              var recipeItemNeededQuantity = ingredient.quantity * ctrl.mo.batchSize;
              inv.moQuantity += recipeItemNeededQuantity;
              inv.moqReserved -= recipeItemNeededQuantity;
            } 
          });
        });

        MoInventoryService.saveWithLotNumber(ctrl.mo).then(function() {
          $state.go('mo');
        });   
    }

    ctrl.findIngredientQuantity = function(itemCode) {
      var ingredientQuantity = 0;
      _.forEach(ctrl.mo.recipe.activeIngredientGroup.ingredients, function(ingredient) {
        if (ingredient.item.code === itemCode) {
          ingredientQuantity = ingredient.quantity;
          return;
        } 
      });

      return ingredientQuantity;
    }
      
  }
  
  angular
    .module('admin.rnd')
    .controller('MoManufactureController', MoManufactureController);
  