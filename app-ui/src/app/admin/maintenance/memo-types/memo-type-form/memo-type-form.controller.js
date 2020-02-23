
function MemoTypeFormController($state, MemoTypesService) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.memotype) {
      ctrl.memotype = angular.copy(ctrl.memotype);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.memotype));
    ctrl.onSubmit({
      $event: {
    	  memotype: ctrl.memotype
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('MemoTypeFormController', MemoTypeFormController);
