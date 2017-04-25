(function(){
'use strict';

var shoppingList1 = [
  "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol",
  "Pepto Bismol (Chocolate flavour)", "Pepto Bismol (Cookie flavour)"
];

var shoppingList2 = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  }
];

angular.module('ModuleTwo', [])
.controller('ModuleTwoController', ModuleTwoController)
//.controller('ShoppingListAddController', ShoppingListAddController)
//.controller('ShoppingListShowController', ShoppingListShowController)
.controller('ShoppingListController1', ShoppingListController1)
//.controller('ShoppingListController2', ShoppingListController2)
//.factory('ShoppingListFactory', ShoppingListFactory)
//.service('ShoppingListService', ShoppingListService)
.provider('ShoppingListService', ShoppingListServiceProvider)
.config(Config)
.filter('loves', LovesFilter)
.filter('truth', TruthFilter);

Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider){
  ShoppingListServiceProvider.defaults.maxItems = 2;
}

// angular.module('ShoppingList', [])
// .controller('ShoppingListAddController', ShoppingListAddController);

// angular.module('ParentController2',[])
// .controller('ParentController2',ParentController2);
// angular.module('ChildController2',[])
// .controller('ChildController2',ChildController2);

ModuleTwoController.$inject = ['$scope', 'lovesFilter','$timeout'];
//ShoppingListAddController.$inject = ['ShoppingListService'];
ShoppingListController1.$inject = ['ShoppingListService'];
//ShoppingListController2.$inject = ['ShoppingListFactory'];

function ModuleTwoController($scope, lovesFilter,$timeout){

  $scope.onceCounter = 0;
  $scope.counter = 0;
  $scope.name = "Peter";
  $scope.firstName = "Peter";
  $scope.shoppingList1 = shoppingList1;
  $scope.shoppingList2 = shoppingList2;
  // $scope.fullName = "";

  $scope.sayMessage = function() {
      var msg = "Peter likes to dance.";
      //var output = $filter('uppercase')(msg);
      return msg;
  };

  $scope.sayLovesMessage = function() {
    var msg = "Peter likes to dance.";
    msg = lovesFilter(msg);
    return msg;
  };

  $scope.showNumberOfWatchers = function () {
    console.log('# of watchers: ', $scope.$$watchersCount);
  };

  $scope.setFullName = function () {
    $scope.fullName = $scope.firstName + " " + "Heylin";
  };

  $scope.logFirstName = function () {
    console.log("First name is: ", $scope.firstName);
  };

  $scope.logFullName = function () {
    console.log("Full name is: ", $scope.fullName);
  };

  $scope.countOnce = function () {
    $scope.onceCounter = 1;
  };

  $scope.upCounter = function () {
    $timeout(function (){
      $scope.counter++;
      console.log("Counter incremented!");
    }, 2000);
  };

  $scope.addToList = function (){
    var newItem = {
      name: $scope.newItemName,
      quantity: $scope.newItemQuantity
    };

    $scope.shoppingList2.push(newItem);
  };

  // $scope.upCounter = function () {
  //   setTimeout(function(){
  //       $scope.$apply(function(){
  //         $scope.counter++;
  //         console.log("Counter incremented!");
  //       });
  //   }, 2000);
  //
  // };

  // $scope.upCounter = function () {
  //   setTimeout(function(){
  //       $scope.counter++;
  //       console.log("Counter incremented!");
  //       $scope.$digest();
  //   }, 2000);
  //
  // };

  // $scope.$watch(function (){
  //   console.log('Digest Loop Fired!');
  // });

  // $scope.$watch('onceCounter', function (newValue, oldValue){
  //   console.log('onceCounter old value: ', oldValue);
  //   console.log('onceCounter new value: ', newValue);
  // });
  //
  // $scope.$watch('counter', function (newValue, oldValue){
  //   console.log('counter old value: ', oldValue);
  //   console.log('counter new value: ', newValue);
  // });

}

// using a factory instead

// function ShoppingListAddController(ShoppingListService){
//   var itemAdder = this;
//
//   itemAdder.itemName = "";
//   itemAdder.itemQuantity = "";
//
//   itemAdder.addItem = function () {
//     ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
//   }
// }
//
// function ShoppingListShowController(ShoppingListService){
//   var showList = this;
//
//   showList.items = ShoppingListService.getItems();
//
//   showList.removeItem = function (itemIndex) {
//     ShoppingListService.removeItem(itemIndex);
//   };
// }

  function ShoppingListController1(ShoppingListService){
    var list1 = this;

    // use factory to create new shopping list service
    //var shoppingList = ShoppingListFactory();

    list1.items = ShoppingListService.getItems();

    list1.itemName = "";
    list1.itemQuantity = "";

    list1.addItem = function () {
      try{
          ShoppingListService.addItem(list1.itemName, list1.itemQuantity);
      } catch (error) {
          list1.errorMessage = error.message;
      }
    }

    list1.removeItem = function (itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    }
  }

// function ShoppingListController2(ShoppingListFactory){
//   var list2 = this;
//
//   // use factory to create new shopping list service
//   var shoppingList = ShoppingListFactory(3);
//
//   list2.items = shoppingList.getItems();
//
//   list2.itemName = "";
//   list2.itemQuantity = "";
//
//   list2.addItem = function () {
//     try{
//       shoppingList.addItem(list2.itemName, list2.itemQuantity);
//     } catch (error) {
//       list2.errorMessage = error.message;
//     }
//   }
//
//   list2.removeItem = function (itemIndex) {
//     shoppingList.removeItem(itemIndex);
//   }
// }
//
// function ShoppingListFactory() {
//   var factory = function (maxItems){
//     return new ShoppingListService(maxItems);
//   };
//
//   return factory;
// }

function ShoppingListService(maxItems) {
  var service = this;

  // list of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if((maxItems === undefined) ||
      (maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        items.push(item);
      }else{
        throw new Error("Max items (" + maxItems + ") reached.");
      }
  };

  service.removeItem = function (itemIndex){
    items.splice(itemIndex, 1);
  };

  service.getItems = function (){
    return items;
  };
}

function ShoppingListServiceProvider(){
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}
// commenting out service while testing the use of a factory

// function ShoppingListService() {
//     var service = this;
//
//     // List of shopping items
//     var items = [];
//
//     service.addItem = function(itemName, quantity) {
//       var item = {
//         name: itemName,
//         quantity: quantity
//       };
//       items.push(item);
//     };
//
//     service.removeItem = function (itemIndex) {
//         items.splice(itemIndex, 1);
//     };
//
//     service.getItems = function () {
//       return items;
//     };
// };

// function ParentController2($scope){
//   var parent = this;
//   parent.value = 1;
// }
// ChildController2.$inject = ['$scope'];
// function ChildController2($scope){
//   var child = this;
//   child.value = 5;
//   console.log("ChildController2 $scope: ", $scope);
// }

function LovesFilter() {
  return function (input) {
    input = input || "";
    input = input.replace("likes", "loves");
    return input;
  };
}

function TruthFilter(){
  return function(input, target, replace){
    input = input || "";
    input = input.replace(target, replace);
    return input;
  };
}

})();
