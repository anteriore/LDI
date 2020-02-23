var itemForm = {
  bindings: {
    item: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './item-form.html',
  controller: 'ItemFormController'
};

angular
  .module('admin.maintenance')
  .component('itemForm', itemForm);
