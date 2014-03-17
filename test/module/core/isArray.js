/*global describe, expect, fallback, it*/

describe('isArray', function() {
	it('Null should return false.', function() {
		expect(fallback.isArray(null)).to.equal(false);
	});

	it('Undefined should return false.', function() {
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

	it('Function should return false.', function() {
		expect(fallback.isArray(function() {})).to.equal(false);
	});
});