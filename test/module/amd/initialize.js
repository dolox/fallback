/*global describe, expect, fallback, it*/

describe('initialize', function() {
	it('amd internal module should exist.', function() {
		expect(fallback.internals['amd']).to.be.a('object');
	});
});