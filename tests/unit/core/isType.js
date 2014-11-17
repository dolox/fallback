/*global describe, expect, fallback, it*/

describe('tests.unit.core.isType', function() {
	it('should be a Function', function() {
		var test = fallback.isType;
		expect(test).to.be.a('function');
	});

	it('to always return a Boolean', function() {
		var test = fallback.isType();
		expect(typeof test).to.equal('boolean');
	});

	it('HTMLCollection should return true for type HTMLCollection.', function() {
		expect(fallback.isType(window.document.getElementsByTagName('script'), 'HTMLCollection')).to.equal(true);
	});

	it('HTMLCollection should return false for type Array.', function() {
		expect(fallback.isType([], 'HTMLCollection')).to.equal(false);
	});

	it('HTMLHeadElement should return true for type HTMLHeadElement.', function() {
		expect(fallback.isType(window.document.getElementsByTagName('head')[0], 'HTMLHeadElement')).to.equal(true);
	});

	it('HTMLHeadElement should return false for type Array.', function() {
		expect(fallback.isType([], 'HTMLHeadElement')).to.equal(false);
	});

	it('HTMLScriptElement should return true for type HTMLScriptElement.', function() {
		expect(fallback.isType(window.document.getElementsByTagName('script')[0], 'HTMLScriptElement')).to.equal(true);
	});

	it('HTMLScriptElement should return false for type Array.', function() {
		expect(fallback.isType([], 'HTMLScriptElement')).to.equal(false);
	});

	it('Array should return true for type Array.', function() {
		expect(fallback.isType([], 'Array')).to.equal(true);
	});

	it('String should return false for type Array.', function() {
		expect(fallback.isType('test', 'Array')).to.equal(false);
	});

	it('String should return true for type String.', function() {
		expect(fallback.isType('test', 'String')).to.equal(true);
	});

	it('Array should return false for type String.', function() {
		expect(fallback.isType([], 'String')).to.equal(false);
	});

	it('Number should return true for type Number.', function() {
		expect(fallback.isType(0, 'Number')).to.equal(true);
	});

	it('String should return false for type Number.', function() {
		expect(fallback.isType('test', 'Number')).to.equal(false);
	});

	it('Object should return true for type Object.', function() {
		expect(fallback.isType({}, 'Object')).to.equal(true);
	});

	it('String should return false for type Object.', function() {
		expect(fallback.isType('test', 'Object')).to.equal(false);
	});

	it('Boolean of false should return true for type Boolean.', function() {
		expect(fallback.isType(false, 'Boolean')).to.equal(true);
	});

	it('Boolean of true should return true for type Boolean.', function() {
		expect(fallback.isType(true, 'Boolean')).to.equal(true);
	});

	it('String should return false for type Boolean.', function() {
		expect(fallback.isType('test', 'Boolean')).to.equal(false);
	});

	it('Function should return true for type Function.', function() {
		expect(fallback.isType(function() {}, 'Function')).to.equal(true);
	});

	it('String should return false for type Function.', function() {
		expect(fallback.isType('test', 'Function')).to.equal(false);
	});
});
