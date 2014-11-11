/* global describe, expect, fallback, it */

describe('fallback.guid', function() {
	it('should be a String', function() {
		var test = fallback.guid();
		expect(test).to.be.an('string');
	});

	it('should be 36 characters in length', function() {
		var test = fallback.guid();
		expect(test.length).to.equal(36);
	});

	it('should always be unique', function() {
		var test = [];

		for (var index = 0; index < 1000; index++) {
			test.push(fallback.guid());
		}

		test = fallback.arrayUnique(test);

		expect(test.length).to.equal(1000);
	});
});
