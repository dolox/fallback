/*global describe, expect, fallback, it*/

describe('isObject', function() {
	it('Null should return false.', function() {
		expect(fallback.isObject(null)).to.equal(false);
	});

	it('Undefined should return false.', function() {
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

	it('Function should return false.', function() {
		expect(fallback.isObject(function() {})).to.equal(false);
	});
});