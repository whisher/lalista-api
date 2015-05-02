(function() {
'use strict';

function OrdersController(OrdersStorage) {
  var orders = this;
  orders.data = {};
  orders.data.items = OrdersStorage.get();
}

angular.module('orders.controllers', [])
    .controller('OrdersController', OrdersController);
})();
