/* global describe, expect, fallback, it */

describe('acceptance.anonymousFloat - Make sure an anonymous Float loads properly.', function() {
	fallback.config({
		base: '//localhost:9876/base/tests/acceptance/js/'
	});

	it('anonymous Float should be defined with the proper value', function(done) {
		fallback.require(function(anonymousFloat) {
			expect(anonymousFloat).to.be.an('number');
			expect(anonymousFloat).to.equal(2.12);
			done();
		});
	});
});
