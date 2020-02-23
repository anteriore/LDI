
function SearchBoxFormController($state) {
  var ctrl = this;
  ctrl.$onChanges = function (changes) {
    if (changes.search) {
      ctrl.search = angular.copy(ctrl.search);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.search));
    ctrl.onSubmit({
      $event: {
    	  search: ctrl.search
      }
    });
  };
}

angular
  .module('admin.common')
  .controller('SearchBoxFormController', SearchBoxFormController);
