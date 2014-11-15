/* global describe, expect, fallback, it */

describe('acceptance.cssLoader', function() {
	it('should lazy load the stylesheet', function(done) {
		var test = 'http://localhost:9876/base/test/acceptance/css/cssLoader';

		fallback.config({
			libs: {
				css$cssLoader: {
					exports: '.cssLoader',
					urls: test
				}
			}
		});

		fallback.require(function(css$cssLoader) {
			console.log(fallback.module.definitions.css$cssLoader);
			expect(fallback.module.definitions.css$cssLoader.loader.failed.length).to.equal(0);
			expect(fallback.module.definitions.css$cssLoader.loader.success.length).to.equal(1);
			expect(fallback.module.definitions.css$cssLoader.loader.success).to.equal(test);

			done();
		});
	});
});
