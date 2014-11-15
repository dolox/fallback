/* global describe, expect, fallback, it */

describe('fallback.parallel.anonymous', function() {
	it('should execute anonymous function and invoke the callback', function(done) {
		var test = {
			executed: false,
			guid: fallback.parallel.generate(1)
		};

		fallback.parallel.anonymous(function(callback) {
			test.executed = true;
			callback();
		}, test.guid, function() {
			expect(test.executed).to.equal(true);
			done();
		});
	});
});
