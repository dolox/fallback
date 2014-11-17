/* global define, describe, expect, it */

describe('tests.unit.define.anonymous.save', function() {
	it('to be a Function', function() {
		var test = define.anonymous.save;
		expect(test).to.be.a('function');
	});

	it('to always return undefined', function() {
		var test = define.anonymous.save();
		expect(test).to.be(undefined);
	});
});
