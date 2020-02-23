
function BankAccountFormController($state, BankAccountsService) {
  var ctrl = this;
  ctrl.$onChanges = function (changes) {
    if (changes.bankaccount) {
      ctrl.bankaccount = angular.copy(ctrl.bankaccount);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.bankaccount));
    ctrl.onSubmit({
      $event: {
    	  bankaccount: ctrl.bankaccount
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('BankAccountFormController', BankAccountFormController);
