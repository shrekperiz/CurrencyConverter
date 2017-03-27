
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

        var clean = val.replace( /[^0-9\.]+/g, '');
        if (val !== clean) {
            ngModelCtrl.$setViewValue(clean);
            ngModelCtrl.$render();
        }

        // check if input contains more than two decimal places
        var regexp = /^[0-9]+(\.[0-9]{1,2})?$/;
        var valid = regexp.test(clean);
        if (!valid) {
          var clean = clean.substring(0, (clean.indexOf('.') + 3));
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }

        calConvertedAmount(clean);
        return clean;
      };

      ngModelCtrl.$parsers.unshift(validator);
      ngModelCtrl.$formatters.unshift(validator);
      
      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });

      /**
      This function will invoke when user input the amount, calculate the converted amount by using baseAmount * exchangeRate. 
      Bind the scope variable in text field, It will immediately reflected in UI once value gets updated.  
      **/
      calConvertedAmount = function (baseVal) {
        if (baseVal >= 0) {
          // check if input contains more than two decimal places          
          scope.convCurrency = baseVal * scope.exchangeRate;
        } else {
          scope.convCurrency = 0.00;
        }
        
        scope.convCurrency = parseFloat(scope.convCurrency).toFixed(2);
      }
    }
  };
});