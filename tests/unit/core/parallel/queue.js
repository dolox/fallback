/* global describe, expect, fallback, it */

describe('tests.unit.core.parallel.queue', function() {
	it('should be an Object', function() {
		var test = fallback.parallel.queue;
		expect(test).to.be.an('object');
	});

	it('should be an empty Object', function() {
		var test = JSON.stringify(fallback.parallel.queue);
		expect(test).to.equal('{}');
	});
});
