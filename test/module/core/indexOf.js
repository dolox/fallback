/*global describe, expect, fallback, it*/

describe('indexOf', function() {
	var array = [1, 2, 3, 'fallback'];

	it('to return -1 when the parameters are malformed.', function() {
		expect(fallback.indexOf(null, null)).to.equal(-1);
	});

	it('to always return a numeric.', function() {
		expect(fallback.indexOf(array, 2)).to.be.a('number');
	});

	it('to return -1 for the indexOf(5)', function() {
		expect(fallback.indexOf(array, 5)).to.equal(-1);
	});

	it('to return 1 for the indexOf(2).', function() {
		expect(fallback.indexOf(array, 2)).to.equal(1);
	});

	it('to return 3 for the indexOf(\'fallback\').', function() {
		expect(fallback.indexOf(array, 'fallback')).to.equal(3);
	});
});