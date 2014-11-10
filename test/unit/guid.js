/*global describe, expect, fallback, it*/

describe('guid', function() {
	var guid = fallback.guid();

	it('to always return a string.', function() {
		expect(guid).to.be.a('string');
	});

	it('to always be 36 characters in length', function() {
		expect(guid.length).to.equal(36);
	});
});