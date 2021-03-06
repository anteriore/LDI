

function MaintenanceController($state, CompanyService, $rootScope) {
  var ctrl = this;

  ctrl.currentUser = { firstName: "Unknown user", department: { name: 'No ' } };

  ctrl.$onInit = function () {
      var currentUser = localStorage.getItem('currentUser');
      if (currentUser != null) {
          ctrl.currentUser = JSON.parse(currentUser);
      }
  }

  ctrl.checkPermission = function (code) {
    if (ctrl.currentUser.permissions[code]) {
        if (ctrl.currentUser.permissions[code].actions !== '') {
            return true;
        }
    }

    return false;
}

}

angular
  .module('admin.dashboard')
  .controller('MaintenanceController', MaintenanceController);