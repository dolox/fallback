/* global describe, expect, fallback, it */

describe('tests.unit.core.args', function() {
	/* eslint-disable */
	var tests = [{
		length: 9,
		reference: function(a, b,c,d,   e,		f,g ,H/* test */, i) {}
	}, {
		length: 3,
		reference: function(/*ok*/ a,/*ok*/b	,	/*ok*/ c) {}
	}, {
		length: 0,
		reference: function() {}
	}, {
		length: 0,
		reference: null
	}, {
		length: 0,
		reference: undefined
	}, {
		length: 0,
		reference: []
	}, {
		length: 0,
		reference: {}
	}];
	/* eslint-enable */

	fallback.each(tests, function(test) {
		var result = fallback.args(test.reference);

		it('to always return an Array', function() {
			expect(result).to.be.an('array');
		});

		it('to return ' + test.length + ' for the length', function() {
			expect(result.length).to.equal(test.length);
		});
	});
});
