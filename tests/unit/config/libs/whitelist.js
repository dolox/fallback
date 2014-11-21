/* global describe, expect, fallback, it */

describe('tests.unit.config.libs.whitelist', function() {
	var test = ['alias', 'check', 'deps', 'init', 'exports', 'urls', "version"];

	it('should be an Array', function() {
		expect(fallback.config.libs.whitelist).to.be.a('array');
	});

	it('should contain ' + test.length + ' values', function() {
		expect(fallback.config.libs.whitelist.length).to.equal(test.length);
	});

	it('values should be: ' + test.join(', '), function() {
		expect(fallback.config.libs.whitelist.join()).to.equal(test.join());
	});
});
