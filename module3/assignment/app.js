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

  search.itemName = "";
  search.itemShortName = "";
  search.itemDesc = "";
  search.noresult = "";

  search.found = MenuItemsService.getItems();

  search.searchMenuItems = function () {
    searchTerm = $scope.searchItem;

    var promise = MenuItemsService.getMenuItems();

    promise.then(function (response){
      search.results = response.data;
      // console.log("API response: ", search.results);

      for(var i = 0; i < search.results.menu_items.length; i++){
        var menuItem = search.results.menu_items[i];

        if(menuItem.description.toLowerCase().indexOf(searchTerm) !== -1){
          search.itemName = menuItem.name;
          search.itemShortName = menuItem.short_name;
          search.itemDesc = menuItem.description;

          search.addItem(
                        search.itemName,
                        search.itemShortName,
                        search.itemDesc);
        }else{
          search.noresult = "Nothing found";
        }
      }

    })
    .catch(function (error){
      console.log("Something went terribly wrong");
    });

  }

  search.addItem = function () {
    try{
        MenuItemsService.addItem(search.itemName, search.itemShortName, search.itemDesc);
    } catch (error) {
        search.errorMessage = error.message;
    }
  }

  search.removeItem = function (itemIndex) {
    MenuItemsService.removeItem(itemIndex);
  }

  search.removeAll = function(){
    MenuItemsService.removeAll();
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
    var item = {
      name: itemName,
      short_name: shortName,
      description: itemDesc
    };
    items.push(item);

  };

  service.removeItem = function (itemIndex){
    items.splice(itemIndex, 1);
  };

  service.removeAll = function() {
    items.length = 0;
  };

  service.getItems = function (){
    return items;
  };

}

})();
