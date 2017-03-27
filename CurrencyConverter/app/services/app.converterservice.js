/**
* Factory
* This factory is used to make http call to Fixer API and returnt the response to controller
**/
var app = angular.module("app");

app.factory("ConverterService", function($rootScope,$http, $log, CONSTANTS) {
	var convService = {};
	var serviceUrl = "";	

	convService.getExchangeRates = function (base, symbols, callBackFunc) {
		// sample url formation
		//http://api.fixer.io/latest?base=USD&symbols=CAD,EUR
		serviceUrl = CONSTANTS.FIXER_API_URL + "base="+base+"&symbols="+symbols;
		$http.get(serviceUrl)
			.then(function(response) {
				if (response && response.data) {
					callBackFunc(response.data);	
				}
				else {
					$log.error("Fixer api response not found.");
				}	
			},
			function(error) {
				$log.error("Fier api request failed : " + error);	
				$rootScope.serviceError = true;
			});
	}

	return convService;
});