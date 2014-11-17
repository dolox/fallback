/* global describe, expect, fallback, it */

describe('tests.unit.core.init.utilities', function() {
	it('should be a Function', function() {
		var test = fallback.init.utilities;
		expect(test).to.be.a('function');
	});

	var test = {};
	var result = fallback.init.utilities(test, fallback.utility.types);

	it('to always return undefined', function() {
		expect(result).to.be(undefined);
	});

	fallback.each({
		isArray: 'function',
		normalizeArray: 'function',
		normalizeArraySeries: 'function',

		isBoolean: 'function',
		normalizeBoolean: 'function',
		normalizeBooleanSeries: 'function',

		isFunction: 'function',
		normalizeFunction: 'function',
		normalizeFunctionSeries: 'function',

		isNumber: 'function',
		normalizeNumber: 'function',
		normalizeNumberSeries: 'function',

		isObject: 'function',
		normalizeObject: 'function',
		normalizeObjectSeries: 'function',

		isString: 'function',
		normalizeString: 'function',
		normalizeStringSeries: 'function'
	}, function(type, index) {
		it('Object key `' + index + '` should exist in `test` Object', function() {
			expect(test[index]).to.be.an(type);
		});
	});
});
