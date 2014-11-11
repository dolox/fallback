/* global describe, expect, fallback, it */

describe('fallback.banner', function() {
	var result = fallback.utility.types;

	it('should be a Array', function() {
		expect(result).to.be.an('array');
	});

	it('should contain 7 items', function() {
		expect(result.length).to.equal(7);
	});
});
