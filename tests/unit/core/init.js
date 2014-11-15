/* global describe, expect, fallback, it */

describe('tests.unit.core.init', function() {
	it('the library should be initialized', function() {
		expect(fallback.inited).to.equal(true);
	});

	it('fallback.head should be a reference to the documents head element', function() {
		expect(fallback.head).to.be.an('object');
		expect(fallback.isType(fallback.head, 'HTMLHeadElement')).to.equal(true);
	});

	fallback.each({
		fallback: 'object',
		require: 'function',
		define: 'function'
	}, function(type, reference) {
		it(reference + ' reference should exist in the `window`', function() {
			expect(window[reference]).to.be.an(type);
		});
	});

	it('the loader module should be initialized', function() {
		expect(fallback.loader.inited).to.equal(true);
	});
});
