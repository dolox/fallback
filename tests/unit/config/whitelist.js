/* global describe, expect, fallback, it */

describe('tests.unit.config.whitelist', function() {
	var test = ['amd', 'base', 'debug', 'delimiter', 'globals', 'libs'];

	it('should be an Array', function() {
		expect(fallback.config.whitelist).to.be.a('array');
	});

	it('should contain ' + test.length + ' values', function() {
		expect(fallback.config.whitelist.length).to.equal(test.length);
	});

	it('values should be: ' + test.join(', '), function() {
		expect(fallback.config.whitelist.join()).to.equal(test.join());
	});
});
