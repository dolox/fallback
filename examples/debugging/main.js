/* global cfg, fallback, req */

cfg({
	"debug": true,

	"libs": {
		"css$bootstrap": {
			"exports": ".col-xs-12",
			"urls": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min"
		},

		"jQuery": {
			"urls": [
				"//.....some-bad-cdn...../.....FAIL-ON-PURPOSE.....",
				"//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min"
			]
		},

		"jQueryUI": {
			"exports": "jQuery.ui",
			"deps": "jQuery",
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
	jQuery("body").append("<h3 class='alert-success'>Loaded Twitter Bootstrap!</h3>");
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
