
function CostingSaveController(MoInventoryService, JobOrdersService, ProductMovementsService, CostingService, $state, EmployeesService, _) {
  var ctrl = this;
  ctrl.costing = { moInventory: {}, moCostingEmployees: [], moCostingInventories: [], employeeTotalCost: 0, totalCost: 0 };

  ctrl.listJobOrdersByMoInventory = function () {
    JobOrdersService.listByMoInventory(ctrl.costing.moInventory.id).then(function (res) {
      ctrl.costing.jobOrders = res.data;

      ctrl.recomputeTotal();
    });
  }

  ctrl.$onInit = function () {
    console.log('CostingSaveController: id: ', ctrl.id.id);


    if (!ctrl.costing.moCostingInventories) {
      ctrl.costing.moCostingInventories = [];
    }


    CostingService.list().then(function (res) {
      ctrl.costings = res.data;
    });

    if (ctrl.id.id) {
      CostingService.one(ctrl.id.id).then(function (res) {
        ctrl.costing = res.data;
      });
    } else {
      ctrl.costing = {};
    }


    MoInventoryService.list().then(function (res) {
      ctrl.moList = res.data;
    });

    ProductMovementsService.list().then(function (res) {
      ctrl.pmList = res.data;
    });

    EmployeesService.list().then(function (res) {
      ctrl.employees = res.data;
      console.log('employees', ctrl.employees);
    });

  };

  ctrl.findIngredientQuantity = function (itemCode) {
    var ingredientQuantity = 0;
    _.forEach(ctrl.costing.moInventory.recipe.activeIngredientGroup.ingredients, function (ingredient) {
      if (ingredient.item.code === itemCode) {
        ingredientQuantity = ingredient.quantity;
        return;
      }
    });

    return ingredientQuantity;
  }

  ctrl.updateCostingModel = function () {
    console.log('updateCostingModel');
    if (!ctrl.costing.moCostingInventories) {
      ctrl.costing.moCostingInventories = [];
    }

    _.forEach(ctrl.costing.moInventory.inventoryList, function (inventory) {
      ctrl.costing.moCostingInventories.push({
        inventory: inventory,
        cost: inventory.cost
      });
    });

    ctrl.recomputeTotal();
  }

  ctrl.addEmployee = function () {
    if (!ctrl.costing.moCostingEmployees) {
      ctrl.costing.moCostingEmployees = [];
    }

    ctrl.costing.moCostingEmployees.push({
      employee: ctrl.employeeSelection,
      hoursSpent: ctrl.hoursSpent,
      cost: ctrl.employeeSelection.hourlyRate * ctrl.hoursSpent
    });
    ctrl.recomputeTotal();
  }

  ctrl.recomputeTotal = function () {
    ctrl.costing.totalCost = 0;
    ctrl.costing.employeeTotalCost = 0;
    _.forEach(ctrl.costing.jobOrders, function (jobOrder) {
      ctrl.costing.employeeTotalCost += jobOrder.employee.hourlyRate * jobOrder.numberOfHours;
    });
    ctrl.costing.totalCost += ctrl.costing.employeeTotalCost;
    console.log('listJobOrdersByMoInventory employeeTotalCost: ' + ctrl.costing.employeeTotalCost);
    console.log('listJobOrdersByMoInventory totalCost: ' + ctrl.costing.totalCost);
    console.log('joborders:', ctrl.costing.jobOrders);

    /**
     * WAITING FOR UNIT PRICE TO COMPUTE MO INVENTORY
     */
    // _.forEach(ctrl.costing.moInventory.inventoryList, function(inv) {
    //   ctrl.costing.totalCost += inv.cost;
    // });

    console.log('total', ctrl.costing.totalCost);
  }

  ctrl.save = function (event) {
    ctrl.updateCostingModel();

    return CostingService
      .save(ctrl.costing)
      .then(function () {
        $state.go('costings');
      });
  };
}

angular
  .module('admin.dashboard')
  .controller('CostingSaveController', CostingSaveController);