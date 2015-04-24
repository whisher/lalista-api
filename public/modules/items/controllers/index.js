(function() {
'use strict';

function ItemsController($rootScope, $templateCache, $modal, itemsData, Items) {
  var items = this;
  items.data = itemsData.data;
  $rootScope.$on('item-has-been-deleted', function(event, id) { 
    var data = [];
        angular.forEach(articles.data, function(value, key) {
          if( value._id !== id){
            this.push(value);
          }
        }, data);
        items.data = data;
  });
}

function ItemCreateController($state, Items) {
  var item = this;
  item.title = 'Add';
  item.data = {};
  item.save = function() {
    Items.create(item.data).then(function(response) {
      $state.go('items');
    })
    .catch(function(response) {
      item.errors = response.data;
    });
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
    .controller('ItemCreateController', ItemCreateController)
    .controller('ItemUpdateController', ItemUpdateController)
     .controller('ItemShowController', ItemShowController)
    .controller('ItemDestroyController', ItemDestroyController);
})();
