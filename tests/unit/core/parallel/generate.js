/* global describe, expect, fallback, it */

describe('fallback.parallel.generate', function() {
	it('should add a new item to our queue', function() {
		var guid = fallback.parallel.generate(1);
		expect(JSON.stringify(fallback.parallel.queue)).to.not.equal('');
		delete fallback.parallel.queue[guid];
	});
});
