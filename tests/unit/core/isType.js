/*global describe, expect, fallback, it*/

describe('tests.unit.core.isType', function() {
	it('Array should return true for type Array.', function() {
		expect(fallback.isType([], 'Array')).to.equal(true);
	});

	it('String should return false for type Array.', function() {
		expect(fallback.isType('test', 'Array')).to.equal(false);
	});

	it('String should return true for type String.', function() {
		expect(fallback.isType('test', 'String')).to.equal(true);
	});

	it('Array should return false for type String.', function() {
		expect(fallback.isType([], 'String')).to.equal(false);
	});

	it('Number should return true for type Number.', function() {
		expect(fallback.isType(0, 'Number')).to.equal(true);
	});

	it('String should return false for type Number.', function() {
		expect(fallback.isType('test', 'Number')).to.equal(false);
	});

	it('Object should return true for type Object.', function() {
		expect(fallback.isType({}, 'Object')).to.equal(true);
	});

	it('String should return false for type Object.', function() {
		expect(fallback.isType('test', 'Object')).to.equal(false);
	});

	it('Boolean of false should return true for type Boolean.', function() {
		expect(fallback.isType(false, 'Boolean')).to.equal(true);
	});

	it('Boolean of true should return true for type Boolean.', function() {
		expect(fallback.isType(true, 'Boolean')).to.equal(true);
	});

	it('String should return false for type Boolean.', function() {
		expect(fallback.isType('test', 'Boolean')).to.equal(false);
	});

	it('Function should return true for type Function.', function() {
		expect(fallback.isType(function() {}, 'Function')).to.equal(true);
	});

	it('String should return false for type Function.', function() {
		expect(fallback.isType('test', 'Function')).to.equal(false);
	});
});
