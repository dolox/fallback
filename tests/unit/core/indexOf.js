/* global describe, expect, fallback, it */

describe('tests.unit.core.indexOf', function() {
	var test = [1, 2, 3, 'fallback'];

	it('to return -1 when the parameters are malformed.', function() {
		expect(fallback.indexOf(null, null)).to.equal(-1);
	});

	it('to always return a Number', function() {
		expect(fallback.indexOf(test, 2)).to.be.a('number');
	});

	it('to return -1 for the indexOf(5)', function() {
		expect(fallback.indexOf(test, 5)).to.equal(-1);
	});

	it('to return 1 for the indexOf(2).', function() {
		expect(fallback.indexOf(test, 2)).to.equal(1);
	});

	it('to return 3 for the indexOf(\'fallback\').', function() {
		expect(fallback.indexOf(test, 'fallback')).to.equal(3);
	});
});
