(function(){
'use strict';

  angular.module('NameCalculator', [])

  .controller('NameCalculatorController', function($scope, $filter) {
    // logic here
    $scope.name = "";
    $scope.totalValue = 0;

    $scope.displayNumeric = function() {
      var totalNameValue = calNumForStr($scope.name); // get the total value
      $scope.totalValue = totalNameValue;
    };

    $scope.upper = function () {
      var upCase = $filter('uppercase');
      $scope.name = upCase($scope.name);
    };

    function calNumForStr(string) {
        var totalStringValue = 0;
        for (var i = 0; i < string.length; i++) {
          totalStringValue += string.charCodeAt(i);
        }

        return totalStringValue;
    };

  });

})();
