(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('items', {
            url: '/items',
            templateUrl: 'items/templates/index.html',
            controller:'ItemsController',
            controllerAs: 'items',
            resolve:{
            	itemsData : function(Items){
            		return Items.get();
            	}
            }
        })
        .state('item create', {
            url: '/item/create',
            templateUrl: 'items/templates/form.html',
            controller:'ItemCreateController',
            controllerAs: 'item'
        })
        .state('article update', {
            url: '/article/update/:id',
            templateUrl: 'items/templates/form.html',
            controller:'ItemUpdateController',
            controllerAs: 'item',
            resolve: {
               itemData: function(Items, $stateParams){
                    return Items.show($stateParams.id);
                }
            }
        })
        .state('item show', {
            url: '/item/show/:id',
            templateUrl: 'items/templates/show.html',
            controller:'ItemShowController',
            controllerAs: 'item',
            resolve: {
               itemData: function(Items, $stateParams){
                    return Items.show($stateParams.id);
                }
            }
        });
}

angular.module('items.routes', [])
    .config(config);
})();
