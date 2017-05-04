(function(){
'use strict';

angular.module('MenuSearchApp', [])
.controller('MenuSearchController', MenuSearchController)
.service('MenuItemsService', MenuItemsService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuSearchController.$inject = ['$scope', 'MenuItemsService'];
function MenuSearchController($scope, MenuItemsService){
  var search = this;

  $scope.found = [];

  var searchTerm = "";
  $scope.noresult = "";

  search.searchMenuItems = function () {

    searchTerm = $scope.searchItem;


    var promise = MenuItemsService.getMenuItems();

    promise.then(function (response){
      search.results = response.data;
      // console.log("API response: ", search.results);

      for (var i = 0; i < search.results.menu_items.length; i++){
        var description = search.results.menu_items[i].description;
        var item = search.results.menu_items[i].name;
        var shortName = search.results.menu_items[i].short_name;
        var menuItem = search.results.menu_items[i];

        if(description.toLowerCase().indexOf(searchTerm) !== -1){
          $scope.found.push(menuItem);
        }

      }

      if(found.length < 0 || searchTerm == ""){
        $scope.noresult = "Nothing found";
      }


    })
    .catch(function (error){
      console.log("Something went terribly wrong");
    });

  }

}

MenuItemsService.$inject = ['$http', 'ApiBasePath'];
function MenuItemsService($http, ApiBasePath){
  var service = this;

  service.getMenuItems = function (searchTerm){
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
