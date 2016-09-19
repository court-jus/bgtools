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
    'gettext',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/partials/main.tpl.html',
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
  })
  .run(function(gettextCatalog) {
    gettextCatalog.setCurrentLanguage('fr_FR');
    gettextCatalog.debug = true;
  })

;
