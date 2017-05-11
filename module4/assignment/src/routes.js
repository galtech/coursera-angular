(function () {
'use strict';

angular.module('RestaurantMenu')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/restaurantmenu/templates/home.template.html'
  })

  // Categories
  .state('categoryList', {
    url: '/category-list',
    templateUrl: 'src/restaurantmenu/templates/main-restaurantmenu.template.html',
    controller: 'MainRestaurantMenuController as categoryList',
    resolve: {
      items: ['RestaurantMenuService', function (RestaurantMenuService) {
        return RestaurantMenuService.getItems();
      }]
    }
  })

  // items list
  .state('categoryList.itemDetail', {
    url: '/item-detail/{itemId}',
    templateUrl: 'src/restaurantmenu/templates/item-detail.template.html',
    controller: "ItemDetailController as itemDetail"
  });

}

})();
