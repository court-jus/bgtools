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
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'templates-app'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/partials/main.tpl.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/home', {
        templateUrl: 'home/partials/home.tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/test', {
        templateUrl: 'test/partials/test.tpl.html',
        controller: 'TestCtrl',
        controllerAs: 'test'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
