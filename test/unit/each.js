/*global describe, expect, fallback, it*/

describe('each', function() {
	it('to always return undefined.', function() {
		expect(fallback.each()).to.equal(undefined);
	});

	it('to iterate an array properly', function() {
		var test = ['a', 'b', 'c'];

		var indexes = [];
		var values = [];

		fallback.each(test, function(value, index) {
			indexes.push(index);
			values.push(value);
		});

		expect(indexes.join(',')).to.equal('0,1,2');
		expect(values.join(',')).to.equal(test.join(','));
	});

	it('to iterate an object properly', function() {
		var test = {
			a: 'b',
			c: 'd',
			e: 'f'
		};

		var indexes = [];
		var values = [];

		fallback.each(test, function(value, index) {
			indexes.push(index);
			values.push(value);
		});

		expect(indexes.join(',')).to.equal('a,c,e');
		expect(values.join(',')).to.equal('b,d,f');
	});
});