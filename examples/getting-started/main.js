/* global cfg, fallback, req */

cfg({
	// Here we're setting the path where our local files reside.
	'base': '/js/',

	// The list of libraries that we want to load for our project.
	'libs': {
		// Include Twitter Bootstrap.
		// We explicity prefix `css$` to the beginning of our key so Fallback JS
		// knows to load this library as a CSS file.
		'css$bootstrap': {
			// Fallback JS will check to see if this style currently exists on the
			// page. If it does exist, the library will not attempt to load the file
			// as it will assume it has already been loaded.
			'exports': '.col-xs-12',

			// The URL for our CSS file.
			'urls': '//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min'
		},

		// Include jQuery.
		'jquery': {
			// Here we're giving jQuery an alias, so we can reference it as `$`
			// instead of having to type `jquery` when we want to load it.
			'alias': '$',

			// The global vaiable that is exported by jQuery when it's loaded on
			// the page.
			'exports': 'jQuery',

			// A list of all of the files for our jQuery library.
			// If one fails, we'll try another, until 1 succeeds or all have failed.
			'urls': [
				'//.....some-bad-cdn...../.....FAIL-ON-PURPOSE.....',
				'//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
				'//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min'
			]
		},

		// Our jQuery UI library.
		'jqueryui': {
			// The global vaiable that is exported by jQuery UI when it's loaded on
			// the page.
			'exports': 'jQuery.ui',

			// Load jQuery first before loading jQuery UI.
			'deps': ['jquery'],

			// A list of all of the files for our jQuery UI library.
			'urls': [
				'//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min',
				'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min'
			]
		}
	}
});

// Load jQuery!
req(function($) {
	$('.container').append('<h3 class="alert-success">Loaded jQuery!</h3>');
});

// Load jQuery and Query UI!
req(function(jqueryui, $) {
	$('.container').append('<h3 class="alert-success">Loaded jQuery and jQuery UI!</h3>');
});

// Load jQuery and Twitter Bootstrap!
req(function(css$bootstrap, $) {
	$('.container').append('<h3 class="alert-success">Loaded jQuery and Twiiter Bootstrap!</h3>');
});

// Load jQuery, jQuery UI and Twitter Bootstrap!
req(function(css$bootstrap, jqueryui, $) {
	$('.container').append('<h3 class="alert-success">Loaded jQuery, jQuery UI and Twiiter Bootstrap!</h3>');

	$('.container').append('<h1 class="text-center">Stats</h1>');
	$('.container').append('<div id="stats">' + fallback.stats() + '</div>');
});
