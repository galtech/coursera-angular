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

  var itemName = "";
  var itemShortName = "";
  var itemDesc = "";

  service.getMenuItems = function (){
    var response = $http({
      method: "GET",
      url: (ApiBasePath+"/menu_items.json"),
    });

    return response;
  };

  service.addItem = function(itemName, shortName, itemDesc) {
    // add items to a found array

    items.push({
        item: 'chicken stirfry',
        short_name: 'CS',
        description: 'chicken stir fried with onions and peppers served with sesame noodles'
      });
    items.push({
        item: 'beef stirfry',
        short_name: 'BS',
        description: 'beef stir fried with onions and peppers served with sesame noodles'
      });
    items.push({
        item: 'prawn stirfry',
        short_name: 'PS',
        description: 'prawns stir fried with onions and peppers served with sesame noodles'
      });

    // var promise = service.getMenuItems();
    //
    // promise.then(function (response){
    //   var results = response.data;
    //   // console.log("API response: ", search.results);
    //
    //   for(var i = 0; i < results.menu_items.length; i++){
    //     var menuItem = results.menu_items[i];
    //
    //       // itemName = menuItem.name;
    //       // itemShortName = menuItem.short_name;
    //       // itemDesc = menuItem.description;
    //       var item = {
    //         name: menuItem.name,
    //         short_name: menuItem.short_name,
    //         description: menuItem.description
    //       };
    //       items.push(item);
    //
    //   }
    //
    // })
    // .catch(function (error){
    //   console.log("Something went terribly wrong");
    // });

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
