<p align="center"><img alt="Fallback JS" height="128" src="http://fallback.io/img/logo.png" /></p>
<h1 align="center">Fallback JS</h1>

---

<img src="https://travis-ci.org/dolox/fallback.svg" />
<img src="https://david-dm.org/dolox/fallback/status.svg?style=flat" />
<img src="https://david-dm.org/dolox/fallback/dev-status.svg?style=flat" />

## Getting Started

To let you dive right in, we're going to provide you with a sample of code below. You can view the full [API Documentation](#api-documentation) along with other complex examples listed further down the page.


**HTML**

```html
<html>
<head>
	<!-- By specifying `data-main` the library will automatically load `main.js` -->
	<script data-main="main" src="fallback.min.js" type="text/javascript"></script>
</head>

<body>
	<div id="status">
		<h1>Libraries Loaded</h1>
	</div>
</body>
</html>
```

**main.js**
```javascript
cfg({
	// Here we're setting the path where our local fallback files live.
	// This way we don't have to retype it over and over again.
	"base": "/js/",

	"libs": {
		// Here we're loading the Bootstrap CSS library.
		// We explicity `css$` to the beginning of our key, so the library
		// knows to load this file file as a stylesheet.
		"css$bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min",

		// Our jQuery library.
		"jquery": {
			// Here we're giving it an alias, so we can reference jquery as `$`
			// instead of typing `jquery`.
			"alias": "$",

			// In order to load the `jQuery` library, we must first load our `JSON`
			// library.
			"deps": ["css$bootstrap"],

			// A list of all of the files for our jQuery library.
			// If one fails, we'll try another, until 1 succeeds or they all fails.
			"urls": [
				"//.....some-bad-cdn...../.....FAIL-ON-PURPOSE.....",
				"//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min"
			]
		},

		// Our jQuery UI library.
		"jqueryUI": {
			// Load jQuery first before loading jQuery UI.
			"deps": ["jquery"],

			// A list of all of the files for our jQuery UI library.
			"urls": [
				"//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min"
			]
		}
	}
});

// Load jQuery!
req(function($) {
	$("#test").append("<div>Loaded jQuery</div>");
});

// Load Jquery UI!
req(function(jqueryUI) {
	$("#test").append("<div>Loaded jQuery UI</div>");
});
```

---

## Open Source Examples

Link | Description
------------- | -------------
[AngularJS Lazy Loading](http://plnkr.co/Q1mPmY) | This example illustrates how you can lazy load controllers, directives, modules and services in AngularJS using the FallbackJS library.

[<p align="center">View more open source examples on Plunker under the tag #fallbackjs!</p>](http://plnkr.co/tags/fallbackjs)

---

## API Documentation

### Overview

Function | Aliases | Description
------------- | ------------- | -------------
[config](#fallbackconfiginput) |`cfg`, `conf`, `config`, `fallback.cfg`, `fallback.conf`, `fallback.config`, `fbk.cfg`, `fbk.conf`, `fbk.config` | How to configure Fallback with your libraries.
[define](#fallbackdefinename-dependencies-function) | `def`, `define`, `fallback.def`, `fallback.define`, `fbk.def`, `fbk.define` | How to properly define your JavaScript files.
[require](#fallbackrequiredependencies-function) | `fallback.req`, `fallback.require`, `fbk.req`, `fbk.require`, `req`, `require` | How to go about loading your JavaScript files.
[stats](#fallbackrequiredependencies-function) | `fallback.stats`, `fbk.stats` | Exports statistics for libraries that were loaded in the console.

=====

### **fallback.config(`input`)**

***Aliases:*** `cfg`, `conf`, `config`, `fallback.cfg`, `fallback.conf`, `fallback.config`, `fbk.cfg`, `fbk.conf`, `fbk.config`

This function allows you to configure the defaults along with the URLs for your libraries. It only takes a single parameter, and expects it to be an `Object`.

Parameter | Type | Default | Required | Description
------------- | ------------- | ------------- | ------------- | -------------
*input* | Object | *null* | Yes | Key/Value pair object that contains the configuration for the Fallback library.

=====

**<p align="center">INPUT</p>**

Parameter | Type | Default | Required | Description
------------- | ------------- | ------------- | ------------- | -------------
amd | Boolean | false | No | Whether or not to allow your libraries to be accessible via global scope. If this value is `false` you won't be able to access your libraries directly through the browsers `window` object.
base | Object/String | null | No | Accepts an object/string to be used as the prefix for all of your URLs. See the `input.base` table below for further details.
debug | Boolean | false | No | Toggle debugging mode. If turned on, helpful messages will show up in the console.
delimiter | String | $ | No | The string to dictate loading non-JavaScript files. For example to load css files you'd use: `css$my_css_file`.
globals | Boolean | true | No | Whether or not to check the global scope before attemping to load your libaries. This way if a library has already been loaded, `Fallback` won't attempt to load it again.
urls | Object | null | No | Expects an object containing the configuration for each of your libraries. See the `input.urls` table below for further details.

**Example**

```json
{
	"amd": false,
	"base": "./js/",
	"debug": true,
	"delimiter": "_",
	"globals": true,

	"urls": {
		"css_bootstrapCSS": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min",
		"img_imgPreloader": "http://fallback.io/img/logo.png",
		"jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min"
	}
}
```

=====

**<p align="center">INPUT.BASE</p>**

If the `input.base` value is a `String`, all of your URLs will be prefixed with this path, as long as the path in question doesn't start with `/`, `data:`, `http://` or `https://`. The following table below reflects the acceptable parameters when the value of `input.base` is an `Object`.

Parameter | Type | Default | Required | Description
------------- | ------------- | ------------- | ------------- | -------------
css | String | *null* | No | The path to prefix all of your CSS files with.
img | String | *null* | No | The path to prefix all of your images with.
js | String | *null* | No | The path to prefix all of your JS files with.

**Example**

```json
{
	"base": {
		"css": "./css/",
		"img": "./img/",
		"js": "./js/"
	}
}
```

=====

**<p align="center">INPUT.URLS</p>**

The `keys` of this object will correlate to the variables you'll use to load the library in question.

If the `value` of our `key` is a...

- `String`, it will be treated as the URL for the library.

- `Array`, it will be treated as the URLs for the library.

- `Object`, it may have it's own specific configuration set. See below.

Parameter | Type | Default | Required | Description
------------- | ------------- | ------------- | ------------- | -------------
*key* | String | *null* | Yes | The subkeys of our objects correlate to the names of our libraries. *Example: 'jQuery'*
*value* | Array/Object/String | *null* | Yes | Either a `String`, or `Array` of `Strings` which represent the URLs for the library. If the `value` is an `Object` then please see the `INPUT.URLS (VALUES AS OBJECTS)` section below for a list of acceptable parameters.

**Example**

```javascript
cfg({
	"urls": {
		"angular": '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min'
	}
});

cfg({
	"urls": {
		"jquery": [
			'//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min',
			'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min'
		]
	}
});

cfg({
	"urls": {
		"jqueryUI": {
			"deps": ["jquery"],
			"files": "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min"
		}
	}
});

req(function(angular, jquery, jqueryUI) {
	$("body").html("Angular JS, jQuery and jQuery UI Loaded!");
});
```

=====

**<p align="center">INPUT.URLS (KEYS)</p>**

Any `keys` which have a specific prefix (listed in the table below) followed by our delimiter (which can be set via the configuration function) will be handled in their own special way.

Prefix | Description
------------- | ------------- | -------------
css | All files listed for the library in question would be loaded as Cascading Style Sheets (CSS).
img | All files listed for the library in question would be loaded as images.
js | All files listed for the library in question would be loaded as JavaScript files.

**Example**

```javascript
// The following example illustrates how we'd load CSS, Image and JavaScript files, with the delimiter in our libraries configuration being to set to a `$`.
cfg({
	"libs": {
		// Load this file as a stylesheet.
		"css$bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min",

		// This will load our logo image. Useful if we're attempting to preload parts of our website.
		"img$logo": "http://fallbackjs.com/img/logo.png",

		// You don't have to specify `js$`, but default we'll automatically treat files as JavaScript files.
		"js$angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular.min"
	}
});

req(function(css$bootstrap, img$logo, js$angular) {
	window.console.log("Loaded Bootsrap CSS, Logo Image, and Angular JS!");
});
```

=====

**<p align="center">INPUT.URLS (VALUES AS OBJECTS)</p>**

Parameter | Type | Default | Required | Description
------------- | ------------- | ------------- | ------------- | -------------
alias | Array/String | *null* | No | Aliases you want to use for your library. For example you might name your key `jquery` for the jQuery library, but instead of using the variable `jquery` you may want to use `$` to reference it. In that case you would set `$` as an alias for the library.
deps | Array/String | *null* | No | An `Array` or `String` of dependcies that are required to load prior to the library in question. The `Array` of `Strings` or `String` should represent either the `key` of the library, or one of it's `aliases`.
exports | String | *null* | No | The `window` variable that represents the library. For example Angular JS would be `angular`, jQuery would be `jQuery` and jQuery UI would be `jQuery.ui`.
files | Array/String | *null* | No | The list of paths/URLs for our library. You can add as many fallbacks as you want in this `Array`.
init | Function | *null* | No | If present, this function will be immediately executed as a soon as the library in question has finished loading successfully.

@todo left off here

**Example**

```json
{
	"urls": {
		"angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular.min",

		"angularUIBootstrap": {
			"deps": [
				"angular",
				"bootstrapCSS"
			],

			"exports": "angular.module('ui.bootstrap')",

			"files": "//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min"
		},

		"css!bootstrapCSS": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min",

		"jquery": {
			"alias": "$",
			"files": "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min"
		},

		"jqueryUI": {
			"deps": [
				"jquery",
				"jqueryUICSS"
			],

			"files": [
				"//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min",
				"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min"
			]
		},

		"jqueryUICSS": {
			"exports": ".ui-helper-hidden",

			"files": {
				"//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui"
			}
		}
	}
}
```

=====

**<p align="center">RETURN VALUES</p>**

Value | Type | Description
------------- | ------------- | -------------
false | Boolean | The config wasn't imported due to being malformed. Turn debugging on and check console for helper messages.
true | Boolean | The config was imported properly.

-----

### **fallback.define(`name`, `dependencies`, `function`)**

***Aliases:*** `def`, `define`, `fallback.def`, `fallback.define`, `fbk.def`, `fbk.define`

The parameters in this function will fallback on one another. So for example, if you only pass in 2 parameters to the function `fallback.define(a, b)`, `a` will be treated as the `dependencies` and `b` will be treated as the `function`. If you only pass in a single parameter, that parameter will be treated as the `function`.

Parameter | Type | Required | Default | Description
------------- | ------------- | ------------- | ------------- | -------------
name | String | No | null | If a name is not passed in, the URL that was used to load the file in question will be used as the name for this definition. Please note that you can't have multiple nameless/anonymous definitions in the same file.
dependencies | Array/String | No | null | A string/array of dependencies that we expected to be loaded before executing our function.
function | Function | Yes | null | If dependencies are specified, then they will be sent to this function as their arguments. However, if you don't specify the dependencies, whatever arguments are within this function will be correlated as the dependencies for this function. See below for further details along with an example.

**Example**

Each of following examples below will achieve the same goal. We're simply illustrating how you can use the library, and why you may use one method over another.

**config.js**

*First we need to configure our jQuery library, then load up our definition files.*

```javascript
conf({
	"urls": {
		"jquery": {
			alias: "$",
			files: "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min"
		}
	}
});

req(function(test, test2, test3) {
	test();
	test2();
	test3();
});
```

**test1.js**

*Full illustration, passing in all parameters.*

*Notice that the filename is `test1.js` yet we've explicity named it `test` instead. When we goto reference this file, we now must use the name `test` in order to load it properly. In cases where you want to explicity give a name to your definition which differs from it's default, you would specify the `name` parameter.*

```javascript
def('test', ['jquery'], function($) {
	return function() {
		$('body').html('jQuery Loaded!');
	};
});
```

**test2.js**

*If you're using a minifier which doesn't automatically preserve your functions arguments names, you would want to explicity specify your dependencies in an array of strings.*

```javascript
def(['jquery'], function($) {
	return function() {
		$('body').html('jQuery Loaded!');
	};
});
```

**test3.js**

*Short-hand, less typing, faster coding.*

```javascript
def(function($) {
	return function() {
		$('body').html('jQuery Loaded!');
	};
});
```

-----

### **fallback.require(dependencies, function)**

***Aliases:*** `fallback.req`, `fallback.require`, `fbk.req`, `fbk.require`, `req`, `require`

The parameters in this function will fallback on one another. So for example, if you only pass in a single parameter, that parameter will be treated as the `function`.

Parameter | Type | Required | Default | Description
------------- | ------------- | ------------- | ------------- | -------------
dependencies | Array/String | No | null | A string/array of dependencies that we expected to be loaded before executing our function.
function | Function | Yes | null | If dependencies are specified, then they will be sent to this function as their arguments. However, if you don't specify the dependencies, whatever arguments are within this function will be correlated as the dependencies for this function. See below for further details along with an example.

@todo here

-----

## FAQ

**Q: What dependencies does Fallback JS have?**

A: None! Fallback JS is a standalone library.

-

**Q: Can I provide multiple fallbacks for any given asset?**

A: Yes! You can provide as many as you want, there is no limit.

-

**Q: How should Fallback JS be loaded?**

A: @todo

-

**Q: Can I load up my CSS and JavaScript files in a single configuration block?**

A: Yes, please see the example at the top of the `README.md` file.

-

**Q: Can I run the `config` function more than once?**

A: Yes.

-

**Q: Why can't I call the `define` function more than once without a name in the same file?**

A: @todo

-

**Q: What is the `amd` parameter in the configuration for?**

A: @todo

-

**Q: What is the `globals` parameter in the configuration for?**

A: @todo

-

**Q: What is the `delimiter` parameter in the configuration for?**

A: @todo

-----

## About

### Contributing

Please read the [CONTRIBUTING.md](https://github.com/dolox/fallback/blob/master/CONTRIBUTING.md) file located in the root of this project to see how you can help contribute to this project. We encourage our users to test and report all/any problems they find with the library.

### License

[The MIT License (MIT)](https://github.com/dolox/fallback/blob/master/LICENSE.txt)

-----

## Support

### Contributing

@todo

### Need help? We use GitHub!

Any questions, suggestions or bugs should all be submitted to the issues section of the projects GitHub repository.

### Staying Alive

Over the course of the life of this project, we've come to find out that 4-5x our star count on GitHub reflects the actual adoption rate of this project. We encourage our users to star the project, so that it can help us see how large the project is growing and how urgent the issues are.
