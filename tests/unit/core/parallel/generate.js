/* global describe, expect, fallback, it */

describe('tests.unit.core.parallel.generate', function() {
	it('should be a Function', function() {
		var test = fallback.parallel.generate;
		expect(test).to.be.a('function');
	});

	it('should return a 36 character GUID', function() {
		var test = fallback.parallel.generate(1);
		expect(test).to.be.a('string');
		expect(test.length).to.equal(36);
		delete fallback.parallel.queue[test];
	});
});
