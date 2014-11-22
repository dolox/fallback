/* global describe, expect, fallback, it */

describe('tests.unit.config.libs.value', function() {
	it('should be a Function', function() {
		expect(fallback.config.libs.value).to.be.a('function');
	});

	var tests = [
		true,
		false,
		function() {},
		0,
		undefined,
		null
	];

	fallback.each(tests, function(value) {
		it('should return an empty Object when neither a Array, String or Object are passed in', function() {
			var normalized = fallback.config.libs.value(value);
			expect(normalized).to.be.a('object');
			expect(JSON.stringify(normalized)).to.equal('{}');
		});
	});

	it('should return an Object when a String is passed in', function() {
		var normalized = fallback.config.libs.value('test');
		expect(normalized).to.be.a('object');
		expect(JSON.stringify(normalized)).to.equal('{"urls":["test"]}');
	});

	it('should return an Object when a Array is passed in', function() {
		var normalized = fallback.config.libs.value(['test1', 'test2']);
		expect(normalized).to.be.a('object');
		expect(JSON.stringify(normalized)).to.equal('{"urls":["test1","test2"]}');
	});
});
