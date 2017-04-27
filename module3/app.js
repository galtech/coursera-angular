(function(){
'use strict';

angular.module('ModuleThree', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
// .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.factory('ShoppingListFactory', ShoppingListFactory)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('listItemDescription', listItemDescription)
.directive('listItem', listItem)
.directive('shoppingList', ShoppingListDirective);
// .controller('ShoppingListController', ShoppingListController)
// .service('ShoppingListService', ShoppingListService)
// .service('WeightLossFilterService', WeightLossFilterService);

MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService){
  var menu = this;

  var promise = MenuCategoriesService.getMenuCategories();

  promise.then(function (response){
    menu.categories = response.data;
  })
  .catch(function (error){
    console.log("Something went terribly wrong");
  });

  menu.logMenuItems = function (shortName){
    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function(response){
      console.log(response.data);
    })
    .catch(function(error){
      console.log(error);
    })
  };
}



// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  }

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
    list.title = origTitle + " (" + list.items.length + " items )";
  };
}


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory(3);

  list.items = shoppingList.getItems();
  list.title = "Shopping List #2 ( " + list.items.length + " out of max 3 items)";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    try {
      shoppingList.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
    list.title = "Shopping List #2 ( " + list.items.length + " out of max 3 items)";

  };

  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
    list.title = "Shopping List #2 ( " + list.items.length + " out of max 3 items)";
  };
}

function ShoppingListDirectiveController(){
  var list = this;

  list.cookiesInList = function () {
    for(var i = 0; i < list.items.length; i++){
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1){
        return true;
      }
    }

    return false;
  };
}

// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

function listItemDescription(){
  var ddo = {
    template: '{{item.quantity}} of {{item.name}}'
  };

  return ddo;
}

function listItem(){
  var ddo = {
    restrict: 'E',
    templateUrl: 'listItem.html'
  };

  return ddo;
}

function ShoppingListDirective(){
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      items: '<',
      title: '@title'
    },
    //controller: 'ShoppingListDirectiveController as list',
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}//list: '=myList',


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath){
  var service = this;

  service.getMenuCategories = function (){
    var response = $http({
      method: "GET",
      url: (ApiBasePath+"/categories.json")
    });

    return response;
  };

  service.getMenuForCategory = function (shortName){
    var response = $http({
      method: "GET",
      url: (ApiBasePath+"/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };
}

// ShoppingListService.$inject = ['ShoppingListService'];
// function ShoppingListController(ShoppingListService){
//   var list = this;
//
//   list.items = ShoppingListService.getItems();
//
//   list.itemName = "";
//   list.itemQuantity = "";
//
//   list.addItem = function () {
//       ShoppingListService.addItem(list.itemName, list.itemQuantity);
//   };
//
//   list.removeItem = function(itemIndex){
//     ShoppingListService.removeItem(itemIndex);
//   };
// }
//
// ShoppingListService.$inject = ['$q','WeightLossFilterService'];
// function ShoppingListService($q, WeightLossFilterService){
//   var service = this;
//
//   // list of shopping items
//   var items = [];
//
//   service.addItem = function (name, quantity){
//     var namePromise = WeightLossFilterService.checkName(name);
//     var quantityPromise = WeightLossFilterService.checkQuantity(quantity);
//
//     $q.all([namePromise, quantityPromise]).
//     then(function (respone){
//       var item = {
//         name: name,
//         quantity: quantity
//       };
//       items.push(item);
//     })
//     .catch(function (errorResponse){
//         console.log(errorResponse.message);
//     });
//
//   };
//
//
//
// // var promise = WeightLossFilterService.checkName(name);
//   // promise
//   // .then(function (response){
//   //   return WeightLossFilterService.checkQuantity(quantity);
//   // })
//   // .then(function (response){
//   //   var item = {
//   //     name: name,
//   //     quantity: quantity
//   //   };
//   //   items.push(item);
//   // })
//   // .catch(function (errorResponse){
//   //   console.log(errorResponse.message);
//   // });
//
//   //   promise.then(function(response){
//   //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
//   //
//   //     nextPromise.then(function(result){
//   //         var item = {
//   //           name: name,
//   //           quantity: quantity
//   //         };
//   //         items.push(item);
//   //     }, function (errorResponse){
//   //       console.log(errorResponse.message);
//   //     });
//   //   }, function (errorResponse){
//   //     console.log(errorResponse.message);
//   //   });
//   // };
//
//     // var namePromise = WeightLossFilterService.checkName(name);
//     // var quantityPromise = WeightLossFilterService.checkQuantity(quantity);
//     //
//     // $q.all([namePromise, quantityPromise]).
//     // then(function (respone){
//     //   var item = {
//     //     name: name,
//     //     quantity: quantity
//     //   };
//     //   items.push(items);
//     // })
//     // .catch(function (errorResponse){
//     //     console.log(errorResponse.message);
//     // });
//
//   service.removeItem = function (itemIndex){
//     items.splice(itemIndex, 1);
//   };
//
//   service.getItems = function () {
//     return items;
//   };
//
// }
//
// WeightLossFilterService.$inject = ['$q','$timeout'];
// function WeightLossFilterService($q, $timeout){
//   var service = this;
//
//   service.checkName = function (name) {
//       var deferred = $q.defer();
//
//       var result = {
//         message: ""
//       };
//
//
//     $timeout(function(){
//       // check for cookies
//       if(name.toLowerCase().indexOf('cookie') === -1){
//         deferred.resolve(result);
//       }else{
//         result.message = "Stay away from cookies, Yaakov!";
//         deferred.reject(result);
//       }
//     }, 3000);
//
//     return deferred.promise;
//   };
//
//   service.checkQuantity = function (quantity){
//     var deferred = $q.defer();
//
//     var result = {
//       message: ""
//     };
//
//
//   $timeout(function(){
//       // check for too many boxes
//       if(quantity < 6){
//         deferred.resolve(result);
//       }else{
//         result.message = "That's too much, Yaakov!";
//         deferred.reject(result);
//       }
//     }, 1000);
//
//     return deferred.promise;
//   };
// }

})();
