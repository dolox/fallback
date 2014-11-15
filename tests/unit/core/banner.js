/* global describe, expect, fallback, it */

describe('tests.unit.core.banner', function() {
	var result = fallback.banner;

	it('should be a String', function() {
		expect(result).to.be.an('string');
	});
});
