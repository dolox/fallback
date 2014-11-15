/* global describe, expect, fallback, it */

describe('tests.unit.core.arrayClone', function() {
	var tests = [1, 2, 3, 'fallback'];
	var result = fallback.arrayClone(tests);

	tests.shift();
	tests.shift();

	it('referenced Array to return 2 for the length', function() {
		expect(tests.length).to.equal(2);
	});

	it('cloned Array to return 4 for the length', function() {
		expect(result.length).to.equal(4);
	});
});
