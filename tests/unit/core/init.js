/* global describe, expect, fallback, it */

describe('tests.unit.core.init', function() {
	it('should be a Function', function() {
		var test = fallback.init;
		expect(test).to.be.a('function');
	});
});
