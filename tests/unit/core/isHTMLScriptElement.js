/* global describe, expect, fallback, it */

describe('fallback.isHTMLScriptElement', function() {
	it('HTMLCollection should return false.', function() {
		expect(fallback.isHTMLScriptElement(window.document.getElementsByTagName('script'))).to.equal(false);
	});

	it('HTMLScriptElement should return true.', function() {
		expect(fallback.isHTMLScriptElement(window.document.getElementsByTagName('script')[0])).to.equal(true);
	});

	it('null should return false.', function() {
		expect(fallback.isHTMLScriptElement(null)).to.equal(false);
	});

	it('undefined should return false.', function() {
		expect(fallback.isHTMLScriptElement(undefined)).to.equal(false);
	});

	it('Array should return true.', function() {
		expect(fallback.isHTMLScriptElement([])).to.equal(false);
	});

	it('String should return false.', function() {
		expect(fallback.isHTMLScriptElement('String')).to.equal(false);
	});

	it('Number should return true.', function() {
		expect(fallback.isHTMLScriptElement(0)).to.equal(false);
	});

	it('Object should return false.', function() {
		expect(fallback.isHTMLScriptElement({})).to.equal(false);
	});

	it('Boolean of false should return false.', function() {
		expect(fallback.isHTMLScriptElement(false)).to.equal(false);
	});

	it('Boolean of true should return false.', function() {
		expect(fallback.isHTMLScriptElement(true)).to.equal(false);
	});

	it('Function should return false.', function() {
		expect(fallback.isHTMLScriptElement(function() {})).to.equal(false);
	});
});
