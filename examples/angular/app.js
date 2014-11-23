define(function(_, angular) {
	var me = {};

	me.init = function() {
		me.angular = angular.module('fallback', ['ngRoute', 'ngTouch', 'ui.bootstrap']).value('version', 1);
		me.boot();
	};

	me.boot = function() {
		angular.element(document).ready(function() {
			angular.bootstrap(document.getElementById('html'), ['fallback']);
		});

		me.angular.controller('test', function($scope) {
			$scope.test = 'Hello World! (this is a variable)';
		});
	};

	return me;
});
