/*global describe, expect, fallback, it*/

describe('isDefined', function() {
	it('Undefined should return false.', function() {
		expect(fallback.isDefined(undefined)).to.equal(false);
	});

	it('Null should return true.', function() {
		expect(fallback.isDefined(null)).to.equal(true);
	});

	it('1 should return true.', function() {
		expect(fallback.isDefined(1)).to.equal(true);
	});

	it('Variable should return true.', function() {
		var test = 1;
		expect(fallback.isDefined(test)).to.equal(true);
	});
});