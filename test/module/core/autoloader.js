/*global document, describe, expect, fallback, it*/

describe('autoloader', function() {
	// data-attribute check.
	var attribute = 'test';
	var files = fallback.autoloader([attribute]);

	it('to return array', function() {
		expect(files).to.be.a('array');
	});

	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	head.appendChild(script);

	var attributeValue = 'fallback,test';
	script.setAttribute('data-' + attribute, attributeValue);
	files = fallback.autoloader([attribute]);

	it('to return the proper length (2).', function() {
		expect(files.length).to.equal(2);
	});

	it('to return the proper array data (' + attributeValue + ').', function() {
		expect(files.join(',')).to.equal(attributeValue);
	});
});