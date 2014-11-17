/* global define, describe, expect, it */

describe('tests.unit.define.anonymous.factory', function() {
	it('to be undefined', function() {
		var test = define.anonymous.factory;
		expect(test).to.be(undefined);
	});
});
