/* global describe, expect, fallback, it */

describe('tests.unit.core.normalizeSeries', function() {
	it('should be a Function', function() {
		var test = fallback.normalizeSeries;
		expect(test).to.be.a('function');
	});

	it('should return an Array if an invalid type is passed in without a fallback set', function() {
		var result = fallback.normalizeSeries(1, 'BadType');

		expect(result).to.be.an('array');
		expect(result.join()).to.be.empty();
	});

	it('should return the fallback if an invalid type is passed in with a fallback set', function() {
		var result = fallback.normalizeSeries(1, 'BadType', 'fallback');

		expect(result).to.be.an('array');
		expect(result.join()).to.equal(['fallback'].join());
	});
});
