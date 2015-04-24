(function() {
'use strict';

function modalItemDestroy($rootScope, $modal, $templateCache, Items) {
  return {
    scope:{
      item: '='
    },
    restrict: 'A',
    link: function(scope, element) {
      element.on('click',function() {
        var modalInstance = $modal.open({
          template:  $templateCache.get('items/templates/modalDestroy.html'),
          controller: 'ItemDestroyController',
          controllerAs: 'item',
          size: 'sm',
          resolve: {
          itemData: function(){
            return scope.item;
          }
        }
    });
    modalInstance.result.then(function (item) {
      Items.destroy(item._id).then(function(response) {
        $rootScope.$emit('item-has-been-deleted', item._id);
      })
      .catch(function(response) {
        console.log(response);
      });
     
    });
      });//click
    }
  };
}


angular.module('items.directives', [])
  .directive('modalItemDestroy', modalItemDestroy);
})();

