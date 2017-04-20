(function(){
'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.lunchitems = "";

    // empty items included in count
    $scope.checkQty = function () {
      if ($scope.lunchitems == ""){
        $scope.result = "Please enter data first";
      }else{
        var items = $scope.lunchitems.split(',');
        if (items.length <= 3){
          $scope.result = "Enjoy!";
        }else{
          $scope.result = "Too much!";
        }

      }
        // for (var i = 0; i < items.length; i++){ // empty items included in count
        //   if (items[i] == ""){
        //     console.log('item: '+items[i]+ ' is empty');
        //   }else {
        //     console.log(items[i]);
        //   }
        // }

    };

  }

})();
