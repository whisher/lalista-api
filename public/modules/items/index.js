(function() {
'use strict';
function run() {
	
 }
angular.module('items', [
      'ui.router',
      'ui.bootstrap',
      'lr.upload',
      'Firestitch.angular-counter',
      'templates',
      'orders',
      'items.services',
      'items.filter',
      'items.directives',
      'items.controllers',
      'items.routes'
]).run(run);

})();

