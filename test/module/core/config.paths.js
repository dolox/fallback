/*global describe, expect, fallback, it*/

describe('config.paths', function() {
	it('should always return an object', function() {
		var paths = fallback.config.paths([]);
		expect(paths).to.be.a('object');
	});

	it('should discard malformed input.', function() {
		var paths = fallback.config.paths({
			test1: 'test1.js',
			test2: ['test2.js'],
			test3: ['test3-1.js', 'test3-2.js'],
			test4: { test4: 'test4.js' },
			test5: '',
			test6: null,
			test7: undefined
		});

		expect(paths.test1).to.be.a('array');
		expect(paths.test2).to.be.a('array');
		expect(paths.test3).to.be.a('array');

		expect(paths.test4).to.equal(undefined);
		expect(paths.test5).to.equal(undefined);
		expect(paths.test6).to.equal(undefined);
		expect(paths.test7).to.equal(undefined);
	});

	it('should import paths properly into modules object.', function() {
		var paths = fallback.config.paths({
			test8: 'test8.js'
		});

		expect(fallback.modules.test8.paths.join('')).to.equal('test8.js');
	});
});