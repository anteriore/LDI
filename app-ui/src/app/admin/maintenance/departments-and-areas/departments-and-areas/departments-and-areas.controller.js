function DepartmentsAndAreasController($state, DepartmentsService,
		AreasService, $rootScope, _) {
	var ctrl = this;

	ctrl.departments = [];
	ctrl.areas = [];
	ctrl.addAreaForm = false;
	ctrl.addDepartmentForm = false;
	
	ctrl.$onInit = function() {
		ctrl.company = $rootScope.selectedCompany;
		loadDepartments();
		loadAreas();
	};
	
	function loadDepartments(){
		DepartmentsService.listByCompany(ctrl.company.id).then(
				function(response) {
					console.log("list response: "
							+ JSON.stringify(response.data));
					ctrl.departments = response.data;
				});
		ctrl.addDepartmentForm = false;
	}
	
	function loadAreas(){
		AreasService.listByCompany(ctrl.company.id).then(function(response) {
			console.log("list response area: " + JSON.stringify(response.data));
			ctrl.areas = response.data;
		});
		ctrl.addAreaForm = false;
	}
	
	ctrl.deleteDepartment = function(id){
		DepartmentsService.delete(id).then(function(response){
			if(response.data == true){
				loadDepartments();
			}
		});
	};
	
	ctrl.deleteArea = function(id){
		AreasService.delete(id).then(function(response){
			if(response.data == true){
				loadAreas();
			}
		});
	};
	
	ctrl.showAddArea = function(show){
		ctrl.addAreaForm = show;
	};
	
	ctrl.showAddDepartment = function(show){
		ctrl.addDepartmentForm = show;
	};
	
	ctrl.saveArea = function(event){
		event.area.company = $rootScope.selectedCompany;
	    console.log(event.area.company);
	    AreasService.save(event.area).then(function () {
	    		loadAreas();
	    });
	};
	
	ctrl.saveDepartment = function(event){
		event.department.company = $rootScope.selectedCompany;
		DepartmentsService.save(event.department).then(function(){
			loadDepartments();
		});
	};
	
	
	
}

angular.module('admin.maintenance').controller('DepartmentsAndAreasController', DepartmentsAndAreasController);
