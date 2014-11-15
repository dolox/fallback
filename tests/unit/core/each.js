/* global describe, expect, fallback, it */

describe('tests.unit.core.each', function() {
	it('to always return undefined.', function() {
		expect(fallback.each()).to.be(undefined);
	});

	it('to iterate an Array properly', function() {
		var test = ['a', 'b', 'c'];

		var result = {};

		result.indexes = [];
		result.values = [];

		fallback.each(test, function(value, index) {
			result.indexes.push(index);
			result.values.push(value);
		});

		expect(result.indexes.join(',')).to.equal('0,1,2');
		expect(result.values.join(',')).to.equal(test.join(','));
	});

	it('to iterate an Object properly', function() {
		var test = {
			a: 'b',
			c: 'd',
			e: 'f'
		};

		var result = {};

		result.indexes = [];
		result.values = [];

		fallback.each(test, function(value, index) {
			result.indexes.push(index);
			result.values.push(value);
		});

		expect(result.indexes.join(',')).to.equal('a,c,e');
		expect(result.values.join(',')).to.equal('b,d,f');
	});
});
