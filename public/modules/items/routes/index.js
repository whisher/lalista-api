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
            	tags : function(Items){
            		return Items.tags();
            	}
            }
        })
        .state('items by tag', {
            url: '/items/tag/:tag',
            templateUrl: 'items/templates/list.html',
            controller:'ItemsListController',
            controllerAs: 'items',
            resolve:{
                itemsData : function(Items,$stateParams){
                    return Items.tag($stateParams.tag);
                }
            }
        })
        .state('item create', {
            url: '/item/create/:tag',
            templateUrl: 'items/templates/form.html',
            controller:'ItemCreateController',
            controllerAs: 'item'
        })
        .state('item update', {
            url: '/item/update/:id',
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
