(function () {
'use strict';

angular.module('RestaurantMenu')
.component('restaurantMenu', {
  templateUrl: 'src/restaurantMenu/templates/restaurantmenu.template.html',
  bindings: {
    items: '<'
  }
});

})();
