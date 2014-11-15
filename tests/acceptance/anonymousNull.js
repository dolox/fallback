/* global describe, expect, fallback, it */

describe('acceptance.anonymousNull - Make sure an anonymous Null loads properly.', function() {
	fallback.config({
		base: '//localhost:9876/base/tests/acceptance/js/'
	});

	it('anonymous Null should be defined with the proper value', function(done) {
		fallback.require(function(anonymousNull) {
			expect(anonymousNull).to.equal(null);
			done();
		});
	});
});
