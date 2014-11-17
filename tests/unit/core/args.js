/* global describe, expect, fallback, it */

describe('tests.unit.core.args', function() {
	it('should be a Function', function() {
		var test = fallback.args;
		expect(test).to.be.a('function');
	});

	/* eslint-disable */
	var tests = [{
		reference: function(a, b,c,d,   e,		f,g ,H/* test */, i) {},
		result: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'H', 'i']
	}, {
		reference: function(/*ok*/ a,/*ok*/b	,	/*ok*/ c) {},
		result: ['a', 'b', 'c']
	}, {
		reference: function() {},
		result: []
	}, {
		reference: null,
		result: []
	}, {
		reference: undefined,
		result: []
	}, {
		reference: [],
		result: []
	}, {
		reference: {},
		result: []
	}];
	/* eslint-enable */

	fallback.each(tests, function(test) {
		var result = fallback.args(test.reference);

		it('to always return an Array', function() {
			expect(result).to.be.an('array');
		});

		it('to return ' + test.result.length + ' for the length', function() {
			expect(result.length).to.equal(test.result.length);
		});

		it('to return the proper values', function() {
			expect(result.join()).to.equal(test.result.join());
		});
	});
});
