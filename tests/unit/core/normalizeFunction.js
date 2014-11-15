/* global describe, expect, fallback, it */

describe('fallback.normalizeFunction', function() {
	var tests = [
		[],
		false,
		true,
		0,
		{},
		'test',
		undefined
	];

	it('should return the input when sent an Function', function() {
		var test = function() {};
		var result = fallback.normalizeFunction(test);
		expect(result).to.equal(test);
	});

	it('should return the input when sent an Function with a fallback', function() {
		var test = function() {};
		var result = fallback.normalizeFunction(test, 'fallback');
		expect(result).to.equal(test);
	});

	fallback.each(tests, function(test) {
		it('should return null when sent ' + typeof test + ' with no fallback', function() {
			var result = fallback.normalizeFunction(test);
			expect(result).to.equal(null);
		});

		it('should return the fallback when sent ' + typeof test + ' with a fallback', function() {
			var result = fallback.normalizeFunction(test, 'fallback');
			expect(result).to.equal('fallback');
		});
	});
});
