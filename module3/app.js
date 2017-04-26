(function(){
'use strict';

angular.module('ModuleThree', [])
// .controller('MenuCategoriesController', MenuCategoriesController)
// .service('MenuCategoriesService', MenuCategoriesService);
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService);

// MenuCategoriesController.$inject = ['MenuCategoriesService'];
// function MenuCategoriesController(MenuCategoriesService){
//   var menu = this;
//
//   var promise = MenuCategoriesService.getMenuCategories();
//
//   promise.then(function (response){
//     menu.categories = response.data;
//   })
//   .catch(function (error){
//     console.log("Something went terribly wrong");
//   });
// }
//
// MenuCategoriesService.$inject = ['$http'];
// function MenuCategoriesService($http){
//   var service = this;
//
//   service.getMenuCategories = function (){
//     var response = $http({
//       method: "GET",
//       url: ("http://davids-restaurant.herokuapp.com/categories.json")
//     });
//
//     return response;
//   };
// }

ShoppingListService.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService){
  var list = this;

  list.items = ShoppingListService.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
      ShoppingListService.addItem(list.itemName, list.itemQuantity);
  };

  list.removeItem = function(itemIndex){
    ShoppingListService.removeItem(itemIndex);
  };
}

ShoppingListService.$inject = ['$q','WeightLossFilterService'];
function ShoppingListService($q, WeightLossFilterService){
  var service = this;

  // list of shopping items
  var items = [];

  service.addItem = function (name, quantity){
    var namePromise = WeightLossFilterService.checkName(name);
    var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

    $q.all([namePromise, quantityPromise]).
    then(function (respone){
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    })
    .catch(function (errorResponse){
        console.log(errorResponse.message);
    });

  };



// var promise = WeightLossFilterService.checkName(name);
  // promise
  // .then(function (response){
  //   return WeightLossFilterService.checkQuantity(quantity);
  // })
  // .then(function (response){
  //   var item = {
  //     name: name,
  //     quantity: quantity
  //   };
  //   items.push(item);
  // })
  // .catch(function (errorResponse){
  //   console.log(errorResponse.message);
  // });

  //   promise.then(function(response){
  //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
  //
  //     nextPromise.then(function(result){
  //         var item = {
  //           name: name,
  //           quantity: quantity
  //         };
  //         items.push(item);
  //     }, function (errorResponse){
  //       console.log(errorResponse.message);
  //     });
  //   }, function (errorResponse){
  //     console.log(errorResponse.message);
  //   });
  // };

    // var namePromise = WeightLossFilterService.checkName(name);
    // var quantityPromise = WeightLossFilterService.checkQuantity(quantity);
    //
    // $q.all([namePromise, quantityPromise]).
    // then(function (respone){
    //   var item = {
    //     name: name,
    //     quantity: quantity
    //   };
    //   items.push(items);
    // })
    // .catch(function (errorResponse){
    //     console.log(errorResponse.message);
    // });

  service.removeItem = function (itemIndex){
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };

}

WeightLossFilterService.$inject = ['$q','$timeout'];
function WeightLossFilterService($q, $timeout){
  var service = this;

  service.checkName = function (name) {
      var deferred = $q.defer();

      var result = {
        message: ""
      };


    $timeout(function(){
      // check for cookies
      if(name.toLowerCase().indexOf('cookie') === -1){
        deferred.resolve(result);
      }else{
        result.message = "Stay away from cookies, Yaakov!";
        deferred.reject(result);
      }
    }, 3000);

    return deferred.promise;
  };

  service.checkQuantity = function (quantity){
    var deferred = $q.defer();

    var result = {
      message: ""
    };


  $timeout(function(){
      // check for too many boxes
      if(quantity < 6){
        deferred.resolve(result);
      }else{
        result.message = "That's too much, Yaakov!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
}

})();
