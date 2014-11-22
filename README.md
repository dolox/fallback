<p align="center"><a href="http://fallback.io/" target="_blank"><img alt="Fallback JS" height="128" src="http://fallback.io/img/logo.png" /></a></p>
<h1 align="center">Fallback JS v2.0.0</h1>
<h6 align="center">16 KB Compressed / 87.31 KB Uncompressed</h6>

<p align="center">
	<a href="https://raw.githubusercontent.com/dolox/fallback/v2.0.0/dist/fallback.min.js"><img src="https://img.shields.io/badge/production-16KB-brightgreen.svg" /></a>
	<a href="https://raw.githubusercontent.com/dolox/fallback/v2.0.0/dist/fallback.js"><img src="https://img.shields.io/badge/development-87.31KB-brightgreen.svg" /></a>
	<a href="http://badge.fury.io/gh/dolox%2Ffallback" target="_blank"><img src="https://badge.fury.io/gh/dolox%2Ffallback.svg" /></a>
	<a href="http://badge.fury.io/bo/fallback" target="_blank"><img src="https://badge.fury.io/bo/fallback.svg" /></a>
	<a href="https://github.com/dolox/fallback/blob/master/LICENSE.txt"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" /></a>

	<br />

	<a href="https://travis-ci.org/dolox/fallback" target="_blank"><img src="https://travis-ci.org/dolox/fallback.svg" /></a>
	<a href="https://codeclimate.com/github/dolox/fallback" target="_blank"><img src="http://img.shields.io/codeclimate/github/dolox/fallback.svg" /></a>
	<a href="https://codeclimate.com/github/dolox/fallback" target="_blank"><img src="http://img.shields.io/codeclimate/coverage/github/dolox/fallback.svg" /></a>
	<a href="https://david-dm.org/dolox/fallback" target="_blank"><img src="https://david-dm.org/dolox/fallback/status.svg" /></a>
	<a href="https://david-dm.org/dolox/fallback#info=devDependencies" target="_blank"><img src="https://david-dm.org/dolox/fallback/dev-status.svg" /></a>

	<br />
	<br />

	<a href="https://saucelabs.com/u/fallback" target="_blank"><img src="https://saucelabs.com/browser-matrix/fallback.svg" /></a>

	<br />
</p>

- [Getting Started](#getting-started)
- [Open Source Examples](#open-source-examples)
- [Tools](#tools)
- [Special HTML Attributes](#special-html-attributes)
- [API Documentation](#api-documentation)
- [FAQ](#faq)
- [About](#about)
- [Contributing](https://github.com/dolox/fallback/blob/master/CONTRIBUTING.md)
- [Support](#support)

---

# Getting Started

To let you dive right in, we're going to provide you with the sample of code below. You can view the full [API Documentation](#api-documentation) along with other complex examples listed further down in this document.

**index.html**

```html
<html>
<head>
	<!-- The `data-main` attribute tells the library to load `main.js` -->
	<script async data-main="main" src="fallback.min.js" type="text/javascript"></script>
</head>

<body class="text-center">
	<h1>Libraries Loaded</h1>
</body>
</html>
```

**main.js**
```javascript
cfg({
	// The list of libraries that we want use for our project.
	"libs": {
		// Include `Twitter Bootstrap`.
		// We explicity prefix `css to the beginning of our key so Fallback JS
		// knows to load this library as a Cascading Stylesheet (CSS).
		"css$bootstrap": {
			// Fallback JS will check to see if this style currently exists on the
			// page. If it does exist, the library will not attempt to load the file
			// as it will assume it's already been loaded on the page.
			"exports": ".col-xs-12",

			// The URLs to load `Twitter Bootstrap`.
			"urls": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min"
		},

		// Include `jQuery`.
		"jQuery": {
			// The URLs to load `jQuery`.
			"urls": [
				"//.....some-bad-cdn...../.....FAIL-ON-PURPOSE.....",
				"//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min"
			]
		},

		// Include `jQuery UI`.
		"jQueryUI": {
			// The global vaiable that is set by `jQuery UI` when it's loaded on the
			// page. If this variable is defined we won't attempt to load it.
			"exports": "jQuery.ui",

			// Load `jQuery` first before loading `jQuery UI`.
			"deps": "jQuery",

			// The URLs to load `jQuery UI`.
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
```

---

# Open Source Examples

If you happen to stumble upon any helpful open source examples which aren't listed here, please let us know and we'll add them to the list! **[Let us know here!](https://github.com/dolox/fallback/issues)**

- [Examples](https://github.com/dolox/fallback/tree/master/examples)
*A number of examples included in the project which illustrate how you can use the Fallback JS library.*

	- [Getting Started](https://github.com/dolox/fallback/tree/master/examples/getting-started)
	*A simple illustration of how to get started.*

	- [Loading Scripts](https://github.com/dolox/fallback/tree/master/examples/loading-scripts)
	*How to go about configuring JavaScript libraries to work with Fallback JS.*

	- [Loading Stylesheets](https://github.com/dolox/fallback/tree/master/examples/loading-stylesheets)
	*How to go about configuring Stylesheets to work with Fallback JS.*

	- [Loading Images](https://github.com/dolox/fallback/tree/master/examples/loading-images)
	*How to go about configuring Images to work with Fallback JS.*

	- [AMD Enforced](https://github.com/dolox/fallback/tree/master/examples/amd-enforced)
	*Illustration of how to enforce the use of AMD (Asynchronous Module Definitions) with the library.*

	- [Anonymous Modules](https://github.com/dolox/fallback/tree/master/examples/anonymous-modules)
	*Illustration of how we can load files/modules without having any configuration set for them.*

	- [Debugging](https://github.com/dolox/fallback/tree/master/examples/debugging)
	*How to turn on debugging with the library.*

- [#fallbackjs on Plunker](http://plnkr.co/tags/fallbackjs)
*Look on Plunker under the tag `#fallbackjs` to see a number of examples that've been posted by users.*

---

# Tools

If you happen to stumble upon any helpful tools which aren't listed here, please let us know and we'll add them to the list! **[Let us know here!](https://github.com/dolox/fallback/issues)**

- [fallback-cli](https://github.com/dolox/fallback-cli)
*Node JS package which will automatically build your `fallback.config` based upon your bower dependencies.*

---

# Special HTML Attributes

The following attributes serve as short-hand which you can add to your HTML `<script>` elements.

| Attribute | Description |
| --------- | ----------- |
| base      | If the attribute `base` exists on a `<script>` element on the page, then Fallback JS will automatically set this as the [base](#fallbackconfig---input---base) configuraton for the project. This attribute is explicitly configured prior to the `main` attribute so that the value of `main` will use this value as it's base path. *Alias: `data-base`* |
| main      | If the attribute `main` exists on a `<script>` element on the page, then Fallback JS will automatically [require](#fallbackrequiredependencies-factory-error) this file. *Alias: `data-main`*  |

**Example:**

```html
<html>
<head>
	<!-- This will automatically load `/js/main.js` -->
	<script data-base="/js/" data-main="main" src="fallback.min.js"></script>
</head>

<body class="text-center">
	<h1>Libraries Loaded</h1>
</body>
</html>
```

---

# API Documentation

A technical overview with in depth explanations of the libraries functionality.

### Overview

| Function                                                 | Aliases                                                                                                          | Description   |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------- |
| [config](#fallbackconfiginput)                           | `cfg`, `conf`, `config`, `fallback.cfg`, `fallback.conf`, `fallback.config`, `fbk.cfg`, `fbk.conf`, `fbk.config` | Configures the libraries you want to load for your project. |
| [define](#fallbackdefinename-dependencies-factory-error) | `def`, `define`, `fallback.def`, `fallback.define`, `fbk.def`, `fbk.define`                                      | Define your JavaScript files so they can be easily loaded and referenced. |
| [require](#fallbackrequiredependencies-factory-error)          | `fallback.req`, `fallback.require`, `fbk.req`, `fbk.require`, `req`, `require`                                   | Loads your libraries asynchronously the page. |
| [stats](#fallbackstats)                                  | `fallback.stats`, `fbk.stats`                                                                                    | Exports statistics for any libraries that were loaded. |
| [version](#fallbackversion)                              | `fallback.version`, `fbk.version`                                                                                | Get the current version number of Fallback JS. |

===

### fallback.config(`input`)

***Aliases:*** `cfg`, `conf`, `config`, `fallback.cfg`, `fallback.conf`, `fallback.config`, `fbk.cfg`, `fbk.conf`, `fbk.config`

This function allows you to configure the defaults for your project along with the libraries that you want to load with Fallback JS.

- [Parameters](#parameters)
	- [input](#fallbackconfig---input)
		- [amd](#fallbackconfig---input---amd)
		- [base](#fallbackconfig---input---base)
		- [debug](#fallbackconfig---input---debug)
		- [delimiter](#fallbackconfig---input---delimiter)
		- [globals](#fallbackconfig---input---globals)
		- [libs](#fallbackconfig---input---libs)
			- [keys](#fallbackconfig---input---libs---keys)
			- [values](#fallbackconfig---input---libs---key---values)
				- [alias](#fallbackconfig---input---libs---key----values---alias)
				- [check](#fallbackconfig---input---libs---key----values---check)
				- [deps](#fallbackconfig---input---libs---key----values---deps)
				- [exports](#fallbackconfig---input---libs---key----values---exports)
				- [init](#fallbackconfig---input---libs---key----values---init)
				- [urls](#fallbackconfig---input---libs---key----values---urls)
				- [version](#fallbackconfig---input---libs---key----values---version)
- [Return Values](#return-values)

===

<h4 align="center">Parameters</h4>

| Parameter                        | Type   | Default | Required | Description |
| -------------------------------- | ------ | ------- | -------- | ----------- |
| [input](#fallbackconfig---input) | Object | *null*  | Yes      | Key/Value pair `Object` which contains the configuration for the Fallback JS library. |

===

<h4 align="center">fallback.config -> input</h4>

| Type   | Default | Required |
| ------ | ------- | -------- |
| Object | null    | Yes      |

The following parameters are allowed for the first level of our `input` `Object`. The `Object` itself has multiple levels which are listed further down in this document.

| Parameter                                        | Type           | Default | Required | Description   |
| ------------------------------------------------ | -------------- | ------- | -------- | ------------- |
| [amd](#fallbackconfig---input---amd)             | Boolean        | false   | No       | Where or not to enforce the use of AMD on the page. |
| [base](#fallbackconfig---input---base)           | Object/String  | null    | No       | Specific paths that you want to prefix all of your libraries with. |
| [debug](#fallbackconfig---input---debug)         | Boolean/String | false   | No       | Toggle debugging mode. Only work in browsers which support `console`. |
| [delimiter](#fallbackconfig---input---delimiter) | String         | $       | No       | The `String` delimiter to be used when loading non-JavaScript files. |
| [globals](#fallbackconfig---input---globals)     | Object         | true    | No       | Whether or not to leverage the `window` `global` when loading libraries. |
| [libs](#fallbackconfig---input---libs)           | Object         | null    | No       | An `Object` containing the configuration for a specific library. |

**Example:**

```javascript
fallback.config({
	"amd": false,
	"base": "/js/",
	"debug": true,
	"delimiter": "$",
	"globals": true,

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

AMD for the library is enabled, but it's not enforced by default. In other words, if a library that supports AMD attempts loads on the page, it will not be be used as a module, it instead will be retained in the `window` `global` on the page, untethered by the Fallback JS library.

By enabling AMD, any JavaScript libraries that support it will no longer be available in the `window` `global` on your page. The reasoning behind this is to encapsulate JavaScript libraries so that they're contained and not dirtying up the global scope. This has been proven to be useful when used at an advanced level.

**Reality Check:** In practice the level of complexitiy and time required to invest just to make this work properly isn't practical for most projects seeking a simplified solution of lazy loading libraries. Therefore this feature is `disabled` by default. *Use this feature at your own discretion.*

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

If the `base` value is a `String`, each of your libraries URLs will be prefixed with this path regardless of their file type. If you specify an `Object`, you can explicity set different paths for each of your file types. Any URL that starts with `/`, `data:`, `http://` or `https://` will not be prefixed with the `base` value.

Each URL for a library is prefixed immediately when it's configured. If you were add a library to your configuration and then set the `base` value afterwards, the URLs for that library wouldn't be prefixed with the newly set `base` value.

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
	"base": "/js/"
});
```

```javascript
// Set different base URLs for each of our file types.
fallback.config({
	"base": {
		"css": "/css/",
		"img": "/img/",
		"js": "/js/"
	}
});
```

===

<h4 align="center">fallback.config -> input -> debug</h4>

| Type           | Default | Required |
| -------------- | ------- | -------- |
| Boolean/String | false   | No       |

This configuration parameter allows you toggle debugging for the library. If turned on, this feature will log useful debugging information to the console, if the browser supports `window.console`.

This feature is only available in the non-minified version of the library. For better compression, all logging messages have been stripped out of the minified version.

The following table below reflects acceptable values for the `debug` parameter.

| Value | Description |
| ----- | ----------- |
| false | Disabled logging. |
| true  | Log everything. This includes errors, warnings and info notices. |
| error | Log all only error notices. |
| warn  | Log all only warning notices. |
| info  | Log all only info notices. |

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


Allows you to change the string that's used to specify different file types for the Fallback JS library to load. By default the value is a `"$"`, so if you wanted to load a CSS file you'd need to prefix that library's key with `"css$"`. You need to do this so that Fallback JS knows to load that library as a Cascading Stylesheet (CSS) and not a JavaScript file.

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

<h4 align="center">fallback.config -> input -> globals</h4>

| Type    | Default | Required |
| ------- | ------- | -------- |
| Boolean | true    | No       |

This parameter directly affects how libraries are loaded and referenced by the Fallback JS library. It specifically tells the library to check the `window` `global` to determine if a library has loaded properly and how to reference that library when using the [define](#fallbackdefinename-dependencies-factory-error) and [require](#fallbackrequiredependencies-factory-error) functions.

Any value(s) which are set as [exports](#fallbackconfig---input---libs---key----values---exports) for a library will directly correlate as references to the `window` `global`. For example if you were set the [exports](#fallbackconfig---input---libs---key----values---exports) to `["jQuery", "$"]` for the library `jQuery`, Fallback JS would check for `window.jQuery` and `window. to determine whether or not the library was loaded. If Fallback JS saw either of those `window` variables as `defined`, it would then reference those `window` variables whenever `jQuery` is used with the [define](#fallbackdefinename-dependencies-factory-error) and [require](#fallbackrequiredependencies-factory-error) functions.

**Example:**

```javascript
// Configure the Fallback JS library.
fallback.config({
	"urls": {
		"jQuery": {
			// Tell the library to look for these variables in the `window` `global`.
			"exports": ["jQuery", "$"],
			"urls": "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min"
		}
	}
});

// `jQuery` within this `Function` is simply pointing to `window.jQuery`.
fallback.define("test", function(jQuery) {
	// Execute my code here...
});

// `jQuery` within this `Function` is simply pointing to `window.jQuery`.
fallback.require(function(jQuery) {
	// Execute my code here...
});
```

**Note: If you set the `globals` parameter to `false`, you'll be forfeiting the following functionality:**

- Preventing libraries from lazy loading if they've already loaded on the page by some means other than Fallback JS.

- Detecting whether or not a library has successfully lazy loaded other than by relying on the native browsers callbacks. *Native callbacks don't work properly in legacy browsers.*

- The ability to reference files which aren't using AMD. If you attempt to load a JavaScript file which doesn't use the [define](#fallbackdefinename-dependencies-factory-error) `Function`, then you won't be able to reference it within the `factory` of a [define](#fallbackdefinename-dependencies-factory-error) or [require](#fallbackrequiredependencies-factory-error) statement.

**Example:**

```javascript
fallback.config({
	"globals": false
});
```

===

<h4 align="center">fallback.config -> input -> libs</h4>

| Type   | Default | Required |
| ------ | ------- | -------- |
| Object | null    | No       |

This parameter allows you to set the libraries that want Fallback JS to load. *You don't need to specify AMD, the library will automatically load them by default.*

===

<h4 align="center">fallback.config -> input -> libs -> keys</h4>

| Type   | Default | Required |
| ------ | ------- | -------- |
| String | null    | Yes      |

The `keys` of this `Object` are what you'll use to reference the library in question. For example if we added the key `test`, when we use the [require](#fallbackrequiredependencies-factory-error) function, we would specify `test` to load that library even though it may differ from the name of the actual library itself. Another example would be `jQuery`, but instead we want to use `jquery` so we don't have to capitalize the `Q`.

If the [exports](#fallbackconfig---input---libs---key----values---exports) parameter is not specified for a library, then the `key` will be treated as it's [exports](#fallbackconfig---input---libs---key----values---exports).

Any `keys` of the `libs` `Object` which have any of the following prefixes *(listed in the table below)* followed by the libraries [delimiter](#fallbackconfig---input---delimiter) will be handled in their own special way.

| Prefix | Description   |
| ------ | ------------- |
| css    | All files listed for the library in question would be loaded as Cascading Style Sheets. |
| img    | All files listed for the library in question would be loaded as images. |
| js     | All files listed for the library in question would be loaded as JavaScript files. |

**Example**

```javascript
// The following example illustrates how we'd load CSS, Image and JavaScript files.
fallback.config({
	"libs": {
		// Load this file as a stylesheet.
		"css$bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min",

		// This will load our logo image.
		"img$logo": "http://fallback.io/img/logo.png",

		// You don't have to specify `js, it's prefixed by default.
		"js$angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular.min"
	}
});

// Load our stylesheet, image and JavaScript files.
fallback.require(function(css$bootstrap, img$logo, js$angular) {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> libs -> key -> values</h4>

| Type                | Default | Required |
| ------------------- | ------- | -------- |
| Array/Object/String | null    | Yes      |

The `values` of our `keys` are acceptable in the following forms:

- `String` - it will be treated as the [URL](#fallbackconfig---input---libs---key----values---urls) for the library.
- `Array` - it will be treated as the [URLs](#fallbackconfig---input---libs---key----values---urls) for the library.
- `Object` - it may have it's own specific configuration set. *See the table below.*

If the `value` of our `key` is an `Object`, then the following parameters are acceptable:

| Parameter                                                           | Type         | Default | Required | Description |
| ------------------------------------------------------------------- | ------------ | ------- | -------- | ----------- |
| [alias](#fallbackconfig---input---libs---key----values---alias)     | Array/String | *null*  | No       | Aliases to be used to directly reference the library in question. |
| [check](#fallbackconfig---input---libs---key----values---check)     | Function     | *null*  | No       | A custom `Function` to check whether or not a library has loaded properly. |
| [deps](#fallbackconfig---input---libs---key----values---deps)       | Array/String | *null*  | No       | Dependencies that are required to load prior to the library in question loading. |
| [exports](#fallbackconfig---input---libs---key----values---exports) | Array/String | *key*   | No       | The `window` `global` variable(s) that reference the library. |
| [init](#fallbackconfig---input---libs---key----values---init)       | Function     | *null*  | No       | A function to invoke immediately after a library has loaded for the first time. |
| [urls](#fallbackconfig---input---libs---key----values---urls)       | Array/String | *null*  | No       | URLs that will load the library. |
| [version](#fallbackconfig---input---libs---key----values---version) | String       | *null*  | No       | Set the version number of your library. |

**Examples:**

```javascript
// An example where our libraries value is a `String`.
fallback.config({
	"libs": {
		"jQuery": "//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min"
	}
});

// Load jQuery!
fallback.require(function(jQuery) {
	// Execute my code here...
});
```

```javascript
// An example where our libraries value is an `Array`.
fallback.config({
	"libs": {
		"jQuery": [
			"//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min",
			"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min"
		]
	}
});

// Load jQuery!
fallback.require(function(jQuery) {
	// Execute my code here...
});
```

```javascript
// An example where our libraries value is an `Object`.
fallback.config({
	"libs": {
		"jQuery": {
			"urls": [
				"//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min"
			]
		}
	}
});

// Load `jQuery`
fallback.require(function(jQuery) {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> alias</h4>

| Type         | Default | Required |
| ------------ | ------- | -------- |
| Array/String | null    | No       |

This parameter allows you setup various aliases for each of your libraries. This is extremely useful when you're frequently referencing a library with a long naming convention that you'd prefer to not have to type.

**Example:**

```javascript
// Configure the Fallback JS library.
fallback.config({
	"libs": {
		"jQuery": {
			// All of the following variables will reference `jQuery`.
			"alias": ["$", "jq", "jquery"],

			"urls": [
				"//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min"
			]
		}
	}
});

// All of the following `fallback.require` references below perform the same action!

// Load `jQuery`
fallback.require(function(jQuery) {
	// Execute my code here...
});

// Load `jQuery`
fallback.require(function($) {
	// Execute my code here...
});

// Load `jQuery`
fallback.require(function(jq) {
	// Execute my code here...
});

// Load `jQuery`
fallback.require(function(jquery) {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> check</h4>

| Type     | Default | Required |
| -------- | ------- | -------- |
| Function | null    | No       |

This parameter allows you to write your own custom checking `Function` to determine whether or not the library in question has loaded properly on the page. This can be extremely useful when attempting to load browser specific scripts and/or stylesheets.

| Return Value | Description |
| ------------ | ----------- |
| false        | The library has failed to loaded on the page. Try the next URL in the URLs list. |
| true         | The library has successfully loaded on the page. |

This `Function` expects a `Boolean` return value to determine whether or not a library has loaded successfully. The `check` will run immediately when the library in question is referenced prior to attempting to load any of it's URLs. If the `check` returns `false`, Fallback JS will then attempt to load up each of the URLs for library. The `check` will re-run after attempting to load each URL for the library. Once Fallback JS finds that the `check` has returned `true`, it'll stop attempting to load anymore URLs and flag the library as having loaded successfully.

**Example:**

```javascript
// Configure the Fallback JS library.
fallback.config({
	"libs": {
		"iePolyfills": {
			"check": function() {
				// `window.document.addEventListener` doesn't exist in legacy IE
				// browsers. The following if statement basically says, if we're
				// in legacy IE and `window.iePolyfills` is `undefined` then attempt
				// to load up this JavaScript file; otherwise don't load it.
				if (!window.document.addEventListener && !window.iePolyfills) {
					return false;
				}

				// Let Fallback JS know that this file has loaded properly.
				return true;
			},

			"urls": "/js/iePolyfills"
		}
	}
});

// Load `iePolyfills`
fallback.require(function(iePolyfills) {
	// Execute my code here...
});
```

**iePolyfills.js**
```javascript
window.iePolyfills = true;
```

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> deps</h4>

| Type         | Default | Required |
| ------------ | ------- | -------- |
| Array/String | null    | No       |

This parameter allows you to set the dependencies which are required to load prior to the library in question. When attempting to reference a library using the [define](#fallbackdefinename-dependencies-factory-error) and [require](#fallbackrequiredependencies-factory-error) functions, all of the library dependencies will load first if they haven't already been loaded.

The value of this parameter can be either a `String` or `String Series` *(`Array` of `Strings`)*. The value(s) can correlate to either an [alias](#fallbackconfig---input---libs---key----values---alias) or [key](#fallbackconfig---input---libs---keys) for the library(s) dependency.

A good example is `jQuery UI`. In order for `jQuery UI` to load we must first load `jQuery`, otherwise `jQuery UI` won't load properly.

**Example:**

```javascript
// Configure our Fallback JS library.
fallback.config({
	"libs": {
		"jquery": {
			"alias": "$",
			"exports": "jQuery",
			"urls": "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min"
		},

		"jqueryui": {
			// When `jQuery UI` loads it defines `window.jQuery.ui` as it's `global`
			// variable.
			"exports": "jQuery.ui",

			// Load `jQuery` prior to loaded this library. Notice here that we're
			// using the `alias` for the `jQuery` library. We could've used the
			// value `jQuery` as well and it would've had the same effect.
			"deps": "$",

			"urls": "//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery.min"
		}
	}
});

// Load `jQuery` and `jQuery UI`
fallback.require(function(jqueryui) {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> exports</h4>

| Type         | Default | Required |
| ------------ | ------- | -------- |
| Array/String | null    | No       |

This parameter allows you to tell the Fallback JS library what `window` `global` variable(s) it should expect to be `defined` when attempting to load a library. For example `jQuery UI` would have an exports value of `jQuery.ui` since when `jQuery UI` is loaded it explicitly defines `window.jQuery.ui`. We need to specify this in order to detect whether a library has loaded properly *(especially in legacy browsers)*.

If the [exports](#fallbackconfig---input---libs---key----values---exports) parameter is not specified for a library, then the [key](#fallbackconfig---input---libs---keys) will be treated as it's [exports](#fallbackconfig---input---libs---key----values---exports).

*If the [globals](#fallbackconfig---input---globals) parameter is turned off, all `exports` will be disabled.*

**Example:**

```javascript
// Configure our Fallback JS library.
fallback.config({
	"libs": {
		"$": {
			// In order for this library to have loaded successfully, `window.jQuery`
			// must exist!
			"exports": "jQuery",
			"urls": "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min"
		}
	}
});

// Load `jQuery`
fallback.require(function($) {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> init</h4>

| Type     | Default | Required |
| -------- | ------- | -------- |
| Function | null    | No       |

This parameter allows you to invoke a `Function` immediately after a library has loaded successfully.

**Example:**

```javascript
fallback.config({
	"libs": {
		"jQuery": {
			"init": function() {
				// Execute my code here...
			},

			"urls": "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min"
		}
	}
});
```

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> urls</h4>

| Type         | Default | Required |
| ------------ | ------- | -------- |
| Array/String | *AMD*   | No       |

This parameter allows you to set the URLs that will load the library in question. It expects its value to be either a `String` or `String Series` *(`Array` of `Strings`)*. When loading a library, the URLs in this list will be loaded from first to last (in the `Array`) until either one has loaded successfully or all have been exhausted. You can add as many URLs as you want, there's no limit.

**Example:**

```javascript
// Configure our Fallback JS library.
fallback.config({
	"base": "/js/",

	"libs": {
		"jQuery": {
			"urls": [
				"//.....some-bad-cdn...../.....FAIL-ON-PURPOSE.....",
				"//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
				"//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min"
			]
		}
	}
});

// Fallback JS will attempt to load all of the URLs for `jQuery`
fallback.require(function(jQuery) {
	// Execute my code here...
});
```

If you don't specify the `urls` parameter for a library, then the library will seen as an `AMD`. If the library is deemed as `AMD` then it will attempt to load the local file relative to the [base](#fallbackconfig---input---base) path that was set by the [config](#fallbackconfiginput) `Function`.

**Example:**

```javascript
// Configure our Fallback JS library.
fallback.config({
	"base": "/js/",

	"libs": {
		"test": {
			"alias": "testMod"
		}
	}
});

// Fallback JS will attempt to load `/js/test.js`.
fallback.require(function(testMod) {
	// Execute my code here...
});

// Notice we didn't add a configuration for `test2`, yet Fallback JS will attempt to
// load `/js/test2.js`.
fallback.require(function(test2) {
	// Execute my code here...
});
```

===

<h4 align="center">fallback.config -> input -> libs -> key - > values -> version</h4>

| Type   | Default | Required |
| ------ | ------- | -------- |
| String | null    | No       |

This parameter allows you to set the version of the library in question. This is simply used as a logging tool for developers and will show up in the output of the [stats](#fallbackstats) `Function`.

**Example:**

```javascript
fallback.config({
	"libs": {
		"jQuery": {
			"urls": "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",
			"version": "2.1.1"
		}
	}
});
```

===

<h4 align="center">Return Values</h4>

| Value    | Type    | Description |
| -------- | ------- | ----------- |
| *Object* | Object  | If the configuration was imported properly, an `Object` with the normalized dataset that was imported will be returned. |
| false    | Boolean | The configuration wasn't imported due to being malformed. Turn debugging on and check console for helper messages. |

===

### fallback.define(`name`, `dependencies`, `factory`, `error`)

***Aliases:*** `def`, `define`, `fallback.def`, `fallback.define`, `fbk.def`, `fbk.define`

This function allows you to create a Asynchronous Module Definition *(AMD)*. This has proven to be beneficial when working on larger projects where you want to compartmentalize sections of a larger project.

- [Parameters](#parameters-1)
	- [name](#fallbackdefine---name)
	- [dependencies](#fallbackdefine---dependencies)
	- [factory](#fallbackdefine---factory)
	- [error](#fallbackdefine---error)
- [Return Values](#return-values)

===

<h4 align="center">Parameters</h4>

| Parameter                                      | Type         | Required | Default | Description |
| ---------------------------------------------- | ------------ | -------- | ------- | ----------- |
| [name](#fallbackdefine---name)                 | String       | No       | null    | If a name is not set, the URL that was used to load the file will be used as the name. |
| [dependencies](#fallbackdefine---dependencies) | Array/String | No       | null    | Dependencies that we expect to be load prior to invoking our `factory` `Function`. |
| [factory](#fallbackdefine---factory)           | *N/A*        | Yes      | null    | A factory can be anything except `undefined`. The inoked value of a `factory` is what will be returned whenever the module is referenced. |
| [error](#fallbackdefine---error)               | Function     | No       | null    | If an error occurs, this function will be invoked with the error messages. |

The arguments for this `Function` may be passed in the following variety:

- If only **1 argument** is passed in, it'll be treated as:

	 - The `factory`.

- If only **2 arguments** are passed in, they'll be treated as:

	 - The `name` and `factory` if the first parameter is a `String`.

	 - The `dependencies` and `factory` if the first parameter is an `Array`.

	 - The `factory` and `error` if both parameters are a `Function`.

- If only **3 arguments** are passed in, they'll be treated as:

	 - The `name`, `dependencies` and `factory` if the first parameter is a `String`.

	 - The `dependencies`, `factory` and `error` if the first parameter isn't a `String`.

- If all **4 arguments** are passed in, they'll be treated as:

	- The `name`, `dependencies`, `factory` and `error`.

===


<h4 align="center">fallback.define -> name</h4>

| Type   | Default | Required |
| ------ | ------- | -------- |
| String | null    | No       |

The name which will be used to reference the module from a [define](#fallbackdefinename-dependencies-factory-error) or [require](#fallbackrequiredependencies-factory-error) `Function`.

If you don't specify the name for the definition then it'll be deemed as an anonymous module and use the name of the current file as it's definition name. Note that you cannot have multiple anonymous definitions within the same file as the library has no way of knowing how to differentiate each.

**Example:**

**main.js**

```javascript
fallback.define("testDefine", function() {
	return "test";
});

fallback.require(function(testDefine) {
	// This will log the `String` `test` to the console.
	console.log(testDefine);
});

// Lazy load a module.
fallback.require(function(testAnonymous) {
	// This will log `testAnonymous Module!` to the console.
	console.log(testAnonymous);
});
```

**testAnonymous.js**

```javascript
fallback.define(function() {
	return "testAnonymous Module!";
});
```

===

<h4 align="center">fallback.define -> dependencies</h4>

| Type         | Default | Required |
| ------------ | ------- | -------- |
| Array/String | null    | No       |

This parameter can be an `Array` or `String` of dependencies you want to be loaded prior to invoking the `factory` of your definition.

If no dependencies are set and the `factory` is a `Function`, then whatever parameters the `factory` has will become the dependencies.

**Example:**

```javascript
// Specify the dependencies as an `Array`.
fallback.define("test1", ["testDependency"], function(testDependency) {
	console.log("`test1` Loaded!");
});

// Specify the dependencies as a `String`.
fallback.define("test2", "testDependency", function(testDependency) {
	console.log("`test2` Loaded!");
});

// Specify the dependencies solely within the `factory`. This will load
// `testDependency.js` before attempting to invoke the console log message.
fallback.define("test3", function(testDependency) {
	console.log("`test3` Loaded!");
});
```

===

<h4 align="center">fallback.define -> factory</h4>

| Type  | Default | Required |
| ----- | ------- | -------- |
| *N/A* | null    | Yes      |

@todo

===

<h4 align="center">fallback.define -> error</h4>

| Type     | Default | Required |
| -------- | ------- | -------- |
| Function | null    | No       |


@todo












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

---

### fallback.require(`dependencies`, `factory`, `error`)

***Aliases:*** `fallback.req`, `fallback.require`, `fbk.req`, `fbk.require`, `req`, `require`

The parameters in this function will fallback on one another. So for example, if you only pass in a single parameter, that parameter will be treated as the `function`.

Parameter | Type | Required | Default | Description
------------- | ------------- | ------------- | ------------- | -------------
dependencies | Array/String | No | null | A string/array of dependencies that we expected to be loaded before executing our function.
function | Function | Yes | null | If dependencies are specified, then they will be sent to this function as their arguments. However, if you don't specify the dependencies, whatever arguments are within this function will be correlated as the dependencies for this function. See below for further details along with an example.

@todo here

===

### fallback.stats

===

### fallback.version

---

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

**A:** Ideally Fallback JS should be loaded from the `<head>` element of your HTML page with the `async` attribute set on the `<script>` element. Ideally you'd want Fallback JS to be your only `<script>` element on the page, and load any additional CSS/JS libraries via the Fallback JS configuration by taking advantage of the [special HTML attributes](#special-html-attributes). Be sure to include `type="text/javascript"` for legacy browsers. @todo

**Example:**

```html
<html>
<head>
	<script async src="fallback.min.js" type="text/javascript"></script>
</head>
</html>
```

-

##### Q: Can I load up my CSS and JavaScript files in a single configuration block?

**A:** Yes, please see the [Getting Started](#getting-started) example.

-

##### Q: Can I run the `config` `Function` more than once?

**A:** Yes. You can call the `config` `Function` as many times as you want, but if you call the `config` `Functoin` with a library that already exists you'll override it's values. @todo

-

##### Q: Why can't I call the `define` function more than once without a name in the same file?

**A:** @todo

-

##### Q: What happens if I set the `base` configuration parameter more than once?

**A:** @todo

---

# About

### Contributing

Please read the [CONTRIBUTING.md](https://github.com/dolox/fallback/blob/master/CONTRIBUTING.md) document located in this project to see how you can help contribute. We encourage our users to test and report all/any problems they find with the library.

### License

[The MIT License (MIT)](https://github.com/dolox/fallback/blob/master/LICENSE.txt)

---

# Support

### Need help? We use GitHub!

Any questions, suggestions or bugs should all be submitted to the issues section of the projects GitHub repository.

### Staying Alive

Over the course of this projects life span, we've come to find that 4-5x the star gazers on GitHub reflects the adoption rate of the project. We encourage our users to star the project, so that it can help us see how large the project is growing and how urgent issues become when they arise.

### Staying Stable

The project contains over 1000 tests which run on a daily basis for all of the supported browsers. The tests are run on [SauceLabs](https://saucelabs.com/u/fallback) which is triggered by [Travis CI](https://travis-ci.org/) and [Tron CI](http://tron-ci.herokuapp.com/). If a new bug were to be introduced for a supported browser which directly affects the library, we would know about it in 24 hours at the latest.
