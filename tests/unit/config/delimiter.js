/* global describe, expect, fallback, it */

describe('tests.unit.config.delimiter', function() {
	it('should be a Function', function() {
		expect(fallback.config.delimiter).to.be.a('function');
	});

	var tests = [
		true,
		false,
		[],
		function() {},
		0,
		{},
		undefined,
		null
	];

	fallback.each(tests, function(value) {
		it('should return `$` when non-string value is passed in', function() {
			var normalized = fallback.config.delimiter(value);
			expect(normalized).to.be.a('string');
			expect(normalized).to.equal('$');
		});
	});

	it('should return a `String` when a `String` is passed in', function() {
		var normalized = fallback.config.delimiter('test');
		expect(normalized).to.be.a('string');
		expect(normalized).to.equal('test');
	});
});
