/*global describe, expect, fallback, it*/

describe('tests.unit.core.isString', function() {
	it('should be a Function', function() {
		var test = fallback.isString;
		expect(test).to.be.a('function');
	});

	it('to always return a Boolean', function() {
		var test = fallback.isString();
		expect(typeof test).to.equal('boolean');
	});

	it('null should return false.', function() {
		expect(fallback.isString(null)).to.equal(false);
	});

	it('undefined should return false.', function() {
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

	it('Boolean of false should return false.', function() {
		expect(fallback.isString(false)).to.equal(false);
	});

	it('Boolean of true should return false.', function() {
		expect(fallback.isString(true)).to.equal(false);
	});

	it('Function should return false.', function() {
		expect(fallback.isString(function() {})).to.equal(false);
	});
});
