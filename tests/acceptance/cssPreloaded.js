/* global describe, expect, fallback, it */

describe('acceptance.cssPreloaded', function() {
	it('should not lazy load the stylesheet since it\'s already been loaded', function(done) {
		fallback.config({
			libs: {
				css$cssPreloaded: {
					exports: '.cssPreloaded',
					urls: 'http://localhost:9876/base/test/acceptance/css/cssPreloaded'
				}
			}
		});

		fallback.require(function(css$cssPreloaded) {
			expect(css$cssPreloaded).to.equal(true);
			expect(fallback.module.definitions.css$cssPreloaded.loader.failed.length).to.equal(0);
			expect(fallback.module.definitions.css$cssPreloaded.loader.success).to.equal(null);

			done();
		});
	});
});
