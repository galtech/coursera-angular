(function () {
'use strict';

angular.module('RestaurantMenu')
.controller('MainRestaurantMenuController', MainRestaurantMenuController);


MainRestaurantMenuController.$inject = ['RestaurantMenuService', 'items'];
function MainRestaurantMenuController(RestaurantMenuService, items) {
  var categorylist = this;

  categorylist.name = "";
  categorylist.short_name = "";
  categorylist.description = "";

  var promise = RestaurantMenuService.getMenuItems();

  promise.then(function (response){
    categorylist.items = response.data;
    console.log("API response: ", categorylist.items);

    for(var i = 0; i < categorylist.items.menu_items.length; i++){
      var menuItem = categorylist.items.menu_items[i];
        // console.log(menuItem);
        categorylist.name = menuItem.name;
        categorylist.short_name = menuItem.short_name;
        categorylist.description = menuItem.description;

        categorylist.addItem(
                      categorylist.name,
                      categorylist.short_name,
                      categorylist.description);
    }

    categorylist.items = items;

  })
  .catch(function (error){
    console.log("Something went terribly wrong");
  });

  categorylist.addItem = function () {
    try{
        RestaurantMenuService.addItem(
                              categorylist.name,
                              categorylist.short_name,
                              categorylist.description
                            );
    } catch (error) {
        categorylist.errorMessage = error.message;
    }
  }


}

})();
