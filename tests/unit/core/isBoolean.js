/*global describe, expect, fallback, it*/

describe('tests.unit.core.isBoolean', function() {
	it('null should return false.', function() {
		expect(fallback.isBoolean(null)).to.equal(false);
	});

	it('undefined should return false.', function() {
		expect(fallback.isBoolean(undefined)).to.equal(false);
	});

	it('Array should return false.', function() {
		expect(fallback.isBoolean([])).to.equal(false);
	});

	it('String should return false.', function() {
		expect(fallback.isBoolean('String')).to.equal(false);
	});

	it('Number should return false.', function() {
		expect(fallback.isBoolean(0)).to.equal(false);
	});

	it('Object should return false.', function() {
		expect(fallback.isBoolean({})).to.equal(false);
	});

	it('Boolean of false should return true.', function() {
		expect(fallback.isBoolean(false)).to.equal(true);
	});

	it('Boolean of true should return true.', function() {
		expect(fallback.isBoolean(true)).to.equal(true);
	});

	it('Function should return false.', function() {
		expect(fallback.isBoolean(function() {})).to.equal(false);
	});
});
