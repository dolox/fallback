fallback.load({
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
	// Only load jQuery UI after jQuery itself has loaded!
	shim: {
		'jQuery.ui': ['jQuery']
	}
}, function(success, failed) {
	console.log('fallback.load: Inline Callback');

	pre = '\nSuccess!\n-------\n' + JSON.stringify(success, null, 4);
	pre += '\n\n\n\nFailed!\n-------\n' + JSON.stringify(failed, null, 4);
	$('body').prepend('<pre style="display: none">' + pre + '</pre>');
	$('pre').show(1500, function() { $('strong').show(500).css('display', 'block'); });
});

fallback.ready(['jQuery'], function() {
	// jQuery Completed
	$('body').append('<p>fallback.ready: jQuery Completed</p>');
});

fallback.ready(['jQuery.ui'], function() {
	// jQuery UI Completed
	$('body').append('<p>fallback.ready: jQuery UI Completed</p>');
});

fallback.ready(['jQuery', 'jQuery.ui'], function() {
	// jQuery + jQuery UI Completed
	$('body').append('<p>fallback.ready: jQuery + jQuery UI Completed</p>');
});

fallback.ready(function() {
	// All Completed
	console.log('fallback.ready: ALL Completed');
	$('body').append('<strong style="display: none; color: green">EXECUTE MY CODE NOW! ;-)</strong>');
});