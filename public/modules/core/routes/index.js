(function() {
'use strict';

function config($stateProvider) {
	$stateProvider      
        		.state('home', {
            		url: '/',
            		templateUrl: 'core/templates/index.html',
            		controller:'CoreController',
                                    controllerAs: 'core',
    		})
        		.state('404', {
            		url: '/404',
            		templateUrl: 'core/templates/404.html'
    		});
}

angular.module('core.routes', [])
    .config(config);
})();
