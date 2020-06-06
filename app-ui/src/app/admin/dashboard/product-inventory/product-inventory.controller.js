function ProductInventoryController(
  $state,
  ProductInventoryService,
  StockCardsService,
  $rootScope,
  ProductStockCardService,
  _
) {
  var ctrl = this;
  ctrl.productInventoryList = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;

  ctrl.$onInit = function() {
    ctrl.addProductInventory = false;
    ctrl.error = null;
    loadProductInventory();
  };

  function loadProductInventory() {
    ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
    ctrl.company = $rootScope.selectedCompany;
    ProductInventoryService.listProductInventoryView(ctrl.company.id).then(
      function(response) {
        ctrl.productInventoryList = response.data;
        console.log('LIST' + JSON.stringify(ctrl.productInventoryList));
      }
    );
  }

  ctrl.openModal = function(productInventory) {
    console.log(JSON.stringify(productInventory));
    ctrl.finishedGood = productInventory['product'].finishedGood;
    ProductInventoryService.listByCompanyAndFinishedGood(
      ctrl.company.id,
      ctrl.finishedGood.id
    ).then(function(response) {
      ctrl.productList = response.data;
    });
  };

  ctrl.openStockCard = function(productInventory) {
    ProductStockCardService.listByCompanyAndProduct(
      ctrl.company.id,
      productInventory.product.id
    ).then(function(response) {
      ctrl.stockCards = response.data;
      console.log('response data size ' + ctrl.stockCards.length);
    });
  };
}

angular
  .module('admin.dashboard')
  .controller('ProductInventoryController', ProductInventoryController);
