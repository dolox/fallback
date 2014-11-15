/* global describe, expect, fallback, it */

describe('tests.unit.core.normalizeBooleanSeries', function() {
	var tests = [
		// Non series tests.
		[],
		function() {},
		0,
		{},
		'test',
		undefined,

		// Malformed series tests.
		[[], [], []],
		[function() {}, function() {}, function() {}],
		[0, 1, 2],
		[{}, {}, {}],
		['test1', 'test2', 'test3'],
		[undefined, undefined, undefined]
	];

	fallback.each(tests, function(test) {
		it('should return an empty Array when sent ' + typeof test + ' with no fallback', function() {
			var result = fallback.normalizeBooleanSeries(test);
			expect(result).to.be.an('array');

			if (fallback.isArray(test) && test.length) {
				expect(result.join()).to.equal(',,');
			} else {
				expect(result.join()).to.equal('');
			}
		});

		it('should return the fallback when sent ' + typeof test + ' with a fallback', function() {
			var result = fallback.normalizeBooleanSeries(test, 'test');
			expect(result).to.be.an('array');

			if (fallback.isArray(test)) {
				if (test.length) {
					expect(result.join()).to.equal('test,test,test');
				} else {
					expect(result.join()).to.equal('');
				}
			} else {
				expect(result.join()).to.equal('test');
			}
		});
	});

	it('should strip empty values when the strip parameter is set to true', function() {
		var test = [[false], [true], [false], null,  true, false, [true], undefined, [false], '', [true]];
		var result = fallback.normalizeBooleanSeries(test, null, true);

		expect(result).to.be.an('array');
		expect(result.join()).to.equal('true,false');
	});

	it('should use fallback values in series when fallback is set', function() {
		var test = [[false], [true], [false], null,  true, false, [true], undefined, [false], '', [true]];
		var result = fallback.normalizeBooleanSeries(test, 'test');

		expect(result).to.be.an('array');
		expect(result.join()).to.equal('test,test,test,test,true,false,test,test,test,test,test');
	});
});
