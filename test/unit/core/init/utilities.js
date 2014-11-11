/* global describe, expect, fallback, it */

describe('fallback.init.utilities', function() {
	var test = {};

	fallback.init.utilities(test, fallback.utility.types);

	fallback.each({
		isArray: 'function',
		normalizeArray: 'function',
		normalizeArraySeries: 'function'
	}, function(type, reference) {
		it(reference + ' reference should exist in test object', function() {
			expect(test[reference]).to.be.an(type);
		});
	});
});
