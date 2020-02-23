
var recipe = {
  templateUrl: './recipes.html',
  controller: 'RecipeController'
};

angular
  .module('admin.rnd')
  .component('recipe', recipe)
  .config(function ($stateProvider) {
    $stateProvider
      .state('recipes', {
        parent: 'app',
        url: '/admin/rnd/recipes',
        component: 'recipe'
      });
  });