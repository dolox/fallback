/* global describe, expect, fallback, it */

describe('acceptance.anonymousNumber - Make sure an anonymous Number loads properly.', function() {
	fallback.config({
		base: '//localhost:9876/base/tests/acceptance/js/'
	});

	it('anonymous Number should be defined with the proper value', function(done) {
		fallback.require(function(anonymousNumber) {
			expect(anonymousNumber).to.be.an('number');
			expect(anonymousNumber).to.equal(7);
			done();
		});
	});
});
