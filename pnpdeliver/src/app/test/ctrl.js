/**
 * @ngdoc function
 * @name pnpdeliverApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the pnpdeliverApp
 */
angular.module('pnpdeliverApp')
  .controller('TestCtrl', function (
    $scope, _,
    Exemples
  ) {
    $scope.print = function () {
      window.print();
    };
    $scope.model = {
      pageFormat: 'A4',
      rows: 3,
      cols: 3,
      cardWidth: 2.5,
      cardHeight: 3.5,
      hMargin: 0,
      vMargin: 0,
      imageWidth: 2.5,
      imageHeight: 3.5,
      imageHShift: 0,
      imageVShift: 0,
      decks: [],
      pages: []
    };
    $scope.imagesUrls = '';
    $scope.addCard = function(card) {
      var lastPage,
          currentPage = [],
          cardsPerPage = ($scope.model.rows * $scope.model.cols),
          push = true;
      if ($scope.model.pages.length > 0) {
        lastPage = $scope.model.pages[$scope.model.pages.length - 1];
        if (lastPage.length < cardsPerPage) {
          currentPage = lastPage;
          push = false;
        }
      }
      currentPage.push(card);
      if (push) {
        $scope.model.pages.push(currentPage);
      }
    };
    $scope.completePage = function(card) {
      var lastPage,
          cardsPerPage = ($scope.model.rows * $scope.model.cols);
      if ($scope.model.pages.length > 0) {
        lastPage = $scope.model.pages[$scope.model.pages.length - 1];
        while((lastPage.length < cardsPerPage) &&
              (lastPage.length > 0)) {
          lastPage.push(card);
        }
      }
    };
    $scope.addUrls = function() {
      var urls = [];
      _.each($scope.imagesUrls.split('\n'), function(imageUrl) {
        if (imageUrl !== '') {
          urls.push(imageUrl);
        }
      });
      console.log(urls);
      if (urls.length > 0) {
        $scope.model.decks.push({
          name: 'New deck',
          commonCardback: 'assets/images/white.png',
          cards: _.map(urls, function(url) {
            return {
              imageUrl: url,
              count: 1
            };
          })
        });
      }
    };
    $scope.$watch('model', function(n) {
      if (angular.isUndefined(n)) {
        return;
      }
      $scope.model.pages = [];
      var currentPage = [],
          defaultCard = {
            imageUrl: 'assets/images/white.png',
            cardBack: 'assets/images/white.png'
          };
      _.each(n.decks, function(deck) {
        _.each(deck.cards, function(card) {
          if (!card.cardBack) {
            card.cardBack = deck.commonCardback;
          }
          for(var i = 0; i < (card.count || 1); i++) {
            $scope.addCard(card);
          }
        });
      });
      $scope.completePage(defaultCard);
      $scope.downloadablejson = encodeURIComponent(JSON.stringify($scope.model));
    }, true);
  })
  .service('Exemples', function() {
    return {
      hope: [{
        name: 'Technology cards',
        commonCardback: 'assets/images/white.png',
        cards: [{
          imageUrl: 'https://lh3.googleusercontent.com/yqS9KsQmKnmsePr4wUPghmuJLYYshVUNz5oXTT5h-LifxC-plld8eXKupYt8L_uWcbD4GJQ26EisnmssJQ8JDJFW655KlnVs3dlcmapFLvQcLSC92ALl7ZvTY3lnsDhTEFNkg3eQXObrkEnuYkTXp8zxUcNSlLYgfUDnxtYcrZbWY52g4l_yNPHAxsyiTzHfDYkRf4FJjPDfCiTAFv9nU5eJBmZyW2uhM4Fiq5_I802Hi-9F4a7py2rlmfXHFx0fflUdQdCJegFa_uQ_VwcCNoaadC_Dz5fXbHDkTWNQhYEEAPGoy3TnYbZscLhaX9VYVsZ1tzG5-zPEoo-myis3hx0WUJ6XRWBcfdifM4GYCkFW7vamWI6gx7i9zvkhiy9VULr2NUHE5BhklB25hkfoL-zmrVHBOFQj8MXqJWMGgkS7aYIzoIG1hfS9DO-c9eJ1J_XdvnJXeHuXKNY5A4qpLx_SMgNLkVsF5l-LHknRmWDd_aYD9s96iHd6BCPv3Lbk9tmMOEbyuULlHakcqbZV721-joRxU0-YcT9OY5w_fQXT0w7299UGTgOhDh99L89pWG5agRKNtyMmguo5XFEXJtyVpGyyoLxc=w672-h940-no',
          count: 6
        }, {
          imageUrl: 'https://lh3.googleusercontent.com/7zYYD3uOtWHZyD4Z3uYz5Rhqijwj4YubWOKEAYZiPmb_0vB2QvGfTXIEl2Bcky9vUikSR0rPQyb8UrnfZ0Qb7-mw6mys_DyYnzzDT5OvWo77_n2tcEFTgTQRNg0KlSNMkTITlmjx4k_AXlz1-XZ4U_ADH8Fk0kCSa4RRsjtRULX8Mi83k5z4WpQQi0WQ15Q3wzbOO_49XWvrvm50KHr2ywgWi0WaK0waYP5DdjY1tYqKwy5jy8rM4-rs9D-jt5J0Z2zOK_UK9DF3CRZCU60EvnG7ZqcIsuylcfXWKpfbCvBmuxL7t62of13twgypTreT6gMt2zmXLKMvtkwASNI-pDlXkqq8PRsx-i0p8OOwfYdq9o-tPaOz9agNiIDi6kAffYIiMl4lYhIBpvb6EO7xHP4TZBsl0UYGBfEhxQiLgwpDrDdNyE4tu-KRpBn7ldraM2tIl2BpfnZqrBLuHFES5-bo463b401uaqPHEFmbDESkB1KwVLMHCLJ58saOTwCFj8CNsoy3onJ5x7a_ndYmYBgw00YhUbAxQ5G1TqpxjPPUeCx0WoWhARg1XRpyQjLcF23Ri-fsPCiYdm-8RFsu47mqxXO4NoUg=w672-h940-no',
          count: 6
        }]
      }]
    };
  })


;
