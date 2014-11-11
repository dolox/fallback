/* global describe, expect, fallback, it */

describe('fallback.browser', function() {
	var result = fallback.browser;

	it('should be an Object', function() {
		expect(result).to.be.an('object');
	});
});
