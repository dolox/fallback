/* global describe, expect, fallback, it */

describe('tests.unit.core.aliases', function() {
	var result = fallback.aliases;

	it('should be an Object', function() {
		expect(result).to.be.an('object');
	});
});
