(function(){
'use strict';

angular.module('MenuSearchApp', [])
.controller('MenuSearchController', MenuSearchController)
.service('MenuItemsService', MenuItemsService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuSearchController.$inject = ['MenuItemsService'];
function MenuSearchController(MenuItemsService){
  var search = this;

  var found = [];
  var searchTerm = search.searchItem;

  var promise = MenuItemsService.getMenuSearchItem(searchTerm);

  promise.then(function (response){
    search.results = response.data;
    console.log(search.results);
  })
  .catch(function (error){
    console.log("Something went terribly wrong");
  });

  search.searchMenuItems = function (results) {

  }
}

MenuItemsService.$inject = ['$http', 'ApiBasePath'];
function MenuItemsService($http, ApiBasePath){
  var service = this;

  service.getMenuSearchItem = function (searchTerm){
    var response = $http({
      method: "GET",
      url: (ApiBasePath+"/menu_items.json"),
    });

    return response;
  };
}

function searchMenu(results){
  for(var i = 0; i < results.items.length; i++){
    var name = results.items[i].name;
    if (name.toLowerCase().indexOf("cookie") !== -1){
      // return true;
    }
  }

  // return false;
}

})();
