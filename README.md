fallback.js
===========


## About
### < 1 KB!
* _JavaScript library for dynamically loading javascript files from a CDN with a fallback option._
* _Load scripts on demand for faster page load time!_
* _Loads all scripts in parralel!_
* __This is the only external script that needs to be loaded in your HTML!__


## API
### fallback.load(libraries)
- `libraries` is an object that expects it's key to be the libary that is loaded. Per example jQuery's key is `jQuery`.
- You can pass either an array or string as the value for each library.
- All libraries will be executing in parallel.
- The fallback libraries will be executed in the order they are in the array.


```
<script src="fallback.min.js"></script>
<script>
	fallback.load({
		jquery: [
			'//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.FAIL_ON_PURPOSE.min.js',
			'//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js',
			'//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js'
		],

		stacktrace: '//cdnjs.cloudflare.com/ajax/libs/stacktrace.js/0.5.0/stacktrace.min.js'
	}, function(success, failed) {
		console.log('success');
		console.log('-------');
		console.log(success);

		console.log('failed');
		console.log('-------');
		console.log(failed);
	});
</script>
```


## Changelog
### 0.01 / 2013-05-27
	- Initial release.