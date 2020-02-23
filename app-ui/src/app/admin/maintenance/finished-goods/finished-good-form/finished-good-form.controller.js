
function FinishedGoodFormController($state, FinishedGoodsService) {
  var ctrl = this;
  ctrl.$onChanges = function (changes) {
    if (changes.finishedgood) {
      ctrl.finishedgood = angular.copy(ctrl.finishedgood);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.finishedgood));
    ctrl.onSubmit({
      $event: {
    	  finishedgood: ctrl.finishedgood
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('FinishedGoodFormController', FinishedGoodFormController);
