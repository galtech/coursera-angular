(function () {
'use strict';

angular.module('RestaurantMenu')
.component('restaurantMenu', {
  templateUrl: 'src/restaurantmenu/templates/restaurantmenu.template.html',
  bindings: {
    items: '<'
  }
});

})();
