app.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);

app.directive('limitChar', function() {
    'use strict';
    return {
        restrict: 'A',
        scope: {
            limit: '=limit',
            ngModel: '=ngModel'
        },
        link: function(scope) {
            scope.$watch('ngModel', function(newValue, oldValue) {
                if (newValue) {
                    var length = newValue.toString().length;
                    if (length > scope.limit) {
                        scope.ngModel = oldValue;
                    }
                }
            });
        }
    };
})

app.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }
        ctrl.$parsers.push(inputValue);
      }
    };
});
