
function JobOrderFormController($state, JobOrdersService, MoInventoryService, ProceduresService, ProcedureAreasService, EmployeesService, $rootScope, _) {
  var ctrl = this;
  ctrl.selectedEmployees = [];
  var currentUser = localStorage.getItem('currentUser');
      if (currentUser != null) {
          ctrl.currentUser = JSON.parse(currentUser);
      }
  
  ctrl.$onInit = function (){
	  ctrl.company = $rootScope.selectedCompany;
	  ctrl.jo.date = new Date();
	  EmployeesService.list().then(function(response){
		  ctrl.employees = response.data;
	  });
	  ProcedureAreasService.list().then(function(response){
		  ctrl.procedureAreas = response.data;
	  });
  };
  
  ctrl.selectArea = function (area){
	 ProceduresService.listByArea(area.id).then(function(response){
		 ctrl.procedures = response.data;
	 });
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.jo) {
      ctrl.jo = angular.copy(ctrl.jo);
    }
  };

  ctrl.findMoInventory = function() {
    MoInventoryService.listByCompany(ctrl.company.id).then(function(response) {
      ctrl.mos = response.data;
    });
  }
  
  ctrl.selectMO = function(mo) {
	  ctrl.jo.mo = mo;
  };
  
  ctrl.getEmployee = function(employee){
	  if(ctrl.isEmployeePresent(employee) !== -1){
			var index = ctrl.isEmployeePresent(employee);
			ctrl.selectedEmployees.splice(index, 1);
		}else{
			ctrl.selectedEmployees.push(employee);
		}
  };
  
  ctrl.isEmployeePresent = function(employee){
	  for(var i = 0; i < ctrl.selectedEmployees.length; i++){
		  if(ctrl.selectedEmployees[i] == employee){
			  return i;
		  }
	  }
	  
	  return -1;
  };
  
  ctrl.displayThis = function(time){
	  console.log(time);
  };
  
  ctrl.submitForm = function () {
	ctrl.jos = [];
	for(var i = 0; i < ctrl.selectedEmployees.length; i++){
		ctrl.jos.push({
			employee:ctrl.selectedEmployees[i],
			moInventory:ctrl.jo.mo,
			timeIn:ctrl.selectedEmployees[i].timeIn,
			timeOut:ctrl.selectedEmployees[i].timeOut,
			output:ctrl.selectedEmployees[i].output,
			numberOfHours:ctrl.selectedEmployees[i].numberOfHours,
			procedure:ctrl.selectedEmployees[i].procedure,
			date:ctrl.jo.date
		});
	}
    ctrl.onSubmit({
      $event: {
    	  jo: ctrl.jos
      }
    });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('JobOrderFormController', JobOrderFormController);
