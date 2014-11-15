/* global describe, expect, fallback, it */

describe('tests.unit.core.normalizeArraySeries', function() {
	var tests = [
		// Non series tests.
		false,
		true,
		function() {},
		0,
		{},
		'test',
		undefined,

		// Malformed series tests.
		[false, false, false],
		[true, true, true],
		[function() {}, function() {}, function() {}],
		[0, 1, 2],
		[{}, {}, {}],
		['test1', 'test2', 'test3'],
		[undefined, undefined, undefined]
	];

	fallback.each(tests, function(test) {
		it('should return an empty Array when sent ' + typeof test + ' with no fallback', function() {
			var result = fallback.normalizeArraySeries(test);
			expect(result).to.be.an('array');

			if (fallback.isArray(test)) {
				expect(result.join()).to.equal(',,');
			} else {
				expect(result.join()).to.equal('');
			}
		});

		it('should return the fallback when sent ' + typeof test + ' with a fallback', function() {
			var result = fallback.normalizeArraySeries(test, 'test');
			expect(result).to.be.an('array');

			if (fallback.isArray(test)) {
				expect(result.join()).to.equal('test,test,test');
			} else {
				expect(result.join()).to.equal('test');
			}
		});
	});

	it('should strip empty values when the strip parameter is set to true', function() {
		var test = [['a'], ['b'], ['c'], null, ['d'], undefined, ['e'], '', ['f']];
		var result = fallback.normalizeArraySeries(test, null, true);

		expect(result).to.be.an('array');
		expect(result.join()).to.equal('a,b,c,d,e,f');
	});

	it('should use fallback values in series when fallback is set', function() {
		var test = [['a'], ['b'], ['c'], null, ['d'], undefined, ['e'], '', ['f']];
		var result = fallback.normalizeArraySeries(test, 'test');

		expect(result).to.be.an('array');
		expect(result.join()).to.equal('a,b,c,test,d,test,e,test,f');
	});
});
