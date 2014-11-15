/* global describe, expect, fallback, it */

describe('fallback.banner', function() {
	var result = fallback.banner;

	it('should be a String', function() {
		expect(result).to.be.an('string');
	});
});
