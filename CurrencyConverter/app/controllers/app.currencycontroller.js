/**
* Application controller
* - Create a controller with dependencies such as ConverterService, CONSTANTS, $filter.
* - Wrote the business logics to populate the currencies list in dropdown and display the converted result based on input amount
**/
var app = angular.module("app");

app.controller("CurrencyController", function($rootScope,$scope, ConverterService, CONSTANTS, $filter, $location) {
	// model variable initialization
	$scope.baseCurrency = 0.00;
	$scope.convCurrency = 0.00;
	$scope.exchangeRate = 0.00;
	$scope.showExchangeRate = false;
	$rootScope.serviceError = false;
	/**
	This function is used to fetch the list of currencies.
	**/
	getCurrencies = function() {
		$scope.currencies  =CONSTANTS.CURRENCY_LIST.currencies;
		setDefaultCurrencyForConvertion();		
	}

	/**
	This function is used to set the default currency code in dropdown
	**/
	setDefaultCurrencyForConvertion = function () {
		$scope.selBaseCurrency = $filter('filter')($scope.currencies , {code : CONSTANTS.DEFAULT_BASE_CURRENCY})[0];
		$scope.selConvCurrency = $filter('filter')($scope.currencies , {code : CONSTANTS.DEFAULT_CONVERT_CURRENCY})[0];
		$scope.getExchangeRate();
	}

	/**
	This function will invoke whenever user change the value in currency dropdown to fetch the exchange rate by passing base currency and output currency to the fixer api. 
	Parse the latest api fixer rate and update into scope variable which can be used to calculate the converted amount
	**/
	$scope.getExchangeRate = function () {
		if ($scope.selBaseCurrency.code != $scope.selConvCurrency.code) {
			ConverterService.getExchangeRates($scope.selBaseCurrency.code, $scope.selConvCurrency.code, function(result) {
				if (result && result.rates) {
					// update the latest exchange rate
					$scope.exchangeRate = result.rates[$scope.selConvCurrency.code];
					// call this function to calculate the converted amount
					$scope.calConvertedAmount();
				} else {
					// shows error message
					$rootScope.serviceError = true;
				}
			});	
		} else {
			// set the default exchange rate when user choose the base and converted currency as same
			$scope.exchangeRate = 1;
			// call this function to calculate the converted amount
			$scope.calConvertedAmount();
		}
	}

	/**
	This function will invoke when user input the amount, calculate the converted amount by using baseAmount * exchangeRate. 
	Bind the scope variable in text field, It will immediately reflected in UI once value gets updated.  
	**/
	$scope.calConvertedAmount = function () {
		if ($scope.baseCurrency >= 0) {
			$scope.convCurrency = $scope.baseCurrency * $scope.exchangeRate;
		} else {
			$scope.convCurrency = 0.00;
		}

		$scope.convCurrency = $scope.convCurrency.toFixed(3);
	}
	

	// call getCurrencies() to populate the currency list in dropdown
	getCurrencies();
});