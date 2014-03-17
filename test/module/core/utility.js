/*global describe, expect, fallback, it*/

describe('utility', function() {
	it('Test function should not exist.', function() {
		expect(fallback.isTest).to.be(undefined);
	});

	it('Test function should exist.', function() {
		fallback.utility('Test');
		expect(fallback.isTest).to.be.a('function');
	});

	it('Test function should exist.', function() {
		expect(fallback.isTest('john')).to.equal(false);
	});
});