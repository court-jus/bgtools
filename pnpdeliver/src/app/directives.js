angular.module('pnpdeliverApp')

.directive("myFileRead", [function() {
  return {
    scope: {
      fileread: '=myFileRead'
    },
    link: function(scope, elm, attrs) {
      elm.bind("change", function(changeEvent) {
        scope.$apply(function() {
          scope.fileread = changeEvent.target.files[0];
        });
      });
    }
  };
}])

;
