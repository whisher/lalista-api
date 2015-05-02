(function() {
  'use strict';

var AUTH_EVENTS = {
  authenticated: 'authenticated',
  unauthorized: 'unauthorized',
  forbidden: 'forbidden'
};

function UserToken($localStorage, jwtHelper) {
  return {
    set: function(token) {
      $localStorage.token = token;
    },
    get: function() {
      var token = $localStorage.token; 
      if(!token){
        return undefined;
      }
      return token;
    },
    getDecodeToken: function() {
      var token = $localStorage.token; 
      if(!token){
        return undefined;
      }
      return jwtHelper.decodeToken(token);
    },
    del: function() {
      $localStorage.$reset();
    },
    isExpired:function(){
      var token =$localStorage.token; 
      if(!token){
        return true;
      }
      return  jwtHelper.isTokenExpired(token);
    },
    hasScope:function(scope){
      var token =$localStorage.token; 
      if(!token){
        return false;
      }
      console.log(jwtHelper.decodeToken(token).scope,jwtHelper.decodeToken(token).scope.indexOf(scope));
      return jwtHelper.decodeToken(token).scope.indexOf(scope) !== -1;
    }
  };
}
 
function HttpInterceptor($rootScope, $q, UserToken, AUTH_EVENTS) {
    return {
        'request': function(config) {
            var token = UserToken.get();
            config.requestTimestamp = new Date().getTime();
            config.headers = config.headers || {};
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        'response': function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        },
        'responseError': function(rejection) {
            if (rejection.status === 401) {
                $rootScope.$emit(AUTH_EVENTS.unauthorized, rejection);
            }
            if (rejection.status === 403) {
                $rootScope.$emit(AUTH_EVENTS.forbidden, rejection);
            }
            return $q.reject(rejection);
        }
    };
}

angular.module('auth.services', [])
    .constant('AUTH_EVENTS', AUTH_EVENTS)
    .factory('UserToken', UserToken)
    .factory('HttpInterceptor', HttpInterceptor);
})();