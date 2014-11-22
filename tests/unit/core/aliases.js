/* global describe, expect, fallback, it */

describe('tests.unit.core.aliases', function() {
	it('should be an Object', function() {
		var test = fallback.aliases;
		expect(test).to.be.an('object');
	});

	it('should contain the proper values', function() {
		var test = JSON.stringify(fallback.aliases);
		expect(test).to.equal('{"config":["cfg","conf","config"],"define":["def","define"],"me":["fallback","fbk"],"require":["req","require"]}');
	});
});
