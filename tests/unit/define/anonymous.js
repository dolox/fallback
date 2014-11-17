/* global define, describe, expect, it */

describe('tests.unit.define.anonymous', function() {
	it('should be a Function', function() {
		var test = define.anonymous;
		expect(test).to.be.a('function');
	});

	it('to always return undefined', function() {
		expect(define.anonymous()).to.be(undefined);
	});
});
