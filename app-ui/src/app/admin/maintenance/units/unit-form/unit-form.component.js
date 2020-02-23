var unitForm = {
  bindings: {
    unit: '=',
    company: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './unit-form.html',
  controller: 'UnitFormController'
};

angular
  .module('admin.maintenance')
  .component('unitForm', unitForm);
