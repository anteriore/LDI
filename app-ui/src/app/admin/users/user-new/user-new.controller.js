
function UserNewController($state, UsersService, CompanyService, DepartmentsService, PermissionsService) {
  var ctrl = this;

  ctrl.$onInit = function () {
    ctrl.error = null;
    CompanyService.list().then(function(response) {
        console.log("CompanyService list: " + JSON.stringify(response))
        ctrl.companies = response.data;
    }).then(function() {
			PermissionsService.list().then(function(response) {
				ctrl.permissions = response.data;
				

				DepartmentsService.listByCompany(ctrl.companies[0].id).then(function(response){
					ctrl.departments = response.data;
					console.log("UserNewController ctrl.departments[0]:" + JSON.stringify(ctrl.departments[0]));
					console.log("UserNewController ctrl.companies[0]: " + JSON.stringify(ctrl.companies[0]));
					 
						ctrl.user = {
							firstName: 'John',
							lastName: 'Operio',
							middleInitial: 'N',
							email: 'john@operio.com',
							department: ctrl.departments[0],
							password: 'test',
							company: ctrl.companies[0],
							employeeType: 'main',
							permissions: buildFormPermission(),
							depots: []
						};

						console.log(ctrl.user);
				});
			});
			
			var buildFormPermission = function() {
				var actions = UsersService.convertActionsString('crud');
				console.log('buildFormPermission: ', actions);
				var permissions = {};
				ctrl.permissions.forEach(function(permission) {
					permission.permissionSubs.forEach(function(ps) {
						permissions[ps.code] = {code: ps.code, actions: actions}
					});
				});

				return permissions;
			}

			
	    	
       
    });


  };

  ctrl.createUser = function (event) {
    console.log('createUser');
		var user = JSON.parse(JSON.stringify(event.user));
    for (var code in user.permissions) {
      console.log("UserNewController createUser: " + code);
      user.permissions[code].actions = UsersService.actionArrayToString(user.permissions[code].actions);
    }
    UsersService.save(user).then(function () {
      $state.go('users');
    });

  };
}

angular
  .module('admin.users')
  .controller('UserNewController', UserNewController);
