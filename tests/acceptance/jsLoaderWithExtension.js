/* global describe, expect, fallback, it */

describe('acceptance.jsLoader - Attempt to load a JS file with the extension applied.', function() {
	it('should lazy load the stylesheet', function(done) {
		var test = '//localhost:9876/base/tests/acceptance/js/jsLoaderStress.js';

		fallback.config({
			libs: {
				jsLoaderStress: [
					test
				]
			}
		});

		fallback.require(function(jsLoaderStress) {
			expect(jsLoaderStress).to.equal('jsLoaderStress');
			done();
		});
	});
});
