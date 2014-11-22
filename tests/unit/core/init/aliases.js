/* global describe, expect, fallback, it */

describe('tests.unit.core.init.aliases', function() {
	it('should be a Function', function() {
		var test = fallback.init.aliases;
		expect(test).to.be.a('function');
	});

	var test = {};
	var result = fallback.init.aliases(test, fallback.aliases);

	it('to always return undefined', function() {
		expect(result).to.be(undefined);
	});

	fallback.each({
		fallback: 'object',
		require: 'function',
		define: 'function'
	}, function(type, index) {
		it('Object key `' + index + '` should exist in `test` Object', function() {
			expect(test[index]).to.be.an(type);
		});
	});
});
