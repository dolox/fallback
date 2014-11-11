/* global describe, expect, fallback, it */

describe('fallback.normalize', function() {
	it('should return null if an invalid type is passed in without a fallback set', function() {
		var result = fallback.normalize(1, 'BadType');
		expect(result).to.equal(null);
	});

	it('should return the fallback if an invalid type is passed in with a fallback set', function() {
		var result = fallback.normalize(1, 'BadType', 'fallback');
		expect(result).to.equal('fallback');
	});
});
