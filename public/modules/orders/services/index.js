(function() {
  'use strict';

function Orders($http) {
  return {
    get: function() {
      return $http.get('/api/order');
    },
    show: function(id) {
      return $http.get('/api/order/' + id);
    },
    create: function(data) {
      return $http.post('/api/order', data);
    },
    update: function(id, data) {
      return $http.put('/api/order/' + id, data);
    },
    destroy: function(id) {
      return $http.delete('/api/order/' + id);
    }
  };
}

function OrdersStorage($sessionStorage) {
  $sessionStorage.order = [];
  return {
    add: function(item) {
      $sessionStorage.order.unshift(item);
    },
    get: function() {
      return  $sessionStorage.order; 
    },
    del: function() {
      delete $sessionStorage.order;
    }
  };
}
angular.module('orders.services', [])
	.factory('Orders', Orders)
 	.factory('OrdersStorage', OrdersStorage);
})();