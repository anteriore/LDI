var recipeForm = {
  bindings: {
    recipe: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './recipe-form.html',
  controller: 'RecipeFormController'
};

angular
  .module('admin.rnd')
  .component('recipeForm', recipeForm);
