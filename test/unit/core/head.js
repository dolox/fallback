/* global describe, expect, fallback, it */

describe('fallback.head', function() {
	var result = fallback.head;

	it('should be a reference to the documents head element', function() {
		expect(result).to.be.an('object');
		expect(fallback.isType(result, 'HTMLHeadElement')).to.equal(true);
	});
});
