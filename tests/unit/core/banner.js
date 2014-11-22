/* global describe, expect, fallback, it */

describe('tests.unit.core.banner', function() {
	it('should be a String', function() {
		var test = fallback.banner;
		expect(test).to.be.a('string');
	});
});
