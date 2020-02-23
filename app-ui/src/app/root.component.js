var root = {
  templateUrl: './root.html'
};

angular
  .module('root')
  .component('root', root)
  .constant('_', window._) //lodash
  .config(function ($stateProvider, $locationProvider, $httpProvider) {
    $stateProvider
      .state('app', {
        redirectTo: 'dashboard',
        url: '',
//        data: {
//          requiredAuth: true
//        },
        component: 'app'
      });

      /* Register error provider that shows message on failed requests or redirects to login page on
        * unauthenticated requests */
      $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
        return {
            'responseError': function (rejection) {
                if (!rejection.status) return $q.reject(rejection);
                var status = rejection.status;
                var config = rejection.config;
                var method = config.method;
                var url = config.url;

                if (status == 401) {
                    $location.path("/login");
                } else {
                    $rootScope.error = method + " on " + url + " failed with status " + status;
                }

                return $q.reject(rejection);
            }
        };
      });

      /* Registers auth token interceptor, auth token is either passed by header or by query parameter
             * as soon as there is an authenticated user */
      $httpProvider.interceptors.push(function ($q, $rootScope, $location, globalConfig) {
        return {
            'request': function (config) {
                var isRestCall = config.url.indexOf('rest') !== -1;
                var isLogin = config.url.indexOf('rest/login') >= 0;
                if (!isLogin && isRestCall && angular.isDefined($rootScope.accessToken)) {
                    var accessToken = $rootScope.accessToken;
                    //console.log("sending accessToken: " + accessToken + ", url: " + config.url);
                    config.url = config.url + "?token=" + accessToken;
                    
                }
                return config || $q.when(config);
            }
        };
    }
      );


      $locationProvider.html5Mode(true);
  }).run(function($state, $rootScope, $cookieStore, $location, UsersService) {

    $rootScope._ = window._; //lodash

    /* Reset error when a new view is loaded */
    $rootScope.$on('$viewContentLoaded', function () {
      delete $rootScope.error;
    });

    $rootScope.logout = function () {
      delete $rootScope.user;
      delete $rootScope.accessToken;
      $cookieStore.remove('accessToken');
      $location.path("/login");
    };

    /* Try getting valid user from cookie or go to login page */
    var originalPath = $location.path();
    $location.path("/login");
    var accessToken = $cookieStore.get('accessToken');
    if (accessToken !== undefined) {
        $rootScope.accessToken = accessToken;
        console.log("### ACCESS TOKEN FOUND");
        UsersService.me().then(function(response) {
          console.log("### UsersService.me: " + JSON.stringify(response.data));
          $rootScope.user = response.data;
          if(!$rootScope.selectedCompany){
        	  	if(window.localStorage.getItem('company') == null){
        	  		$rootScope.selectedCompany = $rootScope.user.company;
        	  	}else{
        	  		console.log("in root module company local storage" + window.localStorage.getItem('company'));
        	  		$rootScope.selectedCompany = JSON.parse(window.localStorage.getItem('company'));
        	  	}
          }
          localStorage.setItem('currentUser', JSON.stringify($rootScope.user));
          $location.path(originalPath);
        });
    }

  });
