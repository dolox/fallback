/* global describe, expect, fallback, it */

describe('tests.unit.core.init.utilities', function() {
	it('should be a Function', function() {
		var test = fallback.init.utilities;
		expect(test).to.be.a('function');
	});

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
