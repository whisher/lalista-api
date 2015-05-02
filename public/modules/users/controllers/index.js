(function() {
'use strict';

function UserController() { 
	var user = this;
}

function UserSigninController($rootScope, $state, Users, AUTH_EVENTS) {
	var user = this;
	user.data = {};
	user.error  = undefined;
    	user.save = function() {
    		Users.signin(user.data).then(function(response) {
			$rootScope.$emit(AUTH_EVENTS.authenticated, response.data.token);
			$state.go('home');
		})
		.catch(function(response) {
			user.error = response.data.message;
		});
	};
}

function UserRegisterController($rootScope, $state, Users, AUTH_EVENTS) {
	var user = this;
	user.data = {};
	user.error  = undefined;
	user.save = function() {
		Users.register(user.data).then(function(response) {
			$rootScope.$emit(AUTH_EVENTS.authenticated, response.data.token);
			$state.go('home');
		})
		.catch(function(response) {
			user.error = response.data.message;
		});
	};
}
angular.module('users.controllers', [])
    .controller('UserController', UserController)
    .controller('UserSigninController', UserSigninController)
    .controller('UserRegisterController', UserRegisterController);
})();
