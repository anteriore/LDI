
var finishedGood = {
  templateUrl: './finished-goods.html',
  controller: 'FinishedGoodController'
};

angular
  .module('admin.maintenance')
  .component('finishedGood', finishedGood)
  .config(function ($stateProvider) {
    $stateProvider
      .state('finishedGoods', {
        parent: 'app',
        url: '/admin/maintenance/finished-good',
        component: 'finishedGood'
      });
  });