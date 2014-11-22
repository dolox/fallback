/* global config, describe, expect, fallback, it */

describe('tests.unit.config', function() {
	it('should be a Function', function() {
		expect(config).to.be.a('function');
	});

	var tests = [
		true,
		false,
		[],
		'test',
		0,
		function() {},
		undefined,
		null,
		{}
	];

	fallback.each(tests, function(value) {
		if (fallback.isObject(value)) {
			return;
		}

		it('should return an `false` if a non-object is passed in', function() {
			expect(config(value)).to.equal(false);
		});
	});

	it('should return an empty `Object` when an empty `Object` is passed in', function() {
		var test = config({});
		expect(JSON.stringify(test)).to.equal('{}');
	});

	fallback.each(tests, function(value) {
		var expectedValue;

		// Skip undefined.
		if (value === undefined) {
			return;
		}

		// Checking first level of the Object.
		fallback.each(['amd', 'base', 'debug', 'delimiter', 'globals', 'libs'], function(key) {
			var expectedValue;

			// Boolean checks.
			if (fallback.indexOf(['amd', 'debug', 'globals'], key) !== -1) {
				expectedValue = false;

				if (value === true) {
					expectedValue = true;
				}

				expectedValue = expectedValue.toString();

				it('should return an Object with a value of `' + expectedValue + '` for the key `' + key + '`', function() {
					var test = {};
					test[key] = value;
					test = config(test);

					expect(JSON.stringify(test)).to.equal('{"' + key + '":' + expectedValue + '}');
				});

				return;
			}

			// String checks.
			if (key === 'delimiter') {
				expectedValue = '$';

				if (fallback.isString(value)) {
					expectedValue = value;
				}

				expectedValue = expectedValue.toString();

				it('should return an Object with a value of `' + expectedValue + '` for the key `' + key + '`', function() {
					var test = {};
					test[key] = value;
					test = config(test);

					expect(JSON.stringify(test)).to.equal('{"' + key + '":"' + expectedValue + '"}');
				});

				return;
			}

			// `base` check.
			if (key === 'base') {
				expectedValue = 'null';

				if (fallback.isObject(value)) {
					expectedValue = JSON.stringify({
						css: null,
						img: null,
						js: null
					});
				} else if (fallback.isString(value)) {
					expectedValue = '"' + value.toString() + '"';
				}

				it('should return an Object with a value of `' + expectedValue + '` for the key `' + key + '`', function() {
					var test = {};
					test[key] = value;
					test = config(test);

					expect(JSON.stringify(test)).to.equal('{"' + key + '":' + expectedValue + '}');
				});

				return;
			}

			// `libs` check.
			if (key === 'libs') {
				expectedValue = '{}';

				it('should return an Object with a value of `' + expectedValue + '` for the key `' + key + '`', function() {
					var test = {};
					test[key] = value;
					test = config(test);

					expect(JSON.stringify(test)).to.equal('{"' + key + '":' + expectedValue + '}');
				});

				return;
			}
		});

		// Checks second level (libs) of the Object.
		fallback.each(['alias', 'check', 'deps', 'init', 'exports', 'urls'], function(key) {
			// String series checks.
			if (fallback.indexOf(['alias', 'deps', 'exports', 'urls'], key) !== -1) {
				it('should return an Object with a value for the key `' + key + '`', function() {
					expectedValue = {
						libs: {
							test: {
								alias: [],
								check: null,
								deps: [],
								init: null,
								exports: [],
								urls: [],
								version: null
							}
						}
					};

					var test = {};
					test.libs = {};
					test.libs.test = {};
					test.libs.test[key] = value;

					if (fallback.isString(value)) {
						expectedValue.libs.test[key] = [value];
					} else if (fallback.isArray(value)) {
						expectedValue.libs.test[key] = value;
					}

					if (key !== 'exports') {
						expectedValue.libs.test.exports = ['test'];
					}

					expectedValue = JSON.stringify(expectedValue);

					test = config(test);
					expect(JSON.stringify(test)).to.equal(expectedValue);
				});

				return;
			}

			// String checks.
			if (fallback.indexOf(['version'], key) !== -1) {
				it('should return an Object with a value for the key `' + key + '`', function() {
					expectedValue = {
						libs: {
							test: {
								alias: [],
								check: null,
								deps: [],
								init: null,
								exports: [],
								urls: [],
								version: null
							}
						}
					};

					var test = {};
					test.libs = {};
					test.libs.test = {};

					test.libs.test[key] = value;

					if (fallback.isString(value)) {
						expectedValue.libs.test[key] = value;
					}

					if (key !== 'exports') {
						expectedValue.libs.test.exports = ['test'];
					}

					expectedValue = JSON.stringify(expectedValue);

					test = config(test);
					expect(JSON.stringify(test)).to.equal(expectedValue);
				});

				return;
			}

			// Function checks.
			if (fallback.indexOf(['check', 'init'], key) !== -1) {
				it('should return an Object with a value for the key `' + key + '`', function() {
					expectedValue = {
						libs: {
							test: {
								alias: [],
								check: null,
								deps: [],
								init: null,
								exports: [],
								urls: [],
								version: null
							}
						}
					};

					var test = {};
					test.libs = {};
					test.libs.test = {};

					test.libs.test[key] = value;

					if (fallback.isFunction(value)) {
						expectedValue.libs.test[key] = value;
					}

					if (key !== 'exports') {
						expectedValue.libs.test.exports = ['test'];
					}

					expectedValue = JSON.stringify(expectedValue);

					test = config(test);
					expect(JSON.stringify(test)).to.equal(expectedValue);
				});

				return;
			}
		});
	});

	it('should contain the proper paths if `base` is an `Object`', function() {
		var test = config({
			base: {
				css: 'a',
				img: 'b',
				js: 'c'
			}
		});

		expect(test).to.be.an('object');
		expect(test.base).to.be.an('object');
		expect(test.base.css).to.equal('a');
		expect(test.base.img).to.equal('b');
		expect(test.base.js).to.equal('c');
	});
});
