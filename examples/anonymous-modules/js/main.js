// Anonymous define our `main` module and load up `app` as a separate module. We're loaded `app` seperately that way
// other anonymous modules can reference the functions for `app`. If we try to reference `main` from modules that are
// loaded from `main`, we'll run into a circular reference, which won't work.

// Define the main module and load up `app` as a dependency.
define(function(fallback) {
	// We need to include the JSON library for legacy browsers such as IE.
	fallback.config({
		libs: {
			app: {
				urls: './app',
				deps: 'JSON'
			},

			JSON: {
				exports: 'JSON',
				urls: '//cdnjs.cloudflare.com/ajax/libs/json2/20140204/json2.min'
			}
		}
	});

	// Initiate our app.
	require(function(app) {
		app.init();
	});
});
