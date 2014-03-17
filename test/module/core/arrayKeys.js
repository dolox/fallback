/*global describe, expect, fallback, it*/

describe('arrayKeys', function() {
	var array = [1, 2, 3, 'fallback'];

	var arrayKeys = fallback.arrayKeys(array);

	it('to return keys of array.', function() {
		expect(arrayKeys.join('')).to.equal(array.join(''));
	});

	var object = {
		john: 'doe',
		henry: 'miller',
		joe: 'blow'
	};

	var objectKeys = fallback.arrayKeys(object);

	it('to return keys of object.', function() {
		expect(objectKeys.join('')).to.equal(['john', 'henry', 'joe'].join(''));
	});

	it('to always return an array.', function() {
		expect(fallback.arrayKeys(undefined)).to.be.a('array');
	});
});