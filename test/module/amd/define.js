// @todo

/*global describe, expect, fallback, it*/

describe('define', function() {
	define('test1', function() {
		return 'test1';
	});

	define('test2', function() {
		return 'test2';
	});

	it('object should define properly using 3 parameters.', function() {
		define('test4', ['test1', 'test2'], function(test1, test2) {
			
		});
	});

	it('object should define properly using 2 parameters.', function() {
		define('test5', function(test1) {
			
		});
	});

	it('object should define properly using 1 parameter as function.', function() {
		define(function(test1) {
			
		});
	});

	it('if parameters are duplicated, it should kill the dupe dependencies with array.', function() {
		define('test6', ['test1', 'test1'], function(test1, test1) {
			
		});
	});

	it('if parameters are duplicated, it should kill the dupe dependencies with function.', function() {
		define('test6', function(test1, test1) {
			
		});
	});

	/**
	it('object should define properly using 1 parameter as object.', function() {
		define({
			test1: true,
			test2: false
		});
	});
	**/
});