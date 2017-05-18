(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['$stateParams', 'items'];
function ItemDetailController($stateParams, items) {
  var itemDetail = this;
  var item = items[$stateParams.itemId];
  itemDetail.name = item.name;
  itemDetail.short_name = item.short_name;
  itemDetail.description = item.description;
}

})();
