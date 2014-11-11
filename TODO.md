code documentation
	[x] config
	[x] core					-- couple @todo's fix them
	[x] define
	[x] loader
	[x] loaderImage
	[ ] loaderJavaScript
	[ ] loaderStylesheet
	[ ] module
	[ ] require

@todo
	update the bower json ignore list for the docs, tests, configs from travis. simply include the dist, readme, bower file
	allow ability to stick version #s on the libraries combines w/ FBK CLI
	fetch url of out of combiner, so fallback.url it comes out of from package.json
	add loader delimiter to the config file.
	grep for `indexOf` and use `me.indexOf`
	integrate and test `define.amd = {};`
	dont automatically import aliases as exports, fix that shit
	strip all me.logs(), me.banner, me.log and me.stats function from minification version
	automatically rename the docs fallback.html to index.html after it's generated.

readme documentation
	- delimiter is changeable.
	- add `init` and `check` functions for libs.
	- redocument the `global` attribute in config.
	- change README.md to README.hbs and automatically generate it with the current version # and file sizes of the dists.
	- make links from the root of the project to fallback.min.js in the dist folder.

tests
	- copy over core unit tests to start with and finish out the core.
	- http://stackoverflow.com/questions/4904096/whats-the-difference-between-unit-functional-acceptance-and-integration-test
	- cleanup the example and code document them better for people.

	- Add SauceLabs: https://saucelabs.com/account?new=1
	- Add Travic CI: https://travis-ci.org/
	[x] Add David DM: https://david-dm.org/

contributing
	- Follow https://github.com/rwaldron/idiomatic.js/
		- Style Guidlines: Real Tabs, Single Quotes, No padding spaces in parenthesis: if ( a )
	- update sample code on the website and file size
	- get fallbackjs.com pointing to github and fallback.io to 301
	- replace all fallback.io references

---

deploy to git v2 branch

- migration code from 1.0 to 2.0

---

fallback CLI utility where it automatically adds your libraries to a JSON file and installs via bower
	Programmatic API --- http://bower.io/docs/api/#programmatic-api
	real easy, fallback install bang, same commands hopefully