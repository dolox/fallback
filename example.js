fallback.load({
	css: 'example.css',

	jquery: [
		'//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.FAIL_ON_PURPOSE.min.js',
		'//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.1/jquery.min.js'
	],

	jquery_ui: [
		'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//js/loader.js?i=vendor/jquery-ui.min.js'
	]
}, {
	// Only load jquery ui after jquery itself has loaded!
	shim: {
		jquery_ui: ['jquery']
	},

	callback: function(success, failed) {
		pre = '\nSuccess!\n-------\n' + JSON.stringify(success, null, 4);
		pre += '\n\n\n\nFailed!\n-------\n' + JSON.stringify(failed, null, 4);
		$('body').prepend('<pre style="display: none">' + pre + '</pre>');
		$('pre').show(1500, function() { $('strong').show('slide', {direction: 'left', duration: 1000}).css('display', 'block'); });
	}
});

fallback.ready(function() {
	$('body').append('<strong style="display: none; color: green">EXECUTE MY CODE NOW! ;-)</strong>');
});
