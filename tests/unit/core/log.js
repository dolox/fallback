/*global describe, expect, fallback, it*/

describe('tests.unit.core.log', function() {
	it('should be a function', function() {
		expect(fallback.log).to.be.a('function');
	});

	it('to always return a Boolean', function() {
		var test = fallback.log();
		expect(typeof test).to.equal('boolean');
	});

	fallback.each(fallback.log.levels, function(level, number) {
		it('should now throw an error for level ' + number, function() {
			fallback.debug = number;
			fallback.log(number, 'No error please!');
			fallback.debug = false;
		});
	});
});
