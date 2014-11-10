/*global describe, expect, fallback, it*/

describe('isString', function() {
	it('Null should return false.', function() {
		expect(fallback.isString(null)).to.equal(false);
	});

	it('Undefined should return false.', function() {
		expect(fallback.isString(undefined)).to.equal(false);
	});

	it('Array should return false.', function() {
		expect(fallback.isString([])).to.equal(false);
	});

	it('String should return true.', function() {
		expect(fallback.isString('String')).to.equal(true);
	});

	it('Number should return false.', function() {
		expect(fallback.isString(0)).to.equal(false);
	});

	it('Object should return false.', function() {
		expect(fallback.isString({})).to.equal(false);
	});

	it('Function should return false.', function() {
		expect(fallback.isString(function() {})).to.equal(false);
	});
});