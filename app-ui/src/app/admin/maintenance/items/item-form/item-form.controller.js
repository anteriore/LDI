
function ItemFormController($state, ItemsService, ItemTypesService, UnitsService) {
  var ctrl = this;
  ctrl.itemTypes = [];
  ctrl.$onChanges = function (changes) {
    if (changes.item) {
      ctrl.item = angular.copy(ctrl.item);
    }
  };
  
  ctrl.$onInit = function(){
	  ItemTypesService.list().then(function(response){
		  ctrl.itemTypes = response.data;
	  });
	  UnitsService.list().then(function(response){
		  ctrl.units = response.data;
	  });
  };
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.item));
    ctrl.onSubmit({
      $event: {
    	  item: ctrl.item
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('ItemFormController', ItemFormController);
