/* global describe, expect, fallback, it */

describe('tests.unit.core.browser.isIE11', function() {
	it('should be a Function', function() {
		var test = fallback.browser.isIE11;
		expect(test).to.be.a('function');
	});

	it('should be a Boolean', function() {
		var test = fallback.browser.isIE11();
		expect(typeof test).to.equal('boolean');
	});
});
