
/**
* Application directive
* This directive is used in input amount user field. It will enforce user to enter only decimal values
**/
var app = angular.module("app");

app.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      var validator = function(val) {
        if (angular.isUndefined(val)) {
            var val = '';
        }
        var regexp = /^[0-9]+(\.[0-9]{1,2})?$/;
        
        ngModelCtrl.$setValidity('validNumber', regexp.test(val));
        return val;
      };

      ngModelCtrl.$parsers.unshift(validator);
      ngModelCtrl.$formatters.unshift(validator);
      
      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});