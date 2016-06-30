angular.module('pnpdeliverApp')

.factory('_', function ($window) {
  if (!$window._) {
    console.error('Lodash unavailable');
  }
  return $window._;
})

.factory('saveAs', function ($window) {
  if (!$window.saveAs) {
    console.error('FileSaver unavailable');
  }
  return $window.saveAs;
})


;
