/**
 * @ngdoc overview
 * @name pnpdeliverApp
 * @description
 * # pnpdeliverApp
 *
 * Main module of the application.
 */
angular
  .module('pnpdeliverApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'templates-app',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/partials/main.tpl.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/advanced', {
        templateUrl: 'deliver/partials/advanced.tpl.html',
        controller: 'DeliverCtrl',
        controllerAs: 'deliver'
      })
      .when('/simple', {
        templateUrl: 'deliver/partials/simple.tpl.html',
        controller: 'DeliverCtrl',
        controllerAs: 'deliver'
      })
      // Should be deprecated with a nice message
      .when('/test', {
        templateUrl: 'deliver/partials/advanced.tpl.html',
        controller: 'DeliverCtrl',
        controllerAs: 'deliver'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
