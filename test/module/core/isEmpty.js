/*global describe, expect, fallback, it*/

describe('isEmpty', function() {
	it('Null should return true.', function() {
		expect(fallback.isEmpty(null)).to.equal(true);
	});

	it('Undefined should return true.', function() {
		expect(fallback.isEmpty(undefined)).to.equal(true);
	});

	it('Empty array should return true.', function() {
		expect(fallback.isEmpty([])).to.equal(true);
	});

	it('Populated array should return false.', function() {
		expect(fallback.isEmpty([1])).to.equal(false);
	});

	it('Empty string should return true.', function() {
		expect(fallback.isEmpty('')).to.equal(true);
	});

	it('Populated string should return false.', function() {
		expect(fallback.isEmpty('String')).to.equal(false);
	});

	it('Number other than 0 should return false.', function() {
		expect(fallback.isEmpty(1)).to.equal(false);
	});

	it('Number of 0 should return true.', function() {
		expect(fallback.isEmpty(0)).to.equal(true);
	});

	it('Empty object should return true.', function() {
		expect(fallback.isEmpty({})).to.equal(true);
	});

	it('Populated object should return false.', function() {
		expect(fallback.isEmpty({a: 1})).to.equal(false);
	});

	it('Function should return false.', function() {
		expect(fallback.isEmpty(function() {})).to.equal(false);
	});
});