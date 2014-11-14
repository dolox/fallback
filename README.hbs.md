<p align="center"><a href="http://fallback.io/" target="_blank"><img alt="Fallback JS" height="128" src="http://fallback.io/img/logo.png" /></a></p>
<h1 align="center">Fallback JS v{{{package.version}}}</h1>
<h6 align="center">{{{sizeOfFile 'dist/fallback.min.js'}}} KB Compressed / {{{sizeOfFile 'dist/fallback.js'}}} KB Uncompressed</h6>

<p align="center">
	<a href="https://travis-ci.org/dolox/fallback" target="_blank"><img src="https://travis-ci.org/dolox/fallback.svg?style=flat" /></a>
	<a href="http://badge.fury.io/gh/dolox%2Ffallback" target="_blank"><img src="https://badge.fury.io/gh/dolox%2Ffallback.svg" /></a>
	<a href="http://badge.fury.io/bo/fallback" target="_blank"><img src="https://badge.fury.io/bo/fallback.svg" /></a>
	<a href="https://david-dm.org/dolox/fallback" target="_blank"><img src="https://david-dm.org/dolox/fallback/status.svg?style=flat" /></a>
	<a href="https://david-dm.org/dolox/fallback#info=devDependencies" target="_blank"><img src="https://david-dm.org/dolox/fallback/dev-status.svg?style=flat" /></a>

	<br />
	<br />

	<a href="https://saucelabs.com/u/fallback" target="_blank"><img src="https://saucelabs.com/browser-matrix/fallback.svg" /></a>

	<br />
</p>

- [Getting Started](#getting-started)
- [Open Source Examples](#open-source-examples)
- [API Documentation](#api-documentation)
- [FAQ](#faq)
- [About](#about)
- [Contributing](https://github.com/dolox/fallback/blob/master/CONTRIBUTING.md)
- [Support](#support)

---

# Getting Started

To let you dive right in, we're going to provide you with the sample of code below. You can view the full [API Documentation](#api-documentation) along with other complex examples listed further down the document.

**index.html**

```html
<html>
<head>
	<!-- By specifying `data-main` the library will automatically load `main.js` -->
	<script data-main="main" src="fallback.min.js" type="text/javascript"></script>
</head>

<body class="text-center">
	<h1>Libraries Loaded</h1>
</body>
</html>
```

**main.js**
```javascript
cfg({
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
	$('body').append('<div class="alert-success">Loaded jQuery!</div>');
});

// Load jQuery and Query UI!
req(function(jqueryui, $) {
	$('body').append('<div class="alert-success">Loaded jQuery and jQuery UI!</div>');
});

// Load jQuery and Twitter Bootstrap!
req(function(css$bootstrap, $) {
	$('body').append('<div class="alert-success">Loaded jQuery and Twiiter Bootstrap!</div>');
});

// Load jQuery, jQuery UI and Twitter Bootstrap!
req(function(css$bootstrap, jqueryui, $) {
	$('body').append('<div class="alert-success">Loaded jQuery, jQuery UI and Twiiter Bootstrap!</div>');
});
```

---

# Open Source Examples

If you happen to stumble upon any helpful open source examples which aren't listed here, please let us know and we'll add them to the list!

| Link | Description |
| ---- | ----------- |
| [Examples](https://github.com/dolox/fallback/tree/master/examples) | A number of examples included in the project which illustrate how you can use the Fallback JS library.
| [AngularJS Lazy Loading](http://plnkr.co/Q1mPmY)                   | This example illustrates how you can lazy load controllers, directives, modules and services in AngularJS.
| [#fallbackjs on Plunker](http://plnkr.co/tags/fallbackjs)          | Look on Plunker under the tag `#fallbackjs` to see a number of examples that've been posted by users.

---

# API Documentation

A technical overview and in depth explanations of the libraries functions.

### Overview

| Function                                            | Aliases                                                                                                         | Description   |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------- |
| [config](#fallbackconfiginput)                      |`cfg`, `conf`, `config`, `fallback.cfg`, `fallback.conf`, `fallback.config`, `fbk.cfg`, `fbk.conf`, `fbk.config` | Configures Fallback JS to let it know what files need to be lazy loaded for your project. |
| [define](#fallbackdefinename-dependencies-function) | `def`, `define`, `fallback.def`, `fallback.define`, `fbk.def`, `fbk.define`                                     | Allows you to define your JavaScript files in a way that they can be easily loaded and referenced at a later time. |
| [require](#fallbackrequiredependencies-function)    | `fallback.req`, `fallback.require`, `fbk.req`, `fbk.require`, `req`, `require`                                  | Loads your libraries asynchronously the page. |
| [stats](#fallbackstats)                             | `fallback.stats`, `fbk.stats`                                                                                   | Exports statistics for any libraries that were loaded with Fallback JS. |
| [version](#fallbackversion)                         | `fallback.version`, `fbk.version`                                                                               | Returns the current version number of Fallback JS that's loaded on the page. |

===

### **fallback.config(`input`)**

***Aliases:*** `cfg`, `conf`, `config`, `fallback.cfg`, `fallback.conf`, `fallback.config`, `fbk.cfg`, `fbk.conf`, `fbk.config`

This function allows you to configure the defaults for your project along with the libraries that you want Fallback JS to load.

- [Parameters](#parameters)
	- [input](#fallbackconfig---input)
		- [amd](#fallbackconfig---input---base)
		- [base](#fallbackconfig---input---base)
		- [debug](#fallbackconfig---input---base)
		- [delimiter](#fallbackconfig---input---base)
		- [global](#fallbackconfig---input---base)
		- [libs](#fallbackconfig---input---libs)
			- [alias](#fallbackconfig---input---libs)
			- [check](#fallbackconfig---input---libs)
			- [deps](#fallbackconfig---input---libs)
			- [exports](#fallbackconfig---input---libs)
			- [init](#fallbackconfig---input---libs)
			- [urls](#fallbackconfig---input---libs)
- [Return Values](#return-values)

===

<h4 align="center">Parameters</h4>

| Parameter | Type   | Default | Required | Description |
| --------- | ------ | ------- | -------- | ----------- |
| *input*   | Object | *null*  | Yes      | Key/Value pair object that contains the configuration for the Fallback JS library. [See more details here.](#fallbackconfig---input) |

===

<h4 align="center">fallback.config -> input</h4>

| Type   | Default | Required |
| ------ | ------- | -------- |
| Object | null    | Yes      |

The following parameters are allowed for the first level of our `input` `Object`. The `Object` itself has multiple levels which are listed further down in this document.

| Parameter                                        | Type          | Default  | Required | Description   |
| ------------------------------------------------ | ------------- | -------- | -------- | ------------- |
| [amd](#fallbackconfig---input---amd)             | Boolean       | false    | No       | Where or not to enforce AMD on the page. |
| [base](#fallbackconfig---input---amd)            | Object/String | null     | No       | Object/String to be used as the prefix for all URLs with. |
| [debug](#fallbackconfig---input---amd)           | Boolean       | false    | No       | Toggle debugging mode. |
| [delimiter](#fallbackconfig---input---delimiter) | String        | $        | No       | The delimiter string to be specified when loading non-JavaScript files. |
| [global](#fallbackconfig---input---global)       | Object        | *window* | No       | Object to use when searching for our exports to check if a library has loaded. |
| [libs](#fallbackconfig---input---libs)           | Object        | null     | No       | An object containing the configuration for each of your libraries. |

**Example:**

```javascript
fallback.config({
	"amd": false,
	"base": "./js/",
	"debug": true,
	"delimiter": "$",
	"global": window,

	"libs": {
		"angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min",
		"css$bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min",
		"img$logo": "http://fallback.io/img/logo.png"
	}
});
```

===

<h4 align="center">fallback.config -> input -> amd</h4>

| Type    | Default | Required |
| ------- | ------- | -------- |
| Boolean | false   | No       |

This configuration parameter allows you to enforce [AMD (Asynchronous Module Definitions)](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) for the Fallback JS library.

AMD for the library is enabled, but it's not enforced by default. In other words, if a library that supports AMD attempts to load, it won't be used as a module, it instead will be retained in the global scope of the page, untethered by the Fallback JS library.

By enabling AMD, any JavaScript libraries that support it will no longer be available in the global scope (the `window` object) of your page. The reasoning behind this is to encapsulate JavaScript libraries so that they're contained and not dirtying up the global scope.

This can be useful when used at an advanced level. In practice the level of complexitiy and time required to invest just to make this work properly isn't practical for most projects seeking a simply solution. Therefore this feature is `disabled` by default. Use this feature at your own discretion.

**Example:**

```javascript
// Enable AMD.
fallback.config({
	"amd": true
});
```

===

<h4 align="center">fallback.config -> input -> base</h4>

| Type          | Default | Required |
| ------------- | ------- | -------- |
| Object/String | null    | No       |

If the `base` value is a `String`, all of your URLs will be prefixed with this path regardless of the type of file. If you specify an `Object` for the value, you can explicity set different paths to prefix for your URLs per each file type. Any URL that starts with `/`, `data:`, `http://` or `https://` will not be prefixed with the `base` value.

The following table below reflects acceptable parameters when the value of `base` is an `Object`.

| Parameter | Type   | Default | Required | Description |
| --------- | ------ | ------- | -------- | ----------- |
| css       | String | *null*  | No       | The path to prefix all of your CSS files with. |
| img       | String | *null*  | No       | The path to prefix all of your images with. |
| js        | String | *null*  | No       | The path to prefix all of your JS files with. |

**Example:**

```javascript
// Set base URLs for all of our file types.
fallback.config({
	"base": "./js/"
});
```

```javascript
// Set different base URLs for each of our file types.
fallback.config({
	"base": {
		"css": "./css/",
		"img": "./img/",
		"js": "./js/"
	}
});
```

===

<h4 align="center">fallback.config -> input -> debug</h4>

| Type    | Default | Required |
| ------- | ------- | -------- |
| Boolean | false   | No       |

This configuration parameter allows you toggle debugging for the library. If turned on, this feature will log useful debugging information to the console, if the browser supports `window.console`.

This feature is only available in the non-minified version of the library. For better compression, all logging messages have been stripped out of the minified version.

**Example:**

```javascript
// Turn debugging on.
fallback.config({
	"debug": true
});
```

===

<h4 align="center">fallback.config -> input -> delimiter</h4>

| Type   | Default | Required |
| ------ | ------- | -------- |
| String | $       | No       |


This configuration parameter allows you to change the string that's used to specify different file types for the Fallback JS library to load. By default the value is a `$`, and if you want to load a CSS file you would need to prefix your library with `css$` that way Fallback JS would know to load it as a CSS file and not a JavaScript file.

*See [fallback.config -> input -> libs -> keys](#fallbackconfig---input---libs---keys) for a list of prefixes you can use.*

**Example:**

```javascript
// This example uses our default.
fallback.config({
	"libs": {
		"css$bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min"
	}
});

// Load up our CSS file.
fallback.require(function(css$bootstrap) {
	// Execute my code here...
});
```

```javascript
// This example explicity sets the delimiter value.
fallback.config({
	"delimiter": "_",

	"libs": {
		"css_bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min"
	}
});

// Load up our CSS file.
fallback.require(function(css_bootstrap) {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> global</h4>

| Type   | Default  | Required |
| ------ | -------- | -------- |
| Object | *window* | No       |

This configuration parameter allows you to set what you want the `global` to be for the page. By default this is set to `window` but can be changed to whatever you prefer.

**This variable directly affects how libraries are loaded by the Fallback JS library.**

Whatever `exports` are specified for a library are searched upon in this `global` `Object` when we attempt to load our libraries. Let's take `jQuery` as an example. When you load `jQuery` on a page, `window.jQuery` holds a reference to the library. If we were to change our `global` value to say `app`, when Fallback JS attempts to load the `jQuery` library it will check if `app.jQuery` exists to determine whether or not the library actually loaded successfully or not. If `app.jQuery` doesn't exist, then it would assume that the library failed to load, and attempt the next URL for the `jQuery` library if it has one.

**Warning: If you set the value of `global` to `null`, the library will fallback to relying on the browsers native callbacks to know whether or not a library has successfully loaded.** This is problematic with legacy browsers, and not recommended if you wish to support them. You'll also forfeit the functionality within Fallback JS that checks if a library has already loaded by some other means on the page other than by Fallback JS when a library is requested to be loaded.

**Example:**

```javascript
// Define our `app` reference.
var app = {};

// Set `app.homepage` to a non-falsey value.
app.homepage = true;

// Configure the Fallback JS library.
fallback.config({
	// Use the `app` reference as our global.
	"globals": app,

	"libs": {
		"homepage": {
			// If `app.homepage` already exists, don't attempt to lazy load the file.
			"exports": "homepage",

			// The path of our JavaScript file that doesn't use the `define` function.
			"urls": "homepage"
		}
	}
});

// This won't attempt to load `homepage.js` since `app.homepage` already exists.
fallback.require(function(homepage) function() {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> libs</h4>

| Type   | Default | Required |
| ------ | ------- | -------- |
| Object | null    | No       |

This configuration parameter allows you to set the libraries that want Fallback JS to load.

===

<h4 align="center">fallback.config -> input -> libs -> keys</h4>

| Type   | Default | Required |
| ------ | ------- | -------- |
| String | null    | Yes      |

The `keys` of this `Object` are what you'll use to reference the library in question. For example if we added a key `test`, when we use the [require](@todo) function, we would specify `test` to load that library even though it may differ from the name of the actual library itself. Another example would be `jQuery`, but instead we want to use `jquery` so we don't have to capitalize the `Q`.

Any `keys` of the `libs` `Object` which have any of the following prefixes (listed in the table below) followed by the libraries [delimiter](#fallbackconfig---input---delimiter) will be handled in their own special way.

| Prefix | Description   |
| ------ | ------------- |
| css    | All files listed for the library in question would be loaded as Cascading Style Sheets. |
| img    | All files listed for the library in question would be loaded as images. |
| js     | All files listed for the library in question would be loaded as JavaScript files. |

**Example**

```javascript
// The following example illustrates how we'd load CSS, image and JavaScript files.
fallback.config({
	"libs": {
		// Load this file as a stylesheet.
		"css$bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min",

		// This will load our logo image.
		"img$logo": "http://fallback.io/img/logo.png",

		// You don't have to specify `js$`, it's prefixed by default.
		"js$angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular.min"
	}
});

// Load our stylesheet, image and JavaScript files.
fallback.require(function(css$bootstrap, img$logo, js$angular) {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> libs -> key - > values</h4>

| Type                | Default | Required |
| ------------------- | ------- | -------- |
| Array/Object/String | null    | Yes      |

The `values` of our `keys` are acceptable in the following forms:

- `String` - it will be treated as the [URL](#fallbackconfig---input---libs---key----values---urls) for the library.
- `Array` - it will be treated as the [URLs](#fallbackconfig---input---libs---key----values---urls) for the library.
- `Object` - it may have it's own specific configuration set. See below.

If the `value` of our `key` is an `Object`, then the following parameters are acceptable:

| Parameter                                                           | Type         | Default | Required | Description |
| ------------------------------------------------------------------- | ------------ | ------- | -------- | ----------- |
| [alias](#fallbackconfig---input---libs---key----values---alias)     | Array/String | *null*  | No       | Aliases to be used to directly reference the library in question. |
| [check](#fallbackconfig---input---libs---key----values---check)     | Function     | *null*  | No       | A function to check whether or not a library is loaded on the page. |
| [deps](#fallbackconfig---input---libs---key----values---deps)       | Array/String | *null*  | No       | Dependencies that are required to load prior to the library in question loading. |
| [exports](#fallbackconfig---input---libs---key----values---exports) | String       | *null*  | No       | The global variable(s) that reference the library. |
| [init](#fallbackconfig---input---libs---key----values---init)       | Function     | *null*  | No       | A function to invoke immediately after a library has loaded for the first time. |
| [urls](#fallbackconfig---input---libs---key----values---urls)       | Array/String | *null*  | No       | URLs that will load the library. |

**Examples:**

```javascript
// An example where our libraries value is an `String`.
fallback.config({
	"libs": {
		"jquery": "//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min"
	}
});

// Load jQuery!
fallback.require(function(jquery) {
	// Execute my code here...
});
```

```javascript
// An example where our libraries value is an `Array`.
fallback.config({
	"libs": {
		"jquery": [
			"//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min",
			"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min"
		]
	}
});

// Load jQuery!
fallback.require(function(jquery) {
	// Execute my code here...
});
```

```javascript
// An example where our libraries value is an `Object`.
fallback.config({
	"libs": {
		"jquery": {
			"exports": "jQuery",

			"urls": [
				"//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min"
			]
		}
	}
});

// Load jQuery!
fallback.require(function(jquery) {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> alias</h4>

This configuration parameter allows you to set ..... @todo

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> check</h4>

@todo

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> deps</h4>

@todo

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> exports</h4>

@todo

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> init</h4>

@todo

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> urls</h4>

@todo

===

<h4 align="center">Return Values</h4>

| Value | Type    | Description |
| ----- | ----    | ----------- |
| true  | Boolean | The config was imported properly. |
| false | Boolean | The config wasn't imported due to being malformed. Turn debugging on and check console for helper messages. |

-----

### **fallback.define(`name`, `dependencies`, `factory`)**

***Aliases:*** `def`, `define`, `fallback.def`, `fallback.define`, `fbk.def`, `fbk.define`

This function allows you to define your JavaScript files in a definition like manner. This has proven to be beneficial when working on larger projects where you want to compartmentalize sections of a project.

Let's say you have a website with a 3-4 pages that used `jQuery`, while the rest of your website was solely using `Angular JS`. After tracking your user load times, you've found that having to load `jQuery` was having a significant impact on your pages load time and decided to drop `jQuery` from being loaded on every page, and instead just have it lazy load on the few pages that actually needed it. If you had used the `define` `Function`, explicitly stating which parts of the code required `jQuery`, then removing `jQuery` from loading on every page would work seemlessly. If you didn't, you'd have to go back and re-work those areas that did.

- [Parameters](#parameters-1)
	- [name](#fallbackconfig---input)
	- [dependencies](#fallbackconfig---input---base)
	- [factory](#fallbackconfig---input---base)
- [Return Values](#return-values)

===

<h4 align="center">Parameters</h4>

| Parameter    | Type         | Required | Default | Description |
| ------------ | ------------ | -------- | ------- | ----------- |
| name         | String       | No       | null    | If a name is not set, the URL that was used to load the file will be used as the name. |
| dependencies | Array/String | No       | null    | Dependencies that we expect to be load prior to invoking our `factory` `Function`. |
| factory      | N/A          | Yes      | null    | A factory can be anything. An `Array`, `Boolean`, `Element`, `Number`, `Object`, `String`, etc. |

The parameters in this function will fallback on one another in the following manner:

- If only 1 parameter is passed in, it'll be treated as the `factory`.
- If only 2 parameters are passed in, they'll be treated as:
	 - The `dependencies` and `factory` if the first parameter is **NOT** a `String`.
	 - The `name` and `factory` if the first parameter is a `String`.
- If all 3 parameters are passed in, they'll be treated as the `name`, `dependencies` and `factory`.

If no dependencies are passed in and the `factory` is a `Function`, then whatever parameters the `factory` has will become the dependencies. For example if you were to write `fallback.define(function(angular, jquery)) {}` then both `angular` and `jquery` would become the dependencies, and would load prior to invoking the `Function`.

**Examples:**

```javascript
// Load jQuery before executing the factory.
fallback.define(function(jquery) {
	// Execute my code here...
});
```

```javascript
// Load jQuery before executing the factory.
fallback.define(['jquery'], function(jquery) {
	// Execute my code here...
});
```

```javascript
// Load jQuery before executing the factory.
fallback.define('test', function(jquery) {
	// Execute my code here...
});
```

```javascript
// Load jQuery before executing the factory.
fallback.define('test', ['jquery'], function(jquery) {
	// Execute my code here...
});
```

===







@todo @todo @todo @todo





===

<h4 align="center">Parameters</h4>

| Parameter    | Type         | Required | Default | Description |
| ------------ | ------------ | -------- | ------- | ----------- |
| name         | String       | No       | null    | If a name is not passed in, the URL that was used to load the file in question will be used as the name for this definition. Please note that you can't have multiple nameless/anonymous definitions in the same file. |
| dependencies | Array/String | No       | null    | A string/array of dependencies that we expected to be loaded before executing our function. |
| factory      | Function     | Yes      | null    | If dependencies are specified, then they will be sent to this function as their arguments. However, if you don't specify the dependencies, whatever arguments are within this function will be correlated as the dependencies for this function. See below for further details along with an example. |

**Example:**

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

# FAQ

##### Q: What dependencies does Fallback JS have?

**A:** None! Fallback JS is a standalone library.

-

##### Q: What browser versions are supported?

**A:** Android 4.0+, Chrome (Latest), FireFox (Latest), IE 6+, iOS 5+, Safari (Latest)

-

##### Q: Can I provide multiple fallbacks for any given asset?

**A:** Yes! You can provide as many as you want, there's no limit.

-

##### Q: How should Fallback JS be loaded?

**A:** @todo

-

##### Q: Can I load up my CSS and JavaScript files in a single configuration block?

A: Yes, please see the example at the top of the `README.md` file.

-

##### Q: Can I run the `config` function more than once?

A: Yes. @todo

-

##### Q: Why can't I call the `define` function more than once without a name in the same file?

A: @todo

-

##### Q: What happens if I set the `base` configuration parameter more than once?

A: @todo

-----

# About

### Contributing

Please read the [CONTRIBUTING.md](https://github.com/dolox/fallback/blob/master/CONTRIBUTING.md) document located in this project to see how you can help contribute. We encourage our users to test and report all/any problems they find with the library.

### License

[The MIT License (MIT)](https://github.com/dolox/fallback/blob/master/LICENSE.txt)

-----

# Support

### Need help? We use GitHub!

Any questions, suggestions or bugs should all be submitted to the issues section of the projects GitHub repository.

### Staying Alive

Over the course of this projects life span, we've come to find that 4-5x the star gazers on GitHub reflects the adoption rate of the project. We encourage our users to star the project, so that it can help us see how large the project is growing and how urgent issues become when they arise.

### Staying Stable

The project contains over 1000 tests that run daily for all of the supported browsers via SauceLabs which is trigger daily by Travis and Tron CI (http://tron-ci.herokuapp.com/). If a new bug were to be introduced for a supported browser which directly affects the library, we would know about it in 24 hours at the latest.
