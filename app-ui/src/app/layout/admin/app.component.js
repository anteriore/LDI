
var app = {
  templateUrl: './app.html',
  controller: 'AppController'
};

/**
 * @ngdoc directive
 * @name app
 * @module admin.common
 *
 **/
angular
  .module('admin.common')
  .component('app', app);