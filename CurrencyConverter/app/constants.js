/**
* Constants file. It will have all the application specific constant variables.
* Constant variables can refer  in controllers, factory and directive by injecting into them using DI
**/
var app = angular.module("app");

app.constant('CONSTANTS', {
	FIXER_API_URL : 'http://api.fixer.io/latest?',
	DEFAULT_BASE_CURRENCY : 'CAD',
	DEFAULT_CONVERT_CURRENCY : 'USD',
	CURRENCY_LIST:{
	"currencies":[
		{
			"code":"CAD",
			"country":"CA"
		},
		{
			"code":"USD",
			"country":"US"
		},
		{
			"code":"EUR",
			"country":"EU"
		}
		]
	}
});