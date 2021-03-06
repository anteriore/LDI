
function VouchersPayableNewController($state, VouchersPayablesService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    ctrl.vp = {
    		company: ctrl.company,
    		date: new Date(),
    		accountTitles: [],
    		variation: '1 Voucher'
    }
    };

  ctrl.createVouchersPayable = function (event) {
    VouchersPayablesService.save(event.vp).then(function (response) {
    	  console.log("createVouchersPayable " + JSON.stringify(response.data));
        $state.go('vouchers-payables');
    });

  };
}

angular
  .module('admin.accounting')
  .controller('VouchersPayableNewController', VouchersPayableNewController);
