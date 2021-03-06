
function UsersController($state, UsersService, CompanyService,$rootScope, DepartmentsService, _) {
  var ctrl = this;

  ctrl.totalAccounts = 1;
  ctrl.users = [];
  ctrl.adminUsers = [];
  ctrl.mmdUsers = [];
  ctrl.rndUsers = [];
  ctrl.costingUsers = [];
  ctrl.purchasingUsers = [];
  ctrl.drUsers = [];

  ctrl.$onInit = function () {
	loadDepartments();
    loadUsers();
  };

  ctrl.createNewUser = function (event) {
    console.log('createNewUser');
    $state.go('user-new');
  };

  ctrl.goToEdit = function (id) {
    $state.go('user-edit', { 'userId': id });
  }


  function loadDepartments(){
	  ctrl.company = $rootScope.selectedCompany;
	  DepartmentsService.listByCompany(ctrl.company.id).then(function(response){
		ctrl.departments = response.data;
	  });
  }
  function loadUsers() {
	console.log("company selected user view " + JSON.stringify($rootScope.selectedCompany));
	ctrl.company = $rootScope.selectedCompany;
	UsersService.listByCompany(ctrl.company.id).then(function (response) {
      console.log("list response: " + JSON.stringify(response.data));
      ctrl.users = response.data;
      ctrl.totalAccounts = ctrl.users.length;
      /*
      ctrl.adminUsers = _.filter(ctrl.users, { 'accountType': 'Administrator' });
      ctrl.mmdUsers = _.filter(ctrl.users, { 'accountType': 'MMD' });
      ctrl.rndUsers = _.filter(ctrl.users, { 'accountType': 'R & D' });
      ctrl.costingUsers = _.filter(ctrl.users, { 'accountType': 'COSTING' });
      ctrl.purchasingUsers = _.filter(ctrl.users, { 'accountType': 'PURCHASING' });
      ctrl.drUsers = _.filter(ctrl.users, { 'accountType': 'DR' });*/
    });
  }
}

angular
  .module('admin.users')
  .controller('UsersController', UsersController);
