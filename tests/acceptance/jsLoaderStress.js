/* global describe, expect, fallback, it */

describe('acceptance.jsLoaderStress - Load a number of libraries that purposely fail with the last library loading successfully.', function() {
	var test = '//localhost:9876/base/tests/acceptance/js/jsLoaderStress';

	fallback.config({
		libs: {
			jsLoaderStress: [
				'fail1',
				'fail2',
				'fail3',
				'fail4',
				'fail5',
				'fail6',
				'fail7',
				'fail8',
				'fail9',
				'fail10',
				'fail11',
				'fail12',
				'fail13',
				'fail14',
				'fail15',
				'fail16',
				'fail17',
				'fail18',
				'fail19',
				'fail20',
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
