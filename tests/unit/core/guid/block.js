/* global describe, expect, fallback, it */

describe('tests.unit.core.guid.block', function() {
	it('should be a Function', function() {
		var test = fallback.guid.block;
		expect(test).to.be.a('function');
	});

	it('should be a String', function() {
		var test = fallback.guid.block();
		expect(test).to.be.an('string');
	});

	it('should be 8 characters in length', function() {
		var test = fallback.guid.block();
		expect(test.length).to.equal(8);
	});

	it('should be a String', function() {
		var test = fallback.guid.block(true);
		expect(test).to.be.an('string');
	});

	it('should be 10 characters in length', function() {
		var test = fallback.guid.block(true);
		expect(test.length).to.equal(10);
	});
});
