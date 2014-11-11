/* global describe, expect, fallback, it */

describe('fallback.global', function() {
	var result = fallback.global;

	it('should be an Object', function() {
		expect(result).to.be.an('object');
	});

	it('the key `document` should be an Object', function() {
		expect(result.document).to.be.an('object');
	});
});
