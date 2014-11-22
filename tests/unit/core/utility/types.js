/* global describe, expect, fallback, it */

describe('tests.unit.core.utility.types', function() {
	var compare = ['Array', 'Boolean', 'Function', 'Number', 'Object', 'String'];
	var test = fallback.utility.types;

	it('should be a Array', function() {
		expect(test).to.be.an('array');
	});

	it('should contain ' + compare.length + ' items', function() {
		expect(test.length).to.equal(compare.length);
	});

	it('values should be: ' + compare.join(', '), function() {
		expect(test.join()).to.equal(compare.join());
	});
});
