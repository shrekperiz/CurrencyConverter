
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

        // Not restricted from entering the decimal point more than once
        var findsDot = new RegExp(/\./g); 
        var containsDot = val.match(findsDot);
        
        if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {  
            event.preventDefault();  
            return false;  
        }

        // check if input contains more than two decimal places
        var regexp = /^[0-9]+(\.[0-9]{1,2})?$/;
        var valid = regexp.test(val);
        if (!valid) {
          var clean = val.substring(0, (val.indexOf('.') + 3));
          if (val !== clean) {
            ngModelCtrl.$setViewValue(clean);
            ngModelCtrl.$render();
          }
        }
        
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