(function() {
  'use strict';

function Items($http) {
  return {
    get: function() {
      return $http.get('/api/item');
    },
    show: function(id) {
      return $http.get('/api/item/' + id);
    },
    create: function(data) {
      return $http.post('/api/item', data);
    },
    update: function(id, data) {
      return $http.put('/api/item/' + id, data);
    },
    destroy: function(id) {
      return $http.delete('/api/item/' + id);
    },
    tags: function() {
      return $http.get('/api/tags');
    },
    tag: function(tag) {
      return $http.get('/api/tags/'+tag);
    }
  };
}

angular.module('items.services', [])
    .factory('Items', Items);
})();