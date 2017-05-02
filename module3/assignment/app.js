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

  var promise = MenuItemsService.getMenuSearchItem();

  promise.then(function (response){
    search.results = response.data;
    console.log("API response: ", search.results);
  })
  .catch(function (error){
    console.log("Something went terribly wrong");
  });

  search.searchMenuItems = function () {
    // found = searchMenu(search.results,searchTerm);
    searchTerm = $scope.searchItem;

    for(var i = 0; i < search.results.length; i++){
      // var description = search.results[i].description;
      console.log(search.results[i].name);
      if (description.toLowerCase().indexOf(searchTerm) !== -1){
        found.push(description);
      }
    }

    console.log("Found array: ", found);
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
