/*global describe, expect, fallback, it*/

describe('tests.unit.core.isFunction', function() {
	it('should be a Function', function() {
		var test = fallback.isFunction;
		expect(test).to.be.a('function');
	});

	it('to always return a Boolean', function() {
		var test = fallback.isFunction();
		expect(typeof test).to.equal('boolean');
	});

	it('null should return false.', function() {
		expect(fallback.isFunction(null)).to.equal(false);
	});

	it('undefined should return false.', function() {
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

	it('Boolean of false should return false.', function() {
		expect(fallback.isFunction(false)).to.equal(false);
	});

	it('Boolean of true should return false.', function() {
		expect(fallback.isFunction(true)).to.equal(false);
	});

	it('Function should return true.', function() {
		expect(fallback.isFunction(function() {})).to.equal(true);
	});
});
