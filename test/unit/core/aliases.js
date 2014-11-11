/* global describe, expect, fallback, it */

describe('fallback.aliases', function() {
	var result = fallback.aliases;

	it('should be an Object', function() {
		expect(result).to.be.an('object');
	});
});
