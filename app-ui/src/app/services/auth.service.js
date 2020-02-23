function AuthService($http, globalConfig) {

	this.authenticate = function(username, password) {
		console.log("AuthService authenticate: " + username);
		return $http.post(globalConfig.baseUrl + '/api/login', {username: username, password: password});
	};

	
}

/**
 * @ngdoc service
 * @name PermissionsService
 * @module services
 *
 */
angular.module('services').service('AuthService', AuthService);
