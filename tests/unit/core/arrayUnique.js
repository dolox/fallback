/* global describe, expect, fallback, it */

describe('tests.unit.core.arrayUnique', function() {
	it('should be a Function', function() {
		var test = fallback.arrayUnique;
		expect(test).to.be.a('function');
	});

	it('to always return an Array', function() {
		var test = fallback.arrayUnique();
		expect(test).to.be.a('array');
	});

	var test = ['fallback', 'fallback', 'john', 'john', 'doe', 'doe'];
	var result = fallback.arrayUnique(test);

	it('to return 3 for the length', function() {
		expect(result.length).to.equal(3);
	});

	it('to return the proper unique items', function() {
		expect(result.join('')).to.equal('fallbackjohndoe');
	});
});
