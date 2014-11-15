/* global describe, expect, fallback, it */

describe('fallback.objectMerge', function() {
	var test = {
		test1: undefined,
		test2: undefined,
		test3: undefined
	};

	it('should return an empty Object if our input is malformed', function() {
		var result = JSON.stringify(fallback.objectMerge(['test']));
		expect(result).to.equal('{}');
	});

	it('should return our original input, if the defaults is not an Array/Object', function() {
		var result = JSON.stringify(fallback.objectMerge(test, 'test'));
		expect(result).to.equal('{}');
	});

	it('should use our fallback if our defaults is an Array', function() {
		var result = JSON.stringify(fallback.objectMerge(test, ['test1'], 'test'));
		expect(result).to.equal('{"test1":"test"}');
	});

	it('should merge in our defaults if it\'s an Object', function() {
		var result = JSON.stringify(fallback.objectMerge(test, {
			test1: 'test2'
		}));

		expect(result).to.equal('{"test1":"test2"}');
	});
});
