(function(){
'use strict';

angular.module('MenuSearchApp', [])
.controller('MenuSearchController', MenuSearchController)
.service('MenuItemsService', MenuItemsService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuSearchController.$inject = ['$scope', 'MenuItemsService'];
function MenuSearchController($scope, MenuItemsService){
  var search = this;

  var found = [];
  var searchTerm = "";

  search.items = MenuItemsService.getItems();

  search.searchMenuItems = function () {

    searchTerm = $scope.searchItem;


    var promise = MenuItemsService.getMenuItems();

    promise.then(function (response){
      search.results = response.data;
      // console.log("API response: ", search.results);

      for(var i = 0; i < search.results.menu_items.length; i++){
        var menuItem = search.results.menu_items[i];

        // if(menuItem.description.toLowerCase().indexOf(searchTerm) !== -1){
        //   // search.addItem(itemName, shortName, itemDesc);
        // }
      }
      // for (var i = 0; i < search.results.menu_items.length; i++){
      //   var description = search.results.menu_items[i].description;
      //   var item = search.results.menu_items[i].name;
      //   var shortName = search.results.menu_items[i].short_name;
      //   var menuItem = search.results.menu_items[i];
      //
      //   if(description.toLowerCase().indexOf(searchTerm) !== -1){
      //     $scope.found.push(menuItem);
      //   }
      //
      // }

    })
    .catch(function (error){
      console.log("Something went terribly wrong");
    });

  }

  search.addItem = function () {
    try{
        MenuItemsService.addItem(list1.itemName, list1.itemQuantity);
    } catch (error) {
        list1.errorMessage = error.message;
    }
  }

  search.removeItem = function (itemIndex) {
    MenuItemsService.removeItem(itemIndex);
  }


}

MenuItemsService.$inject = ['$http', 'ApiBasePath'];
function MenuItemsService($http, ApiBasePath){
  var service = this;
  var items = [];

  service.getMenuItems = function (searchTerm){
    var response = $http({
      method: "GET",
      url: (ApiBasePath+"/menu_items.json"),
    });

    return response;
  };

  service.addItem = function(itemName, shortName, itemDesc) {
    // add items to a found array
    items = ['test','test','test'];
  };

  service.removeItem = function (itemIndex){
    items.splice(itemIndex, 1);
  };

  service.getItems = function (){
    return items;
  };

}

// function searchMenu(results, searchTerm){
//   var found = [];
//
//   for(var i = 0; i < results.items.length; i++){
//     var userSearch = searchTerm;
//     if (userSearch.toLowerCase().indexOf(userSearch) !== -1){
//       found.push(results.items[i].description);
//     }
//
//     return found;
//   }
//
//   // return false;
// }

})();
