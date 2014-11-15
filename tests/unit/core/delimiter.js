/* global describe, expect, fallback, it */

describe('tests.unit.core.delimiter', function() {
	it('should be an String', function() {
		expect(fallback.delimiter).to.be.an('string');
	});
});
