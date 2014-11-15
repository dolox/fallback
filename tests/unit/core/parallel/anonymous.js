/* global describe, expect, fallback, it */

describe('tests.unit.core.parallel.anonymous', function() {
	it('should be a Function', function() {
		var test = fallback.parallel.anonymous;
		expect(test).to.be.a('function');
	});

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
