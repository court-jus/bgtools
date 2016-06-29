angular.module('pnpdeliverApp')
  .factory('_', function ($window) {
    if (!$window._) {
      console.error('Lodash unavailable');
    }
    return $window._;
});
