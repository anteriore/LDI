function InventoryService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/inventory');
	};

	this.save = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/inventory', materialReevaluation);
	};

	this.update = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/inventory/', materialReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/inventory/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/inventory/company/' + companyId);
	};
	
	this.getItemByControlNumber = function(controlNumber){
		return $http.get(globalConfig.baseUrl + '/rest/inventory/item/control-number/' + controlNumber);
	};
	
	this.getStockQuantityOfItem = function(itemId, companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/inventory/company/'+companyId+'/stock/' + itemId);
	};
	
	this.listInventoryView = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/inventory/company/' + companyId + '/view');
	};
	
	this.listByCompanyAndItem = function(companyId, itemId){
		return $http.get(globalConfig.baseUrl + '/rest/inventory/company/' + companyId + '/item/' + itemId);
	};
	
	this.listByRecipeItemsOnInventory = function(companyId, recipeId) {
		return $http.get(globalConfig.baseUrl + '/rest/inventory/company/' + companyId + '/recipe/' + recipeId);
	}
}

/**
 * @ngdoc service
 * @name InventoryService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('InventoryService', InventoryService);
