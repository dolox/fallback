/* global describe, expect, fallback, it */

describe('tests.unit.core.isHTMLCollection', function() {
	it('HTMLCollection should return true.', function() {
		expect(fallback.isHTMLCollection(window.document.getElementsByTagName('script'))).to.equal(true);
	});

	it('HTMLScriptElement should return false.', function() {
		expect(fallback.isHTMLCollection(window.document.getElementsByTagName('script')[0])).to.equal(false);
	});

	it('null should return false.', function() {
		expect(fallback.isHTMLCollection(null)).to.equal(false);
	});

	it('undefined should return false.', function() {
		expect(fallback.isHTMLCollection(undefined)).to.equal(false);
	});

	it('Array should return true.', function() {
		expect(fallback.isHTMLCollection([])).to.equal(false);
	});

	it('String should return false.', function() {
		expect(fallback.isHTMLCollection('String')).to.equal(false);
	});

	it('Number should return true.', function() {
		expect(fallback.isHTMLCollection(0)).to.equal(false);
	});

	it('Object should return false.', function() {
		expect(fallback.isHTMLCollection({})).to.equal(false);
	});

	it('Boolean of false should return false.', function() {
		expect(fallback.isHTMLCollection(false)).to.equal(false);
	});

	it('Boolean of true should return false.', function() {
		expect(fallback.isHTMLCollection(true)).to.equal(false);
	});

	it('Function should return false.', function() {
		expect(fallback.isHTMLCollection(function() {})).to.equal(false);
	});
});
