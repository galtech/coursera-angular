(function(){
'use strict';

angular.module('ModuleTwo', [])
.controller('ModuleTwoController', ModuleTwoController)
.filter('loves', LovesFilter)
.filter('truth', TruthFilter);

ModuleTwoController.$inject = ['$scope', 'lovesFilter','$timeout'];

function ModuleTwoController($scope, lovesFilter,$timeout){

  $scope.onceCounter = 0;
  $scope.counter = 0;
  $scope.name = "Peter";
  $scope.firstName = "Peter";
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
