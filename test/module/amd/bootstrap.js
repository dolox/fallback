/*global describe, expect, fallback, it*/

describe('bootstrap', function() {
	it('global define function should exist.', function() {
		expect(define).to.be.a('function');
	});

	it('global require function should exist.', function() {
		expect(require).to.be.a('function');
	});
});