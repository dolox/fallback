/*global describe, expect, fallback, it*/

describe('config.input', function() {
	it('if base is not a string, should default to null.', function() {
		var input = fallback.config.input({
			base: ['test']
		});

		expect(input.base).to.equal(null);
	});

	it('if dependencies is not a object, should default to object.', function() {
		var input = fallback.config.input({
			dependencies: []
		});

		expect(input.dependencies).to.be.a('object');
	});

	it('if exports is not a object, should default to object.', function() {
		var input = fallback.config.input({
			deps: []
		});

		expect(input.exports).to.be.a('object');
	});

	it('if globals is not a bool, should default to true.', function() {
		var input = fallback.config.input({
			globals: []
		});

		expect(input.globals).to.equal(true);
	});

	it('if globals is false, should be false.', function() {
		var input = fallback.config.input({
			globals: false
		});

		expect(input.globals).to.equal(false);
	});

	it('if initializers is not a object, should default to object.', function() {
		var input = fallback.config.input({
			initializers: []
		});

		expect(input.initializers).to.be.a('object');
	});

	it('if paths is not a object, should default to object.', function() {
		var input = fallback.config.input({
			paths: []
		});

		expect(input.paths).to.be.a('object');
	});

	it('if dependencies empty, fallback on deps.', function() {
		var input = fallback.config.input({
			dependencies: [],
			deps: {
				test: true
			}
		});

		expect(input.dependencies.test).to.equal(true);
	});

	it('if initializers empty, fallback on init.', function() {
		var input = fallback.config.input({
			initializers: [],
			init: {
				test: true
			}
		});

		expect(input.initializers.test).to.equal(true);
	});
});