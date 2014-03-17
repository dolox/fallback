/*global describe, expect, fallback, it*/

describe('isFunction', function() {
	it('Null should return false.', function() {
		expect(fallback.isFunction(null)).to.equal(false);
	});

	it('Undefined should return false.', function() {
		expect(fallback.isFunction(undefined)).to.equal(false);
	});

	it('Array should return false.', function() {
		expect(fallback.isFunction([])).to.equal(false);
	});

	it('String should return false.', function() {
		expect(fallback.isFunction('String')).to.equal(false);
	});

	it('Number should return false.', function() {
		expect(fallback.isFunction(0)).to.equal(false);
	});

	it('Object should return false.', function() {
		expect(fallback.isFunction({})).to.equal(false);
	});

	it('Function should return true.', function() {
		expect(fallback.isFunction(function() {})).to.equal(true);
	});
});