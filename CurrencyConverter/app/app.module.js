/**
* Application module
* - Create a module with angular route dependencies. Configured the route, by default it will load the converter view
* - in case of fixer api is down or not responded, it will navigate to error page and display the error message to the user.
* - Handled uncaught angular exception using $exceptionHandler builtin feature
**/
var app = angular.module("app", []);

// Application error handling
app.factory('$exceptionHandler', function($log) {
	return function (exception, cause) {
		exception.message += '"Angular Exception : "' + cause + '"';
		$log.warn(exception, cause);
		throw exception; 
	};
});