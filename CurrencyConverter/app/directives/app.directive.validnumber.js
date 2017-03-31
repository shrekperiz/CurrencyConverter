
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

       element.on('keydown', function (event) {
        if (event.which == 64 || event.which == 16) {  
            // numbers  
            return false;  
        } if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {  
            // backspace, enter, escape, arrows  
            return true;  
        } else if (event.which >= 48 && event.which <= 57) {  
            // numbers  
            return true;  
        } else if (event.which >= 96 && event.which <= 105) {  
            // numpad number  
            return true;  
        } else if ([46, 110, 190].indexOf(event.which) > -1) {  
            // dot and numpad dot
            // restrict to enter more than one dot
            var curValue = ngModelCtrl.$viewValue; 
            if ( curValue && curValue.indexOf('.') > -1) {
              event.preventDefault();
              return false;
            } else {
              return true;
            }
        } else {  
            event.preventDefault();  
            return false;  
        }
      });

      ngModelCtrl.$parsers.unshift(validator);
      ngModelCtrl.$formatters.unshift(validator);

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