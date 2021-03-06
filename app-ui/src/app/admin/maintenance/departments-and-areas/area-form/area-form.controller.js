
function AreaFormController($state, AreasService) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.area) {
      ctrl.area = angular.copy(ctrl.area);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.area));
    ctrl.onSubmit({
      $event: {
        area: ctrl.area
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('AreaFormController', AreaFormController);
