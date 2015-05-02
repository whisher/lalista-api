(function() {
'use strict';

function config($stateProvider) {
	$stateProvider      
        		.state('orders', {
            		url: '/orders',
            		templateUrl: 'orders/templates/index.html',
            		controller:'OrdersController',
                                    controllerAs: 'orders',
    		});
}

angular.module('orders.routes', [])
    .config(config);
})();
