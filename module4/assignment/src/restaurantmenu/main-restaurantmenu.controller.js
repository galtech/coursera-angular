(function () {
'use strict';

angular.module('RestaurantMenu')
.controller('MainRestaurantMenuController', MainRestaurantMenuController);


MainRestaurantMenuController.$inject = ['RestaurantMenuService', 'items'];
function MainRestaurantMenuController(RestaurantMenuService, items) {
  var categorylist = this;
  // categorylist.items = items;

  categorylist.itemName = "";
  categorylist.itemShortName = "";
  categorylist.itemDesc = "";

  var promise = RestaurantMenuService.getMenuItems();

  promise.then(function (response){
    categorylist.items = response.data;
    // console.log("API response: ", categorylist.items);

    for(var i = 0; i < categorylist.items.menu_items.length; i++){
      var menuItem = categorylist.items.menu_items[i];
        // console.log(menuItem);
        categorylist.itemName = menuItem.name;
        categorylist.itemShortName = menuItem.short_name;
        categorylist.itemDesc = menuItem.description;

        categorylist.addItem(
                      categorylist.itemName,
                      categorylist.itemShortName,
                      categorylist.itemDesc);
    }

  })
  .catch(function (error){
    console.log("Something went terribly wrong");
  });

  categorylist.addItem = function () {
    try{
        RestaurantMenuService.addItem(
                              categorylist.itemName,
                              categorylist.itemShortName,
                              categorylist.itemDesc
                            );
    } catch (error) {
        categorylist.errorMessage = error.message;
    }
  }


}

})();
