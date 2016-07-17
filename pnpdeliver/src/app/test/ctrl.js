angular.module('pnpdeliverApp')
  .controller('TestCtrl', function (
    $scope, $http, $routeParams,
    _, saveAs,
    Exemples
  ) {
    $scope.print = function () {
      window.print();
    };
    $scope.model = {
      version: '0.0.5',
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
      backgroundColor: {
        front: 'transparent',
        back: 'transparent'
      },
      decks: [],
      pages: [],
      cropmarks: {
        showOnFront: true,
        showOnBack: false,
        thickness: 0.02,
        margin: 0.01
      }
    };
    $scope.othermodel = {
      distantJson: (
        $routeParams.load ?
        $routeParams.load :
        ''
      ),
      allCardsWidth: 0,
      allCardsHeight: 0,
      topMargin: 0,
      leftMargin: 0
    };
    $scope.imagesUrls = '';
    $scope.addCard = function(card) {
      var lastPage,
          currentPage = [],
          cardsPerPage = ($scope.model.rows * $scope.model.cols),
          push = true;
      if ($scope.model.backFormat === 'sidebyside') {
        cardsPerPage = cardsPerPage / 2;
      }
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
      if ($scope.model.backFormat === 'sidebyside') {
        cardsPerPage = cardsPerPage / 2;
      }
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
      if (urls.length > 0) {
        $scope.model.decks.push({
          name: 'New deck',
          commonCardback: 'assets/images/transparent.png',
          cards: _.map(urls, function(url) {
            return {
              imageUrl: url,
              count: 1
            };
          })
        });
      }
    };
    $scope.setAllCards = function(deck) {
      _.each(deck.cards, function(card) {
        card.count = null;
        card.cardBack = null;
      });
    };
    $scope.loadJson = function() {
      if (!$scope.othermodel.distantJson) {
        return;
      }
      $http.get($scope.othermodel.distantJson).success(function(loaded) {
        if ($scope.model.version === loaded.version) {
          // TODO : tester
          $scope.model = loaded;
        } else {
          alert('Format non reconnu (version ' + loaded.version + ').');
        }
      });
    };
    $scope.saveJson = function() {
      saveAs(
        new Blob([angular.toJson($scope.model)],
                 {type: 'application/json;charset=utf-8'}),
        'mydeck.json'
      );
    };
    $scope.range = function(num) {
      return new Array(num);
    };
    if ($scope.othermodel.distantJson) {
      $scope.loadJson();
    }
    $scope.$watch('model', function(n, o) {
      if (angular.isUndefined(n)) {
        return;
      }
      if (((n.backFormat === 'sidebyside' && o.backFormat !== 'sidebyside') ||
           (n.backFormat !== 'sidebyside' && o.backFormat === 'sidebyside')) &&
          (angular.isDefined(o.backFormat))) {
        console.log(n.backFormat, o.backFormat);
        var t = $scope.model.cardWidth;
        $scope.model.cardWidth = $scope.model.cardHeight;
        $scope.model.cardHeight = t;
        $scope.model.imageHShift += ($scope.model.cardWidth - $scope.model.cardHeight) / 2;
        $scope.model.imageVShift += ($scope.model.cardHeight - $scope.model.cardWidth) / 2;
      }
      $scope.model.pages = [];
      var currentPage = [],
          defaultCard = {
            imageUrl: 'assets/images/transparent.png',
            cardBack: 'assets/images/transparent.png'
          };
      _.each(n.decks, function(deck) {
        _.each(deck.cards, function(card) {
          if (!card.cardBack) {
            card.cardBack = deck.commonCardback;
          }
          for(var i = 0; i < (card.count || deck.commoncardCount); i++) {
            $scope.addCard(card);
          }
        });
      });
      $scope.completePage(defaultCard);
      var pageWidth = ($scope.model.pageFormat === 'A4' ? 8.26772 : 8.5),
          pageHeight = ($scope.model.pageFormat === 'A4' ? 11.6929 : 11);
      $scope.othermodel.fullcardWidth = $scope.model.cardWidth + $scope.model.hMargin * 2;
      $scope.othermodel.fullcardHeight = $scope.model.cardHeight + $scope.model.vMargin * 2;
      $scope.othermodel.allCardsWidth = $scope.othermodel.fullcardWidth * $scope.model.cols;
      $scope.othermodel.allCardsHeight = $scope.othermodel.fullcardHeight * $scope.model.rows;
      $scope.othermodel.leftMargin = (pageWidth - $scope.othermodel.allCardsWidth) / 2 + $scope.model.hMargin;
      $scope.othermodel.topMargin = (pageHeight - $scope.othermodel.allCardsHeight) / 2 + $scope.model.vMargin;
    }, true);
  })
  .service('Exemples', function() {
    return {
      hope: [{
        name: 'Technology cards',
        commonCardback: 'assets/images/transparent.png',
        cards: [{
          imageUrl: 'https://lh3.googleusercontent.com/yqS9KsQmKnmsePr4wUPghmuJLYYshVUNz5oXTT5h-LifxC-plld8eXKupYt8L_uWcbD4GJQ26EisnmssJQ8JDJFW655KlnVs3dlcmapFLvQcLSC92ALl7ZvTY3lnsDhTEFNkg3eQXObrkEnuYkTXp8zxUcNSlLYgfUDnxtYcrZbWY52g4l_yNPHAxsyiTzHfDYkRf4FJjPDfCiTAFv9nU5eJBmZyW2uhM4Fiq5_I802Hi-9F4a7py2rlmfXHFx0fflUdQdCJegFa_uQ_VwcCNoaadC_Dz5fXbHDkTWNQhYEEAPGoy3TnYbZscLhaX9VYVsZ1tzG5-zPEoo-myis3hx0WUJ6XRWBcfdifM4GYCkFW7vamWI6gx7i9zvkhiy9VULr2NUHE5BhklB25hkfoL-zmrVHBOFQj8MXqJWMGgkS7aYIzoIG1hfS9DO-c9eJ1J_XdvnJXeHuXKNY5A4qpLx_SMgNLkVsF5l-LHknRmWDd_aYD9s96iHd6BCPv3Lbk9tmMOEbyuULlHakcqbZV721-joRxU0-YcT9OY5w_fQXT0w7299UGTgOhDh99L89pWG5agRKNtyMmguo5XFEXJtyVpGyyoLxc=w672-h940-no',
          cardBack: 'https://thumbs.dreamstime.com/x/playing-card-back-side-60x90-mm-17679108.jpg',
          count: 2
        }, {
          imageUrl: 'https://lh3.googleusercontent.com/7zYYD3uOtWHZyD4Z3uYz5Rhqijwj4YubWOKEAYZiPmb_0vB2QvGfTXIEl2Bcky9vUikSR0rPQyb8UrnfZ0Qb7-mw6mys_DyYnzzDT5OvWo77_n2tcEFTgTQRNg0KlSNMkTITlmjx4k_AXlz1-XZ4U_ADH8Fk0kCSa4RRsjtRULX8Mi83k5z4WpQQi0WQ15Q3wzbOO_49XWvrvm50KHr2ywgWi0WaK0waYP5DdjY1tYqKwy5jy8rM4-rs9D-jt5J0Z2zOK_UK9DF3CRZCU60EvnG7ZqcIsuylcfXWKpfbCvBmuxL7t62of13twgypTreT6gMt2zmXLKMvtkwASNI-pDlXkqq8PRsx-i0p8OOwfYdq9o-tPaOz9agNiIDi6kAffYIiMl4lYhIBpvb6EO7xHP4TZBsl0UYGBfEhxQiLgwpDrDdNyE4tu-KRpBn7ldraM2tIl2BpfnZqrBLuHFES5-bo463b401uaqPHEFmbDESkB1KwVLMHCLJ58saOTwCFj8CNsoy3onJ5x7a_ndYmYBgw00YhUbAxQ5G1TqpxjPPUeCx0WoWhARg1XRpyQjLcF23Ri-fsPCiYdm-8RFsu47mqxXO4NoUg=w672-h940-no',
          cardBack: 'http://www.jimknapp.com/Cards/Non-Bicycle_files/image002.jpg',
          count: 3
        }]
      }]
    };
  })


;
