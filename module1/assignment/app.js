(function(){
'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.lunchitems = "";

    $scope.checkQty = function () {
      var emptyItemCount = 0;

      if ($scope.lunchitems == ""){
        $scope.result = "Please enter data first";
      }else{
        var items = $scope.lunchitems.split(',');

        // check for blank or empty items
        for (var i = 0; i < items.length; i++){
          if (items[i] == "" || items[i] == " "){
            emptyItemCount+=1;
          }
        }

          if (emptyItemCount > 0){
            $scope.result = "Blank items found, please check";
          }else{
            if (items.length <= 3){
              $scope.result = "Enjoy!";
              $scope.fontColor = "green";
              $scope.borderColor = "green";
            }else{
              $scope.result = "Too much!";
              $scope.fontColor = "red";
              $scope.borderColor = "red";
            }
          }

      }

    };

  }

})();
