/* global describe, expect, fallback, it */

describe('tests.unit.core.normalizeObject', function() {
	var tests = [
		[],
		false,
		true,
		function() {},
		0,
		'test',
		undefined
	];

	it('should return the input when sent an Object', function() {
		var test = {test1: true};
		var result = fallback.normalizeObject(test);
		expect(result).to.equal(test);
	});

	it('should return the input when sent an Object with a fallback', function() {
		var test = {test2: true};
		var result = fallback.normalizeObject(test, 'fallback');
		expect(result).to.equal(test);
	});

	fallback.each(tests, function(test) {
		it('should return null when sent ' + typeof test + ' with no fallback', function() {
			var result = fallback.normalizeObject(test);
			expect(result).to.equal(null);
		});

		it('should return the fallback when sent ' + typeof test + ' with a fallback', function() {
			var result = fallback.normalizeObject(test, 'fallback');
			expect(result).to.equal('fallback');
		});
	});
});
