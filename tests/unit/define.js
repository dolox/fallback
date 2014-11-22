/* global define, describe, expect, it */

describe('tests.unit.define', function() {
	it('should be a Function', function() {
		var test = define;
		expect(test).to.be.a('function');
	});

	it('to always return undefined', function() {
		expect(define()).to.be(undefined);

		// Reset the values for other tests.
		define.anonymous.reset();
	});
});
