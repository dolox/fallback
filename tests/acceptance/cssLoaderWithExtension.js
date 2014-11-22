/* global describe, expect, fallback, it */

describe('acceptance.cssLoaderWithExtension - Attempt to load a CSS file with the extension applied.', function() {
	var test = '//localhost:9876/base/tests/acceptance/css/cssLoader.css';

	fallback.config({
		libs: {
			css$cssLoader: {
				exports: '.cssLoader',
				urls: test
			}
		}
	});

	it('should lazy load the stylesheet', function(done) {
		fallback.require(function(css$cssLoader) {
			expect(css$cssLoader).to.equal(true);
			expect(fallback.module.definitions.css$cssLoader.loader.failed.length).to.equal(0);
			expect(fallback.module.definitions.css$cssLoader.loader.success).to.equal(test);

			done();
		});
	});
});
