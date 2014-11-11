/* global describe, expect, fallback, it */

describe('fallback.normalizeNumber', function() {
	var tests = [
		[],
		false,
		true,
		function() {},
		{},
		'test',
		undefined
	];

	it('should return the input when sent an Number', function() {
		var test = 0;
		var result = fallback.normalizeNumber(test);
		expect(result).to.equal(test);
	});

	it('should return the input when sent an Number with a fallback', function() {
		var test = 2;
		var result = fallback.normalizeNumber(test, 'fallback');
		expect(result).to.equal(test);
	});

	fallback.each(tests, function(test) {
		it('should return null when sent ' + typeof test + ' with no fallback', function() {
			var result = fallback.normalizeNumber(test);
			expect(result).to.equal(null);
		});

		it('should return the fallback when sent ' + typeof test + ' with a fallback', function() {
			var result = fallback.normalizeNumber(test, 'fallback');
			expect(result).to.equal('fallback');
		});
	});
});
