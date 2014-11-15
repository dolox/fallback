/* global describe, expect, fallback, it */

describe('tests.unit.core.normalizeStringSeries', function() {
	var tests = [
		// Non series tests.
		false,
		true,
		function() {},
		[],
		{},
		0,
		undefined,

		// Malformed series tests.
		[false, false, false],
		[true, true, true],
		[function() {}, function() {}, function() {}],
		[[], [], []],
		[{}, {}, {}],
		[1, 2, 3],
		[undefined, undefined, undefined]
	];

	fallback.each(tests, function(test) {
		it('should return an empty Array when sent ' + typeof test + ' with no fallback', function() {
			var result = fallback.normalizeStringSeries(test);
			expect(result).to.be.an('array');

			if (fallback.isArray(test) && test.length) {
				expect(result.join()).to.equal(',,');
			} else {
				expect(result.join()).to.equal('');
			}
		});

		it('should return the fallback when sent ' + typeof test + ' with a fallback', function() {
			var result = fallback.normalizeStringSeries(test, 'test');
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
		var test = [[false], [true], [false], null,  'test1', 'test2', [true], undefined, [false], [true]];
		var result = fallback.normalizeStringSeries(test, null, true);

		expect(result).to.be.an('array');
		expect(result.join()).to.equal('test1,test2');
	});

	it('should use fallback values in series when fallback is set', function() {
		var test = [[false], [true], [false], null,  'test1', 'test2', [true], undefined, [false], [true]];
		var result = fallback.normalizeStringSeries(test, 'test');

		expect(result).to.be.an('array');
		expect(result.join()).to.equal('test,test,test,test,test1,test2,test,test,test,test');
	});
});
