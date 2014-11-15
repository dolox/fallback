/* global describe, expect, fallback, it */

describe('tests.unit.core.globals', function() {
	it('should be an Boolean', function() {
		expect(fallback.globals).to.be.an('boolean');
	});
});
