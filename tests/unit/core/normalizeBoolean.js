/* global describe, expect, fallback, it */

describe('tests.unit.core.normalizeBoolean', function() {
	it('should be a Function', function() {
		var test = fallback.normalizeBoolean;
		expect(test).to.be.a('function');
	});

	var tests = [
		['test'],
		function() {},
		0,
		{},
		'test',
		undefined
	];

	it('should return the input when sent an Boolean of false', function() {
		var result = fallback.normalizeBoolean(false);
		expect(result).to.equal(false);
	});

	it('should return the input when sent an Boolean of true', function() {
		var result = fallback.normalizeBoolean(true);
		expect(result).to.equal(true);
	});

	it('should return the input when sent an Boolean with a fallback', function() {
		var test = true;
		var result = fallback.normalizeBoolean(test, 'fallback');
		expect(result).to.equal(true);
	});

	fallback.each(tests, function(test) {
		it('should return null when sent ' + typeof test + ' with no fallback', function() {
			var result = fallback.normalizeBoolean(test);
			expect(result).to.equal(null);
		});

		it('should return the fallback when sent ' + typeof test + ' with a fallback', function() {
			var result = fallback.normalizeBoolean(test, 'fallback');
			expect(result).to.equal('fallback');
		});
	});
});
