<p align="center"><img alt="Fallback JS" height="128" src="http://fallback.io/img/logo.png" /></p>
<h1 align="center">Fallback JS</h1>

---

## Getting Started

To let you dive right in, we're going to provide you with a sample of code below. You can view the full [API Documentation](#api-documentation) along with other complex examples listed further down the page.

@todo

simple code snippet here

plnkr links of code examples for people to fork

---

## API Documentation

### Overview

Function | Aliases | Description
------------- | ------------- | -------------
[config](#fallbackconfiginput) | `conf`, `config`, `fallback.conf`, `fallback.config`, `fbk.conf`, `fbk.config` | How to configure Fallback with your libraries.
[define](#fallbackdefinename-dependencies-function) | `def`, `define`, `fallback.def`, `fallback.define`, `fbk.def`, `fbk.define` | How to properly define your JavaScript files.
[require](#fallbackrequiredependencies-function) | `fallback.req`, `fallback.require`, `fbk.req`, `fbk.require`, `req`, `require` | How to go about loading your JavaScript files.

=====

### **fallback.config(`input`)**

***Aliases:*** `conf`, `config`, `fallback.conf`, `fallback.config`, `fbk.conf`, `fbk.config`

This function allows you to configure the defaults along with the URLs for your libraries. It only takes a single parameter, and expects it to be an `Object`. The `keys` of this object will correlate to the variables you'll use to load the library in question.

Parameter | Type | Default | Required | Description
------------- | ------------- | ------------- | ------------- | -------------
*input* | Object | *null* | Yes | The configuration for the Fallback library.

=====

**<p align="center">INPUT</p>**

Parameter | Type | Default | Required | Description
------------- | ------------- | ------------- | ------------- | -------------
base | Object/String | null | No | Accepts an object/string to be used as the prefix for all of your URLs. See the `input.base` table below for further details.
debug | Boolean | false | No | Toggle debugging mode. If turned on, helpful messages will show up in the console.
globals | Boolean | true | No | Whether or not to allow your libraries to be accessible via global scope. If this value is `false` you won't be able to access your libraries directly through the browsers `window` object.
urls | Object | null | Yes | Expects an object containing the configuration for each of your libraries. See the `input.urls` table below for further details.

**Example**

```json
{
	"base": "./js/",
	"debug": true,
	"globals": true,

	"urls": {
		"css!bootstrapCSS": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min",
		"img!imgPreloader": "http://fallback.io/img/logo.png",
		"jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min"
	}
}
```

=====

**<p align="center">INPUT.BASE</p>**

If the `input.url` value is a string, all of your libraries will be prefixed with this path, as long as the path of those libraries doesn't start with `/`, `data:`, `http://` or `https://`. The following table below reflects the acceptable parameters when the value of `input.url` is an object.

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

Parameter | Type | Default | Required | Description
------------- | ------------- | ------------- | ------------- | -------------
*key* | String | *null* | Yes | The subkeys of our objects correlate to the names of our libraries. *Example: 'jQuery'*
*value* | Array/Object/String | *null* | Yes | The acceptable parameters of our *inputs object values* are listed in the table below.

**Example**

```javascript
conf({
	"urls": {
		"jquery": {
			alias: "$",
			files: "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min"
		}
	}
});

req(function($) {
	$('body').html('jQuery Loaded!');
});
```

=====

**<p align="center">INPUT.URLS OBJECT VALUES</p>**

Parameter | Type | Default | Required | Description
------------- | ------------- | ------------- | ------------- | -------------
alias | Array/String | *null* | No | Aliases you want to use for your library. For example you might name your key `jquery` for the jQuery library, but instead of using the variable `jquery` you may want to use `$` to reference it. In that case you would set `$` as an alias.
deps | Array/String | *null* | No | ...
exports | String | *null* | No | ...
files | Array/String | *null* | No | ...
init | Function | *null* | No | ...

@todo much more details needed here

@todo explain css! img! prefixes

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
				"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"
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

### **fallback.define(name, dependencies, function)**

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

**Q: Can I run the `config` function more than once?**

A: Yes.

**Q: Why can't I call the `define` function more than once without a name in the same file?**

A: ...

@todo more here

-----

## About

### Contributing

Please read the [CONTRIBUTING.md](https://github.com/dolox/fallback/blob/master/CONTRIBUTING.md) file located in the root of this project to see how you can help contribute to this project. We encourage our users to test and report all/any problems they find with the library.

### License

[The MIT License (MIT)](https://github.com/dolox/fallback/blob/master/LICENSE.txt)

-----

## Support

### Need help? We use GitHub!

Any questions, suggestions or bugs should all be submitted to the issues section of the projects GitHub repository.

### Staying Alive

Over the course of the life of this project, we've come to find out that about 4-5x the amounts of people are actually actively using this project then what the stars reflects on GitHub. We encourage our users to star the project, so it can help us see how widely the project is growing and how urgent issues are.
