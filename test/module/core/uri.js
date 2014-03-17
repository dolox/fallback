/*global describe, expect, fallback, it*/

describe('uri', function() {
	it('Empty should return itself.', function() {
		expect(fallback.uri(null)).to.equal(null);
	});

	it('No extension should have .js', function() {
		expect(fallback.uri('test')).to.equal('test.js');
	});

	it('CSS extension should have CSS extension.', function() {
		expect(fallback.uri('test.css')).to.equal('test.css');
	});

	it('JS extensions should have JS extension.', function() {
		expect(fallback.uri('test.js')).to.equal('test.js');
	});
});