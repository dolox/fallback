/* global describe, expect, fallback, it */

describe('tests.unit.core.parallel.anonymous', function() {
	it('should be a Function', function() {
		var test = fallback.parallel.anonymous;
		expect(test).to.be.a('function');
	});

	it('should invoke an anonymous Function and it\'s callback', function(done) {
		var test = {
			guid: fallback.parallel.generate(1),
			invoked: false
		};

		var result = fallback.parallel.anonymous(function(callback) {
			test.invoked = true;
			callback();
		}, test.guid, function() {
			expect(test.invoked).to.equal(true);
			done();
		});

		it('to always return undefined', function() {
			expect(result).to.be(undefined);
		});
	});
});
