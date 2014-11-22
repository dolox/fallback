/* global define, describe, expect, it */

describe('tests.unit.define.anonymous.deps', function() {
	it('to be undefined', function() {
		var test = define.anonymous.deps;
		expect(test).to.be(undefined);
	});
});
