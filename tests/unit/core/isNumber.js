/* global describe, expect, fallback, it */

describe('tests.unit.core.isNumber', function() {
	it('should be a Function', function() {
		var test = fallback.isNumber;
		expect(test).to.be.a('function');
	});

	it('to always return a Boolean', function() {
		var test = fallback.isNumber();
		expect(typeof test).to.equal('boolean');
	});

	it('null should return false.', function() {
		expect(fallback.isNumber(null)).to.equal(false);
	});

	it('undefined should return false.', function() {
		expect(fallback.isNumber(undefined)).to.equal(false);
	});

	it('Array should return true.', function() {
		expect(fallback.isNumber([])).to.equal(false);
	});

	it('String should return false.', function() {
		expect(fallback.isNumber('String')).to.equal(false);
	});

	it('Number should return true.', function() {
		expect(fallback.isNumber(0)).to.equal(true);
	});

	it('Object should return false.', function() {
		expect(fallback.isNumber({})).to.equal(false);
	});

	it('Boolean of false should return false.', function() {
		expect(fallback.isNumber(false)).to.equal(false);
	});

	it('Boolean of true should return false.', function() {
		expect(fallback.isNumber(true)).to.equal(false);
	});

	it('Function should return false.', function() {
		expect(fallback.isNumber(function() {})).to.equal(false);
	});
});
