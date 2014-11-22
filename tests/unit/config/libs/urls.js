/* global describe, expect, fallback, it */

describe('tests.unit.config.libs.urls', function() {
	it('should be a Function', function() {
		expect(fallback.config.libs.urls).to.be.a('function');
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
		it('should return an empty Array when non string series value set is passed in', function() {
			var normalized = fallback.config.libs.urls(value);
			expect(normalized).to.be.a('array');
			expect(normalized.join()).to.equal('');
		});
	});

	it('should return an Array when the value that\'s passed in is a `String`', function() {
		var normalized = fallback.config.libs.urls('test');
		expect(normalized).to.be.a('array');
		expect(normalized.join()).to.equal('test');
	});

	it('should return an Array when the value that\'s passed in is a `String` series', function() {
		var normalized = fallback.config.libs.urls(tests.concat(['test1', 'test2']));
		expect(normalized).to.be.a('array');
		expect(normalized.join()).to.equal('test1,test2');
	});
});
