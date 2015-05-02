(function() {
'use strict';


function run($window, $rootScope, $state, AUTH_EVENTS, UserToken) {
  
  var token = UserToken.getDecodeToken();
  
  if(token){ 
    var bool = UserToken.isExpired();
    if(bool){
      token = undefined;
      logout();
    }
    
  }
  $rootScope.global.token =  token;

  $rootScope.$on(AUTH_EVENTS.unauthorized, function(event, data) { 
    logout();
    $state.go('session.signin');
   });

  $rootScope.$on(AUTH_EVENTS.forbidden, function(event, data) { 
    UserToken.del();
    $state.go('session.signin');
  });

  $rootScope.$on(AUTH_EVENTS.authenticated, function(event, data) { 
    UserToken.set(data);
    $rootScope.global.token = UserToken.getDecodeToken();
  });

  $rootScope.global.logout = function() {
    logout();
  }; 

  function logout(){
    UserToken.del();
    delete $rootScope.global.token;
    $state.go('home',{}, {reload: true});     
  }
}
angular.module('auth',[
  'ui.bootstrap',
  'ngStorage',
  'angular-jwt',
  'auth.services', 
  'auth.routes'
  
  ])
  .run(run);
            
})();

