/* global describe, expect, fallback, it */

describe('tests.unit.config.base', function() {
	it('should be a Function', function() {
		expect(fallback.config.base).to.be.a('function');
	});

	var tests = [
		false,
		[],
		function() {},
		0,
		undefined,
		null
	];

	fallback.each(tests, function(value) {
		it('should return `null` when neither a `Object` or `String` is passed in', function() {
			var normalized = fallback.config.base(value);
			expect(normalized).to.equal(null);
		});
	});

	it('should return a `String` when a `String` is passed in', function() {
		var normalized = fallback.config.base('test');
		expect(normalized).to.be.a('string');
		expect(normalized).to.equal('test');
	});

	it('should return a `Object` with only the whitelisted keys when a `Object` is passed in', function() {
		var normalized = fallback.config.base({
			bad: 123,
			css: 'css',
			img: 'img',
			js: 'js'
		});

		expect(normalized).to.be.a('object');
		expect(JSON.stringify(normalized)).to.equal('{"css":"css","img":"img","js":"js"}');
	});

	it('should return a `Object` with only the whitelisted keys when a `Object` is passed in with non-whitelisted keys', function() {
		var normalized = fallback.config.base({
			bad: 123
		});

		expect(normalized).to.be.a('object');
		expect(JSON.stringify(normalized)).to.equal('{"css":null,"img":null,"js":null}');
	});

	it('should return a `Object` with `null` values when an `Object` with bad values are passed in', function() {
		var normalized = fallback.config.base({
			css: ['badvalue'],
			img: function() {},
			js: {}
		});

		expect(normalized).to.be.a('object');
		expect(JSON.stringify(normalized)).to.equal('{"css":null,"img":null,"js":null}');
	});
});
