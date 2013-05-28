fallback.js
===========
#### The library is < 2 KB!!!

## About
* _JavaScript library for dynamically loading javascript files from a CDN with a fallback option._
* _Load scripts on demand for faster page load time!_
* _Loads all scripts in parralel!_
* _It's extremely easy to implement!_
* __This is the only external script that needs to be loaded in your HTML!__

## Todo

- Add support for stylesheets.
- Add optional dependencies array.

## API
### fallback.ready(function)
`function`
- Ready expects a function and will execute after `load` has completed.
- You can call ready multiple times throughout any of your scripts as it will chain all your functions and execute them upon completion.

### fallback.load(libraries, options)
`libraries`
- Object that expects it's key to be the libary that is loaded. Per example jQuery's key is `jQuery`.
- You can pass either an array or string as the value for each library.
- All libraries will be executing in parallel.
- The fallback libraries will be executed in the order they are in the array.

`options`
- Expects parameter to be an object.
- `callback` must be a function, which will return a success and failure object as individual parameters. ex: function(success, failed)
- `ready_invoke` defaults to true. If set to false, when fallback is completed it will not invoke the .ready function.

```
	<script src="fallback.min.js"></script>

	<script>
	/*
		In this example we load our first batch of libraries.

		Batches? Why?

		Well libraries such as jQuery UI are dependent on jQuery to be loaded first, and this is how we
		solve this problem by setting `ready_invoke` to false on the first batch, and let it execute on our
		2nd and final batch.
	*/

	fallback.load({
		stacktrace: '//js/loader.js?i=vendor/stacktrace.min.js',

		socket: '//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.10/socket.io.min.js',

		jQuery: [
			'//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.FAIL_ON_PURPOSE.min.js',
			'//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js',
			'//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js'
		]
	}, {
		ready_invoke: false, // Stop ready from invoking until we load everything we want.

		callback: function(success, failed) {
			console.log('1st batch success');
			console.log('-------');
			console.log(success);

			console.log('1st batch failed');
			console.log('-------');
			console.log(failed);

			fallback.load({
				'jQuery.ui': [
					'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
					'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
					'//js/loader.js?i=vendor/jquery-ui.min.js'
				]
			}, {
				callback: function(success, failed) {
					console.log('2nd batch success');
					console.log('-------');
					console.log(success);

					console.log('2nd batch failed');
					console.log('-------');
					console.log(failed);
				}
			});
		}
	});
	
	fallback.ready(function() {
		console.log('EXECUTE MY CODE NOW! :)');
	});
	</script>
```

## Changelog
### v0.1 / 2013-05-27
	- Initial release.
