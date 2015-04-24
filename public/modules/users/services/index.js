(function() {
  'use strict';

function Users($http) {
  return {
    isjustlogged: function() {
        return $http.get('/auth/isjustlogged'); 
    },
    signin: function(data) {
        return $http.post('/api/auth', data);
    },
    register: function(data) {
        return $http.post('/api/user', data); 
    },
    logout: function() {
        return $http.get('/api/logout'); 
    }
  };
}

angular.module('users.services', [])
    .factory('Users', Users);
})();