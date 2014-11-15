/* global describe, expect, fallback, it */

describe('acceptance.jsLoaderWithExtension - Attempt to load a JS file with the extension applied.', function() {
	var test = '//localhost:9876/base/tests/acceptance/js/jsLoaderStress.js';

	fallback.config({
		libs: {
			jsLoaderStress: [
				test
			]
		}
	});

	it('should lazy load the stylesheet', function(done) {
		fallback.require(function(jsLoaderStress) {
			expect(jsLoaderStress).to.equal('jsLoaderStress');
			done();
		});
	});
});
