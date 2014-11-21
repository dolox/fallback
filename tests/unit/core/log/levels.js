/*global describe, expect, fallback, it*/

describe('tests.unit.core.log.levels', function() {
	it('should be a Object', function() {
		var test = fallback.log.levels;
		expect(test).to.be.a('object');
	});

	it('should contain a set of predefined values', function() {
		var test = JSON.stringify(fallback.log.levels);
		expect(test).to.equal('{"1":"error","2":"warn","3":"info"}');
	});
});
