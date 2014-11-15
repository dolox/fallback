/* global describe, expect, fallback, it */

describe('acceptance.anonymousObject - Make sure an anonymous Object loads properly.', function() {
	fallback.config({
		base: '//localhost:9876/base/tests/acceptance/js/'
	});

	it('anonymous Object should be defined with the proper value', function(done) {
		fallback.require(function(anonymousObject) {
			expect(anonymousObject).to.be.an('object');
			expect(anonymousObject.anonymousObject).to.equal(true);
			done();
		});
	});
});
