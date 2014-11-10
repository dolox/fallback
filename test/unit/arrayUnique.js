/*global describe, expect, fallback, it*/

describe('arrayUnique', function() {
	var array = ['fallback', 'fallback', 'john', 'john', 'doe', 'doe'];
	var result = fallback.arrayUnique(array);

	it('to return the proper unqiue length.', function() {
		expect(result.length).to.equal(3);
	});

	it('to return the proper unique items.', function() {
		expect(result.join('')).to.equal('fallbackjohndoe');
	});

	it('to always return an array.', function() {
		expect(fallback.arrayUnique(undefined)).to.be.a('array');
	});
});