/* global describe, expect, fallback, it */

describe('tests.unit.core.normalizeArray', function() {
	it('should be a Function', function() {
		var test = fallback.normalizeArray;
		expect(test).to.be.a('function');
	});

	var tests = [
		false,
		true,
		function() {},
		0,
		{},
		'test',
		undefined
	];

	it('should return the input when sent an Array', function() {
		var test = ['test1', 'test2', 'test3'];
		var result = fallback.normalizeArray(test);
		expect(result.join()).to.equal(test.join());
	});

	it('should return the input when sent an Array with a fallback', function() {
		var test = ['test1', 'test2', 'test3'];
		var result = fallback.normalizeArray(test, 'fallback');
		expect(result.join()).to.equal(test.join());
	});

	fallback.each(tests, function(test) {
		it('should return null when sent ' + typeof test + ' with no fallback', function() {
			var result = fallback.normalizeArray(test);
			expect(result).to.equal(null);
		});

		it('should return the fallback when sent ' + typeof test + ' with a fallback', function() {
			var result = fallback.normalizeArray(test, 'fallback');
			expect(result).to.equal('fallback');
		});
	});
});
