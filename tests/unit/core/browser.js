/* global describe, expect, fallback, it */

describe('tests.unit.core.browser', function() {
	it('should be an Object', function() {
		var test = fallback.browser;
		expect(test).to.be.a('object');
	});
});
