/* global describe, expect, fallback, it */

describe('tests.unit.core.arrayUnique', function() {
	var tests = ['fallback', 'fallback', 'john', 'john', 'doe', 'doe'];
	var result = fallback.arrayUnique(tests);

	it('to return 3 for the length', function() {
		expect(result.length).to.equal(3);
	});

	it('to return the proper unique items', function() {
		expect(result.join('')).to.equal('fallbackjohndoe');
	});

	it('to always return an Array', function() {
		expect(fallback.arrayUnique()).to.be.a('array');
	});
});
