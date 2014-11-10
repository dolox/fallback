// Anonymous define our `main` module and load up `app` as a separate module. We're loaded `app` seperately that way
// other anonymous modules can reference the functions for `app`. If we try to reference `main` from modules that are
// loaded from `main`, we'll run into a circular reference, which won't work.

// Define the main module and load up `app` as a dependency.
define(function(app) {
	// Initiate our app.
	app.init();
});
