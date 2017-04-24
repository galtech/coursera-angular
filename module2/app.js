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
.filter('loves', LovesFilter)
.filter('truth', TruthFilter);

// angular.module('ParentController2',[])
// .controller('ParentController2',ParentController2);
// angular.module('ChildController2',[])
// .controller('ChildController2',ChildController2);

ModuleTwoController.$inject = ['$scope', 'lovesFilter','$timeout'];

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
