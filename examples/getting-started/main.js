/* global cfg, fallback, req */

cfg({
	// The list of libraries that we want use for our project.
	"libs": {
		// Include `Twitter Bootstrap`.
		// We explicity prefix `css$` to the beginning of our key so Fallback JS
		// knows to load this library as a Cascading Stylesheet (CSS).
		"css$bootstrap": {
			// Fallback JS will check to see if this style currently exists on the
			// page. If it does exist, the library will not attempt to load the file
			// as it will assume it's already been loaded on the page.
			"exports": ".col-xs-12",

			// The URLs to load `Twitter Bootstrap`.
			"urls": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min"
		},

		// Include `jQuery`.
		"jQuery": {
			// The URLs to load `jQuery`.
			"urls": [
				"//.....some-bad-cdn...../.....FAIL-ON-PURPOSE.....",
				"//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min"
			]
		},

		// Include `jQuery UI`.
		"jQueryUI": {
			// The global vaiable that is set by `jQuery UI` when it's loaded on the
			// page. If this variable is defined we won't attempt to load it.
			"exports": "jQuery.ui",

			// Load `jQuery` first before loading `jQuery UI`.
			"deps": "jQuery",

			// The URLs to load `jQuery UI`.
			"urls": [
				"//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min"
			]
		}
	}
});

// Load jQuery!
req(function(jQuery) {
	jQuery("body").append("<h3 class='alert-success'>Loaded jQuery!</h3>");
});

// Load jQuery UI!
req(function(jQueryUI, jQuery) {
	jQuery("body").append("<h3 class='alert-success'>Loaded jQuery UI!</h3>");
});

// Load Twitter Bootstrap!
req(function(css$bootstrap, jQuery) {
	jQuery("body").append("<h3 class='alert-success'>Loaded Twiiter Bootstrap!</h3>");
});

// Load All!
req(function(css$bootstrap, jQueryUI, jQuery) {
	jQuery("body").append("<h3 class='alert-success'>Loaded All!</h3>");
});

// Stats!
req(function(css$bootstrap, jQueryUI, jQuery) {
	jQuery('.container').append('<h1 class="text-center">Stats</h1>');
	jQuery('.container').append('<pre id="stats">' + fallback.stats() + '</pre>');
});
