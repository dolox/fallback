/* global describe, expect, fallback, it */

describe('tests.unit.core.stats', function() {
	it('should be a Function', function() {
		var test = fallback.stats;
		expect(test).to.be.a('function');
	});

	it('should be a Function', function() {
		expect(fallback.isFunction(fallback.stats)).to.equal(true);
	});

	it('should return a String', function() {
		expect(fallback.stats()).to.be.a('string');
	});
});
