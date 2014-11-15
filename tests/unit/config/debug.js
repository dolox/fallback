/* global describe, expect, fallback, it */

describe('tests.unit.config.debug', function() {
	it('should be a Function', function() {
		expect(fallback.config.debug).to.be.a('function');
	});

	var tests = [
		false,
		[],
		function() {},
		0,
		{},
		'test',
		undefined,
		null
	];

	fallback.each(tests, function(value) {
		it('should return false when non-boolean value is passed in', function() {
			var normalized = fallback.config.debug(value);
			expect(normalized).to.be.a('boolean');
			expect(normalized).to.equal(false);
		});
	});

	it('should return true when the value `true` is passed in', function() {
		var normalized = fallback.config.debug(true);
		expect(normalized).to.be.a('boolean');
		expect(normalized).to.equal(true);
	});
});
