/* global describe, expect, fallback, it */

describe('tests.unit.core.delimiter', function() {
	it('should be a String', function() {
		var test = fallback.delimiter;
		expect(test).to.be.a('string');
	});
});
