/**
 * @ngdoc function
 * @name pnpdeliverApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the pnpdeliverApp
 */
angular.module('pnpdeliverApp')
  .controller('TestCtrl', function ($scope, _) {
    $scope.print = function () {
      window.print();
    };
    $scope.model = {
      pageFormat: 'A4',
      imagesUrls: 'https://thumbs.dreamstime.com/x/playing-card-back-side-60x90-mm-17679108.jpg\nhttp://www.jimknapp.com/Cards/Non-Bicycle_files/image002.jpg',
      pages: []
    };
    $scope.$watch('model.imagesUrls', function(n) {
      if (angular.isUndefined(n)) {
        return true;
      }
      $scope.model.pages = [];
      var currentPage = [];
      _.each(n.split('\n'), function(imageUrl) {
        if (currentPage.length === 9) {
          $scope.model.pages.push({
            cards: currentPage
          });
          currentPage = [];
        }
        currentPage.push(imageUrl);
      });
      if (currentPage.length > 0) {
        while (currentPage.length < 9) {
          currentPage.push('http://orig14.deviantart.net/6021/f/2012/302/5/c/mlp__cwf_card_back_by_noonebahtim-d5je44f.png');
        }
        $scope.model.pages.push({
          cards: currentPage
        });
      }
    });
  });
