/* global describe, expect, fallback, it */

describe('tests.unit.core.guid', function() {
	it('should be a Function', function() {
		var test = fallback.guid;
		expect(test).to.be.a('function');
	});

	it('should return a String', function() {
		var test = fallback.guid();
		expect(test).to.be.an('string');
	});

	it('should return a String that\'s 36 characters in length', function() {
		var test = fallback.guid();
		expect(test.length).to.equal(36);
	});

	it('should return a String that\'s always unique', function() {
		var test = [];

		for (var index = 0; index < 1000; index++) {
			test.push(fallback.guid());
		}

		test = fallback.arrayUnique(test);

		expect(test.length).to.equal(1000);
	});
});
