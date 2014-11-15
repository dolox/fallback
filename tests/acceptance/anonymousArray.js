/* global describe, expect, fallback, it */

describe('acceptance.anonymousArray - Make sure an anonymous Array loads properly.', function() {
	fallback.config({
		base: '//localhost:9876/base/tests/acceptance/js/'
	});

	it('anonymous Array should be defined with the proper value', function(done) {
		fallback.require(function(anonymousArray) {
			expect(anonymousArray).to.be.an('array');
			expect(anonymousArray[0]).to.equal('anonymousArray');
			done();
		});
	});
});
