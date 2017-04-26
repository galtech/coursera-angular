(function(){
'use strict';

var items = [
  {
    name: 'Wine',
    quantity: '6 bottles'
  },
  {
    name: 'Beer',
    quantity: '24 cans'
  },
  {
    name: 'Eggs',
    quantity: '1 carton'
  },
  {
    name: 'Bread',
    quantity: '1 pan'
  }
];

angular.module('ShoppingChecklistApp', [])
.controller('ShoppinglistController', ShoppinglistController)
.controller('ChecklistController', ChecklistController)
.service('ShoppingListService', ShoppingListService);
// .service('CheckListService', CheckListService);

ShoppinglistController.$inject = ['ShoppingListService'];
function ShoppinglistController(ShoppingListService){
  var shoppinglist = this;

  shoppinglist.items = ShoppingListService.getItems();

  shoppinglist.checkOff = function (itemIndex) {
    ShoppingListService.transferToBoughtList(itemIndex);
  }
}

ChecklistController.$inject = ['ShoppingListService'];
function ChecklistController(ShoppingListService){
  var checklist = this;

  checklist.items = ShoppingListService.getChecklist();
}

function ShoppingListService(){
  var shoppingservice = this;

  var shoppingList = items;
  var checkList = [];

  shoppingservice.getItems = function () {
    return shoppingList;
  };

  shoppingservice.getOneItem = function (itemIndex) {
    return items[itemIndex];
  };

  shoppingservice.getChecklist = function () {
    return checkList;
  };

  shoppingservice.transferToBoughtList = function (itemIndex) {

    var item = {
      name: shoppingservice.getOneItem(itemIndex).name,
      quantity: shoppingservice.getOneItem(itemIndex).quantity
    };
    // add item to bought list
    checkList.push(item);

    // remove item from shopping list (check off item)
    shoppingList.splice(itemIndex, 1);
  };

}




})();
