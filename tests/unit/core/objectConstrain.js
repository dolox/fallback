/* global describe, expect, fallback, it */

describe('tests.unit.core.objectConstrain', function() {
	var test = {
		test1: true,
		test2: true,
		test3: true
	};

	it('should return an empty Object if our input is malformed', function() {
		var result = JSON.stringify(fallback.objectConstrain(['test']));
		expect(result).to.equal('{}');
	});

	it('should return our original input, if the whitelist is not an Array', function() {
		var result = JSON.stringify(fallback.objectConstrain(test));
		expect(result).to.equal('{"test1":true,"test2":true,"test3":true}');
	});

	it('should constrain our Object to keys contained in our whitelist', function() {
		var result = JSON.stringify(fallback.objectConstrain(test, ['test1']));
		expect(result).to.equal('{"test1":true}');
	});
});
