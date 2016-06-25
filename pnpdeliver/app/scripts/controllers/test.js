'use strict';

/**
 * @ngdoc function
 * @name pnpdeliverApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the pnpdeliverApp
 */
angular.module('pnpdeliverApp')
  .controller('TestCtrl', function ($scope) {
    $scope.print = function () {
      window.print();
    };
    $scope.model = {
      page_format: 'A4',
      images_urls: 'https://thumbs.dreamstime.com/x/playing-card-back-side-60x90-mm-17679108.jpg\nhttp://www.jimknapp.com/Cards/Non-Bicycle_files/image002.jpg',
      pages: []
    };
    $scope.$watch('model.images_urls', function(n, o) {
      if (angular.isUndefined(n)) {
        return true;
      }
      $scope.model.pages = [];
      var current_page = [];
      _.each(n.split('\n'), function(image_url) {
        if (current_page.length === 9) {
          $scope.model.pages.push({
            cards: current_page
          });
          current_page = [];
        }
        current_page.push(image_url);
      });
      if (current_page.length > 0) {
        while (current_page.length < 9) {
          current_page.push('http://orig14.deviantart.net/6021/f/2012/302/5/c/mlp__cwf_card_back_by_noonebahtim-d5je44f.png');
        }
        $scope.model.pages.push({
          cards: current_page
        });
      }
    });
  });
