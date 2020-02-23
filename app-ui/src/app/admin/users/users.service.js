function UsersService($http, globalConfig) {

  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/users');
  };

  this.save = function (user) {
    return $http.post(globalConfig.baseUrl + '/rest/users', user);
  };

  this.update = function (user) {
    return $http.post(globalConfig.baseUrl + '/rest/users/', user);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/users/' + id);
  };

  this.listByCompany = function(id) {
	return $http.get(globalConfig.baseUrl + '/rest/users/company/' + id);  
  };

  this.me = function() {
      return $http.get(globalConfig.baseUrl + '/rest/me');
  }
  
  this.convertActionsString = function (actions) {
    if (actions && actions !== '') {
      if (!(typeof actions === "string")) {
        console.error('convertActionsString requires actions to be string: ', actions);
        return;
      }
      return actions.split('');
    } else {
      return [];
    }
  }

  this.actionArrayToString = function (actionArray) {
   
    if (actionArray && actionArray !== []) {
      if (!(actionArray instanceof Array)) {
        console.error('actionArrayToString requires actions to be array');
        return;
      }  
      return actionArray.join('');
    } else {
      return '';
    }
  }
}

/**
 * @ngdoc service
 * @name UsersService
 * @module components.auth
 *
 */
angular
  .module('admin.users')
  .service('UsersService', UsersService);
