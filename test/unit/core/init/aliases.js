/* global describe, expect, fallback, it */

describe('fallback.init.aliases', function() {
	var test = {};
	var oldGlobal = fallback.global;

	fallback.global = test;

	fallback.init.aliases(fallback.aliases);

	fallback.each({
		fallback: 'object',
		require: 'function',
		define: 'function'
	}, function(type, reference) {
		it(reference + ' reference should exist in test object', function() {
			expect(test[reference]).to.be.an(type);
		});
	});

	fallback.global = oldGlobal;
});
