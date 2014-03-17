/*global describe, expect, fallback, it*/

describe('arrayLast', function() {
	var array = [1, 2, 3, 'fallback'];

	it('to return the last value of array.', function() {
		expect(fallback.arrayLast(array)).to.equal('fallback');
	});

	it('to return undefined with non-array parameter.', function() {
		expect(fallback.arrayLast(null)).to.be.undefined;
	});
});