/* global describe, expect, fallback, it */

describe('tests.unit.core.init', function() {
	it('should be a Function', function() {
		var test = fallback.init;
		expect(test).to.be.a('function');
	});

	it('to always return `true`', function() {
		var test = fallback.init();
		expect(test).to.equal(true);
	});

	it('should always be initialized', function() {
		expect(fallback.inited).to.equal(true);
	});
});
