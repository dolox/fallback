/* global describe, expect, fallback, it */

describe('fallback.browser.isIE11', function() {
	var result = fallback.browser.isIE11();

	it('should be a Boolean', function() {
		expect(typeof result).to.equal('boolean');
	});
});
