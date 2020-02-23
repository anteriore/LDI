
function RecipeController($state, RecipesService, _) {
  var ctrl = this;
  ctrl.recipes = [];
  ctrl.recipesOfFinishedGood = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'code';
  ctrl.sortReverse = false;

  ctrl.$onInit = function () {
	  ctrl.addRecipe = false;
	  ctrl.error = null;
	  loadRecipes();
  };
  
  function loadRecipes(){
	  RecipesService.listByStatus("Active").then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.recipes = response.data;
	  });
  }
  
  ctrl.loadRecipesOfFinishedGood = function(finishedGood){
	  RecipesService.listByFinishedGood(finishedGood.id).then(function(response){
		  return response.data;
	  });
  };

  ctrl.updateRecipe = function (recipe) {
	RecipesService.update(recipe).then(function(response){
		console.log("Recipe updated " + recipe.name);
	}); 
  }
  
  ctrl.showAddRecipe = function (show){
	  ctrl.addRecipe = show;
  };
  
  ctrl.openModal = function(finishedGood){
	  ctrl.showModal = true;
	  console.log("show modal" +  ctrl.showModal);
	  console.log("finished good" + JSON.stringify(finishedGood));
	  ctrl.finishedgood = finishedGood;
	  RecipesService.listByFinishedGood(ctrl.finishedgood.id).then(function(response){
		  ctrl.recipesOfFinishedGood = response.data;
		  console.log("recipe of finished good" + JSON.stringify(ctrl.recipesOfFinishedGood));
    });
  };
  
  ctrl.closeModal = function(){
	  ctrl.showModal = false;
  };
  
  ctrl.editRecipe = function (id) {
	  RecipesService.get(id).then(function(response){
		  ctrl.recipe = response.data;
	  });
	  ctrl.addRecipe = true;
  };
  
  ctrl.saveRecipe = function (event) {
	    RecipesService.save(event.recipe).then(function () {
	    	  loadRecipes();
	    	  ctrl.showAddRecipe(false);
	    	  ctrl.recipe = null;
	    });
  };
  
  ctrl.deleteRecipe = function (id){
	  RecipesService.delete(id).then(function(response){
		  loadRecipes();
	  });
  };
}

angular
  .module('admin.rnd')
  .controller('RecipeController', RecipeController);
