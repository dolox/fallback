/*global describe, expect, fallback, it*/

describe('arrayClone', function() {
	var tests = {
		reference: [1, 2, 3, 'fallback']
	};

	tests.cloned = fallback.arrayClone(tests.reference);
	delete tests.reference;

	it('to return array', function() {
		expect(tests.cloned).to.be.a('array');
	});

	it('to return undefined.', function() {
		expect(tests.reference).to.equal(undefined);
	});
});