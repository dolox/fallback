/* global describe, expect, fallback, it */

describe('acceptance.anonymousInt - Make sure an anonymous Int loads properly.', function() {
	fallback.config({
		base: '//localhost:9876/base/tests/acceptance/js/'
	});

	it('anonymous Int should be defined with the proper value', function(done) {
		fallback.require(function(anonymousInt) {
			expect(anonymousInt).to.be.an('number');
			expect(anonymousInt).to.equal(123);
			done();
		});
	});
});
