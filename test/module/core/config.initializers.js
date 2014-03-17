/*global describe, expect, fallback, it*/

describe('config.initializers', function() {
	// Load up test modules, required for initializers import.
	fallback.module('test1');
	fallback.module('test2');

	it('should always return an object.', function() {
		var initializers = fallback.config.initializers();
		expect(initializers).to.be.a('object');
	});

	it('non-existant modules should be excluded.', function() {
		var initializers = fallback.config.initializers({
			test3: function() {}
		});

		expect(initializers.test3).to.equal(undefined);
	});

	it('non-function value should be discarded.', function() {
		var initializers = fallback.config.initializers({
			test1: 'test5'
		});

		expect(initializers.test1).to.equal(undefined);
	});

	it('initializers should be imported to initializers object properly.', function() {
		fallback.config.initializers({
			test1: function() {}
		});

		expect(fallback.initializers.test1).to.be.a('function');
	});
});