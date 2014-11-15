/* global describe, expect, fallback, it */

describe('tests.unit.config.libs.init', function() {
	it('should be a Function', function() {
		expect(fallback.config.libs.init).to.be.a('function');
	});

	var tests = [
		true,
		false,
		[],
		'test',
		0,
		{},
		undefined,
		null
	];

	fallback.each(tests, function(value) {
		it('should return `null` when non Function value is passed in', function() {
			var normalized = fallback.config.libs.init(value);
			expect(normalized).to.equal(null);
		});
	});

	it('should return a Function is a Function is passed in', function() {
		var normalized = fallback.config.libs.init(function() {});
		expect(normalized).to.be.a('function');
	});
});
