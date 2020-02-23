var recipeNew = {
  templateUrl: './recipe-new.html',
  controller: 'RecipeNewController'
};

angular
  .module('admin.rnd')
  .component('recipeNew', recipeNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('recipe-new', {
        parent: 'app',
        url: '/admin/rnd/recipe/new',
        component: 'recipeNew'
      });
  });
