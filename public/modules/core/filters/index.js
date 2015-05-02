(function() {
  'use strict';

function arraytostrcs() {
	return function(input) {
            	return input.join(',');
        	};
}
 function strcstoarray() {
	return function(input) {
	            return _.map(input.split(','), function(s){
	            	console.log('str',s.toLowerCase());
	                return s;
	            });
        	};
}

angular.module('core.filters', [])
    .filter('arraytostrcs', arraytostrcs)
    .filter('strcstoarray', strcstoarray);
})();