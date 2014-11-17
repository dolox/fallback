/* global describe, expect, fallback, it */

describe('tests.unit.core.stringPad', function() {
	it('should be a Function', function() {
		var test = fallback.stringPad;
		expect(test).to.be.a('function');
	});

	it('should be at least 5 characters, padded on the right', function() {
		var result = fallback.stringPad('test', '     ');
		expect(result).to.equal('test ');
	});

	it('should be at least 5 characters, padded on the left', function() {
		var result = fallback.stringPad('test', '     ', true);
		expect(result).to.equal(' test');
	});
});
