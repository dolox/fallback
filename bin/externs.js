fallback.load({
	// Stylesheet support. If a file contains .css it will attempt to load it as a stylesheet.
	css: 'index.css',

	JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js',

	jQuery: [
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.FAIL_ON_PURPOSE.min.js',
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js'
	],

	'jQuery.ui': [
		'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//js/loader.js?i=vendor/jquery-ui.min.js'
	]
}, {
	// Only load jquery ui after jquery itself has loaded!
	shim: {
		'jQuery.ui': ['jQuery']
	},

	callback: function(success, failed) {
		// Inline callback
	}
});

fallback.ready(['jQuery'], function() {
	// jQuery Completed
});

fallback.ready(function() {
	// All Completed
});