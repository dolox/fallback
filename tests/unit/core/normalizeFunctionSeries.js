/* global describe, expect, fallback, it */

describe('tests.unit.core.normalizeFunctionSeries', function() {
	var tests = [
		// Non series tests.
		[],
		true,
		false,
		0,
		{},
		'test',
		undefined,

		// Malformed series tests.
		[false, false, false],
		[true, true, true],
		[[], [], []],
		[0, 1, 2],
		[{}, {}, {}],
		['test1', 'test2', 'test3'],
		[undefined, undefined, undefined]
	];

	fallback.each(tests, function(test) {
		it('should return an empty Array when sent ' + typeof test + ' with no fallback', function() {
			var result = fallback.normalizeFunctionSeries(test);
			expect(result).to.be.an('array');

			if (fallback.isArray(test) && test.length) {
				expect(result.join()).to.equal(',,');
			} else {
				expect(result.join()).to.equal('');
			}
		});

		it('should return the fallback when sent ' + typeof test + ' with a fallback', function() {
			var result = fallback.normalizeFunctionSeries(test, 'test');
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
		var test = [[false], [true], [false], null,  function() {}, function() {}, [true], undefined, [false], '', [true]];
		var result = fallback.normalizeFunctionSeries(test, null, true);

		expect(result).to.be.an('array');
		expect(result.join().replace(/ /g, '')).to.equal('function(){},function(){}');
	});

	it('should use fallback values in series when fallback is set', function() {
		var test = [[false], [true], [false], null,  function() {}, function() {}, [true], undefined, [false], '', [true]];
		var result = fallback.normalizeFunctionSeries(test, 'test');

		expect(result).to.be.an('array');
		expect(result.join().replace(/ /g, '')).to.equal('test,test,test,test,function(){},function(){},test,test,test,test,test');
	});
});
