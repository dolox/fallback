/* global describe, expect, fallback, it */

describe('tests.unit.config.base.whitelist', function() {
	var test = ['css', 'img', 'js'];

	it('should be an Array', function() {
		expect(fallback.config.base.whitelist).to.be.a('array');
	});

	it('should contain ' + test.length + ' values', function() {
		expect(fallback.config.base.whitelist.length).to.equal(test.length);
	});

	it('values should be: ' + test.join(', '), function() {
		expect(fallback.config.base.whitelist.join()).to.equal(test.join());
	});
});
