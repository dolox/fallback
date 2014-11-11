/* global describe, expect, fallback, it */

describe('fallback.stats', function() {
	it('should be a Function', function() {
		expect(fallback.isFunction(fallback.stats)).to.equal(true);
	});

	it('should return a String', function() {
		expect(fallback.stats()).to.be.a('string');
	});
});
