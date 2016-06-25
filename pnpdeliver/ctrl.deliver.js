angular.module('PnpDeliver', [
  'ui.router'
])

.controller('MainCtrl', [
  '$scope',
  function($scope) {

}])

.controller('PagePrintCtrl', [
  '$scope',
  function($scope) {
    $scope.model = {
      page_format: 'A4'
    };
}])

;
