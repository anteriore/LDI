
function UnitFormController($state, UnitsService) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.unit) {
      ctrl.unit = angular.copy(ctrl.unit);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.unit));
    ctrl.onSubmit({
      $event: {
        unit: ctrl.unit
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('UnitFormController', UnitFormController);
