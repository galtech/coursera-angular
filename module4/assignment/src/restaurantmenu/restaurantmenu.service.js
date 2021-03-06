(function () {
'use strict';

angular.module('RestaurantMenu')
.service('RestaurantMenuService', RestaurantMenuService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


RestaurantMenuService.$inject = ['$q', '$timeout','$http', 'ApiBasePath']
function RestaurantMenuService($q, $timeout, $http, ApiBasePath) {
  var service = this;

  // List of menu items
  var items = [];

  service.getMenuItems = function (){
    var response = $http({
      method: "GET",
      url: (ApiBasePath+"/menu_items.json"),
    });

    return response;
  };

  service.addItem = function(itemName, shortName, itemDesc) {
    // add items to a found array

          var item = {
            name: itemName,
            short_name: shortName,
            description: itemDesc
          };
          items.push(item);

  };

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getItems = function () {
    // return items;
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 800);

    return deferred.promise;
  };


}

})();
