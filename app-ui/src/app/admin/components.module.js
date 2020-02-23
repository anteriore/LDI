
/**
 *
 * @ngdoc module
 * @name components
 *
 * @requires components.contact
 * @requires components.auth
 *
 * @description
 *
 * This is the components module. It includes all of our components.
 *
 **/

angular
  .module('admin', [
    'admin.dashboard',
    'admin.users',
    'admin.rnd',
    'admin.config',
    'admin.purchasing',
    'admin.shared',
    'admin.accounting',
    'admin.sales'
  ]);
