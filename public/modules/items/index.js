(function() {
'use strict';
function run() {
	
 }
angular.module('items', [
      'ui.router',
      'ui.bootstrap',
      'templates',
      'items.services',
      'items.filter',
      'items.directives',
      'items.controllers',
      'items.routes'
]).run(run);

})();

