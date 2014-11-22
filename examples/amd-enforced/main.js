/* global cfg, fallback, req */

cfg({
	"amd": true,

	"libs": {
		"css$bootstrap": {
			"exports": ".col-xs-12",
			"urls": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min"
		},

		"fastclick": {
			"urls": [
				"//rawgit.com/ftlabs/fastclick/master/lib/fastclick.js",
				"//.....FALLBACK....."
			]
		},

		"jQuery": {
			"urls": [
				"//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min"
			],

			"version": "2.1.1"
		}
	}
});

// Load FastClick!
req(function(fastclick, jQuery) {
	jQuery("body").append("<h3 class='alert-success'>Loaded FastClick!</h3>");
});

// Load jQuery!
req(function(jQuery) {
	jQuery("body").append("<h3 class='alert-success'>Loaded jQuery!</h3>");
});

// Load Twitter Bootstrap!
req(function(css$bootstrap, jQuery) {
	jQuery("body").append("<h3 class='alert-success'>Loaded Twitter Bootstrap!</h3>");
});

// Stats!
req(function(css$bootstrap, fastclick, jQuery) {
	jQuery('.container').append('<h1 class="text-center">Stats</h1>');
	jQuery('.container').append('<pre id="stats">' + fallback.stats() + '</pre>');
});
