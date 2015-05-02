(function() {
'use strict';

function ItemsController(UserToken, tags) {
  var items = this;
  items.tags = tags.data;
  items.hasScopeAdmin = UserToken.hasScope('admin');
}
function ItemsListController($rootScope, $stateParams, itemsData, UserToken, OrdersStorage) {
  var items = this;
  items.data = itemsData.data;
  items.tag = $stateParams.tag;
  items.hasScopeAdmin = UserToken.hasScope('admin');
  items.hasScopeUser = UserToken.hasScope('user');
  if(items.hasScopeAdmin){
    $rootScope.$on('item-has-been-deleted', function(event, id) { 
      var data = [];
          angular.forEach(items.data, function(value, key) {
            if( value._id !== id){
              this.push(value);
            }
          }, data);
          items.data = data;
    });
  }
  items.counter = 1;
  items.cart = function(item){
    var data = angular.extend(item,{quantity:items.counter});
    $rootScope.$emit('cart-add', data);
    OrdersStorage.add(data);
  };
}
function ItemCreateController($filter,$stateParams,$state, Items) {
  var item = this;
  item.title = 'Add';
  item.data = {};
  
  item.data.status = 'available';
  item.data.tags = $stateParams.tag;
  item.save = function() {
    item.data.tags = $filter('strcstoarray')(item.data.tags);
    console.log( item.data.tags);
    Items.create(item.data).then(function(response) {
      $state.go('items');
    })
    .catch(function(response) {
      item.errors = response.data;
    });
  };

  item.onSuccess = function (response) {
       item.data.thumb = response.data.thumb;
  };
}

function ItemUpdateController($stateParams, $state, itemData, Items) {
  var item = this;
  item.title = 'Update';
  item.data = itemData.data;
  item.save = function() {
    Items.update($stateParams.id,item.data).then(function(response) {
      $state.go('items');
    })
    .catch(function(response) {
      item.errors = response.data;
    });
  };
}

function ItemShowController(itemData) {
  var item = this;
  item.data = itemData.data;
}

function ItemDestroyController($modalInstance, itemData, Items) {
  var item = this;
  item.data = itemData;
  item.ok = function () {
    $modalInstance.close(itemData);
  };
  item.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}

angular.module('items.controllers' ,[])
    .controller('ItemsController', ItemsController)
    .controller('ItemsListController', ItemsListController)
    .controller('ItemCreateController', ItemCreateController)
    .controller('ItemUpdateController', ItemUpdateController)
     .controller('ItemShowController', ItemShowController)
    .controller('ItemDestroyController', ItemDestroyController);
})();
