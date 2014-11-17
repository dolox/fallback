/* global describe, expect, fallback, it */

describe('tests.unit.core.utility', function() {
	it('should be a Function', function() {
		var test = fallback.utility;
		expect(test).to.be.a('function');
	});

	var test = {};

	fallback.utility(test, 'Array');

	it('isArray Function should exist', function() {
		expect(fallback.isFunction(test.isArray)).to.equal(true);
	});

	it('normalizeArray Function should exist', function() {
		expect(fallback.isFunction(test.normalizeArray)).to.equal(true);
	});

	it('normalizeArraySeries Function should exist', function() {
		expect(fallback.isFunction(test.normalizeArraySeries)).to.equal(true);
	});
});
