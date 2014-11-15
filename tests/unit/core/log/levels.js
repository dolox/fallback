/*global describe, expect, fallback, it*/

describe('tests.unit.core.log.levels', function() {
	it('should be a Object', function() {
		var test = fallback.log.levels;
		expect(test).to.be.a('object');
	});
});
