/* global describe, expect, fallback, it */

describe('tests.unit.core.arrayClone', function() {
	it('should be a Function', function() {
		var test = fallback.arrayClone;
		expect(test).to.be.a('function');
	});

	it('to always return an Array', function() {
		var test = fallback.arrayClone();
		expect(test).to.be.an('array');
	});

	var test = [1, 2, 3, 'fallback'];
	var result = fallback.arrayClone(test);

	test.shift();
	test.shift();

	it('referenced Array to return 2 for the length', function() {
		expect(test.length).to.equal(2);
	});

	it('cloned Array to return 4 for the length', function() {
		expect(result.length).to.equal(4);
	});
});
