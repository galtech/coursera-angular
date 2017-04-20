(function(){
'use strict';

  angular.module('NameCalculator', [] )
  .controller('NameCalculatorController', NameCalculatorController);

  NameCalculatorController.$inject = ['$scope', '$filter'];

  function NameCalculatorController($scope, $filter) {
    $scope.name = "";
    $scope.totalValue = 0;
    $scope.state = "hungry";

    $scope.displayNumeric = function() {
      var totalNameValue = calNumForStr($scope.name); // get the total value
      $scope.totalValue = totalNameValue;
    };

    $scope.upper = function () {
      var upCase = $filter('uppercase');
      $scope.name = upCase($scope.name);
    };

    $scope.feedPerson = function () {
      $scope.state = "fed";
    };

    function calNumForStr(string) {
        var totalStringValue = 0;
        for (var i = 0; i < string.length; i++) {
          totalStringValue += string.charCodeAt(i);
        }

        return totalStringValue;
    };

  }

})();
