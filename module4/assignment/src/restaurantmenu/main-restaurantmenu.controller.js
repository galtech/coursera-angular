(function () {
'use strict';

angular.module('RestaurantMenu')
.controller('MainRestaurantMenuController', MainRestaurantMenuController);


MainRestaurantMenuController.$inject = ['RestaurantMenuService', 'items'];
function MainRestaurantMenuController(RestaurantMenuService, items) {
  var categorylist = this;
  categorylist.items = items;
}

})();
