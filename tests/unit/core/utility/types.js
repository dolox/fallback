/* global describe, expect, fallback, it */

describe('tests.unit.core.utility.types', function() {
	var result = fallback.utility.types;

	it('should be a Array', function() {
		expect(result).to.be.an('array');
	});

	it('should contain 6 items', function() {
		expect(result.length).to.equal(6);
	});
});
