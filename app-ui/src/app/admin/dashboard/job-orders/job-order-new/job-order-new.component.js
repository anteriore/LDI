var jobOrderNew = {
  templateUrl: './job-order-new.html',
  controller: 'JobOrderNewController'
};

angular
  .module('admin.dashboard')
  .component('jobOrderNew', jobOrderNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('job-order-new', {
        parent: 'app',
        url: '/admin/dashboard/job-order/new',
        component: 'jobOrderNew'
      });
  });
