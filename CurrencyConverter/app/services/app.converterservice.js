/**
* Factory
* This factory is used to make http call to Fixer API and returnt the response to controller
**/
var app = angular.module("app");

app.factory("ConverterService", function($rootScope,$http, $log, CONSTANTS) {
	var convService = {};
	var serviceUrl = "";	

	convService.getExchangeRates = function (base, symbols, callBackFunc) {
		// calling fixer api service to get the latest exchange rate
		serviceUrl = CONSTANTS.FIXER_API_URL + "base="+base+"&symbols="+symbols;
		$http.get(serviceUrl)
			.then(function(response) {
				if (response && response.data) {
					$rootScope.serviceError = false;
					callBackFunc(response.data);	
				}
				else {
					$rootScope.serviceError = true;
					$log.error("Fixer api response not found.");
				}	
			},
			function(error) {
				$rootScope.serviceError = true;
				$log.error("Fier api request failed : " + error);				
			});
	}

	return convService;
});