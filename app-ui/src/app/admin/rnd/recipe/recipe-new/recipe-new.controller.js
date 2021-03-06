
function RecipeNewController($state, RecipesService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.recipe = {
    		company: $rootScope.selectedCompany,
        finishedGood: {},
        ingredientGroups: [],
        status: "Active"
    };
  };

  ctrl.createRecipe = function (event) {
    console.log("create event", event.recipe);
    RecipesService.save(event.recipe).then(function (response) {
      $state.go('rnd');
    });

  };
}

angular
  .module('admin.rnd')
  .controller('RecipeNewController', RecipeNewController);
