(function() {
'use strict';
function run($rootScope, OrdersStorage) {
	$rootScope.global.order  = false;
	$rootScope.$on('cart-add', function(event, data) { 
   		$rootScope.global.order  = true;
   	});
}
angular.module('orders', [
      	'ui.router',
      	'templates',
      	'orders.services',
      	'orders.controllers',
     	'orders.routes'
])
	.run(run);

})();

