/*global describe, expect, fallback, it*/

describe('args', function() {
	var tests = [{
		length: 9,
		reference: function(a, b,c,d,   e,		f,g ,H/* test */, i) {}
	}, {
		length: 3,
		reference: function(/*ok*/ a,/*ok*/b	,	/*ok*/ c) {},
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

	for (var index in tests) {
		var test = tests[index];
		console.log(fallback);
		var args = fallback.args(test.reference);

		it('to always return a array.', function() {
			expect(args).to.be.a('array');
		});

		it('to return ' + test.length + ' for it\'s length.', function() {
			expect(args.length).to.equal(test.length);
		});
	}
});