/* global describe, expect, fallback, it */

describe('acceptance.jsLoader - Attempt to load a JS file.', function() {
	var test = '//localhost:9876/base/tests/acceptance/js/jsLoaderStress';

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
