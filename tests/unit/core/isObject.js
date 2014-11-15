/*global describe, expect, fallback, it*/

describe('fallback.isObject', function() {
	it('null should return false.', function() {
		expect(fallback.isObject(null)).to.equal(false);
	});

	it('undefined should return false.', function() {
		expect(fallback.isObject(undefined)).to.equal(false);
	});

	it('Array should return false.', function() {
		expect(fallback.isObject([])).to.equal(false);
	});

	it('String should return false.', function() {
		expect(fallback.isObject('String')).to.equal(false);
	});

	it('Number should return false.', function() {
		expect(fallback.isObject(0)).to.equal(false);
	});

	it('Object should return true.', function() {
		expect(fallback.isObject({})).to.equal(true);
	});

	it('Boolean of false should return false.', function() {
		expect(fallback.isObject(false)).to.equal(false);
	});

	it('Boolean of true should return false.', function() {
		expect(fallback.isObject(true)).to.equal(false);
	});

	it('Function should return false.', function() {
		expect(fallback.isObject(function() {})).to.equal(false);
	});
});
