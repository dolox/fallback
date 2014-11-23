/* global cfg, def, req */

def(function() {
	cfg({
		'libs': {
			_: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',

			angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular.min',

			angularBootstrap: {
				deps: 'angular',

				check: function() {
					try {
						return window.angular.module('ui.bootstrap') ? true : false;
					} catch (error) {}

					return false;
				},

				urls: '//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.6.0/ui-bootstrap-tpls.min'
			},

			angularRoute: {
				deps: 'angular',

				check: function() {
					try {
						return window.angular.module('ngRoute') ? true : false;
					} catch (error) {}

					return false;
				},

				urls: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-route.min'
			},

			angularTouch: {
				deps: 'angular',

				check: function() {
					try {
						return window.angular.module('ngTouch') ? true : false;
					} catch (error) {}

					return false;
				},

				urls: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-touch.min'
			},

			app: {
				deps: [
					'_',
					'angular',
					'angularBootstrap',
					'angularRoute',
					'angularTouch',
					'css$bootstrap'
				]
			},

			css$bootstrap: {
				exports: '.col-xs-1',
				urls: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min'
			}
		}
	});

	req(function(app) {
		app.init();
	});
});
