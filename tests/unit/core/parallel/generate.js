/* global describe, expect, fallback, it */

// @todo change the function so that generate can maybe return something? that or it belongs in the integration tests
describe('tests.unit.core.parallel.generate', function() {
	it('should add a new item to our queue', function() {
		var guid = fallback.parallel.generate(1);
		expect(JSON.stringify(fallback.parallel.queue)).to.not.equal('');
		delete fallback.parallel.queue[guid];
	});
});
