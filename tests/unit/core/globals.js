/* global describe, expect, fallback, it */

describe('tests.unit.core.globals', function() {
	it('should be a Boolean', function() {
		var test = fallback.globals;
		expect(test).to.be.a('boolean');
	});
});
