
function UserEditController($state, $stateParams, UsersService, DepartmentsService, CompanyService, $rootScope, PermissionsService) {
  var ctrl = this;
  ctrl.user = {};
  ctrl.$onInit = function () {
    ctrl.error = null;
    
    console.log('userId: ' + JSON.stringify($stateParams.userId));
    
    CompanyService.list().then(function(response) {
        ctrl.companies = response.data;
    }).then(function() {
      ctrl.company = $rootScope.selectedCompany;

      DepartmentsService.listByCompany(ctrl.company.id).then(function(response){
        ctrl.departments = response.data;

        PermissionsService.list().then(function(response) {
          ctrl.permissions = response.data;
          UsersService.get($stateParams.userId).then(function (response) {
            ctrl.user = response.data;
            buildFormPermission();
          });
        });
        
        var buildFormPermission = function() {
          for (var code in ctrl.user.permissions) {
            console.log("UserEditController buildFormPermission: " + code);
            ctrl.user.permissions[code].actions = UsersService.convertActionsString(ctrl.user.permissions[code].actions);
          }   
        }
      });
    });
  };
  ctrl.editUser = function (event) {
    console.log('UserEditController editUser');
    var user =  JSON.parse(JSON.stringify(event.user));
    for (var code in user.permissions) {
      user.permissions[code].actions = UsersService.actionArrayToString(user.permissions[code].actions);
    }

    UsersService.update(user).then(function () {
      $state.go('users');
    });
  };
}

angular
  .module('admin.users')
  .controller('UserEditController', UserEditController);
