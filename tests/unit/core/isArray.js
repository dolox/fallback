/* global describe, expect, fallback, it */

describe('tests.unit.core.isArray', function() {
	it('should be a Function', function() {
		var test = fallback.isArray;
		expect(test).to.be.a('function');
	});

	it('to always return a Boolean', function() {
		var test = fallback.isArray();
		expect(typeof test).to.equal('boolean');
	});

	it('null should return false.', function() {
		expect(fallback.isArray(null)).to.equal(false);
	});

	it('undefined should return false.', function() {
		expect(fallback.isArray(undefined)).to.equal(false);
	});

	it('Array should return true.', function() {
		expect(fallback.isArray([])).to.equal(true);
	});

	it('String should return false.', function() {
		expect(fallback.isArray('String')).to.equal(false);
	});

	it('Number should return false.', function() {
		expect(fallback.isArray(0)).to.equal(false);
	});

	it('Object should return false.', function() {
		expect(fallback.isArray({})).to.equal(false);
	});

	it('Boolean of false should return false.', function() {
		expect(fallback.isArray(false)).to.equal(false);
	});

	it('Boolean of true should return false.', function() {
		expect(fallback.isArray(true)).to.equal(false);
	});

	it('Function should return false.', function() {
		expect(fallback.isArray(function() {})).to.equal(false);
	});
});
