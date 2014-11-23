/* global describe, expect, fallback, it */
/*
describe('acceptance.cssPreloaded - Make sure a CSS file is not loaded if it\'s already detected on the page.', function() {
	var test = '//localhost:9876/base/tests/acceptance/css/cssPreloaded';

	fallback.config({
		libs: {
			css$cssPreloaded: {
				exports: '.cssPreloaded',
				urls: test
			}
		}
	});

	it('should not lazy load the stylesheet since it\'s already been loaded', function(done) {
		fallback.require(function(css$cssPreloaded) {
			expect(css$cssPreloaded).to.equal(true);
			expect(fallback.module.definitions.css$cssPreloaded.loader.failed.length).to.equal(0);
			expect(fallback.module.definitions.css$cssPreloaded.loader.success).to.equal(null);

			done();
		});
	});
});
*/
