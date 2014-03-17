/*global describe, expect, fallback, it*/

describe('callback', function() {
	it('null input should return function.', function() {
		var test = fallback.callback(null);
		expect(test).to.be.a('function');
	});

	it('undefined input should return function.', function() {
		var test = fallback.callback(undefined);
		expect(test).to.be.a('function');
	});

	it('String input should return function.', function() {
		var test = fallback.callback('1');
		expect(test).to.be.a('function');
	});

	it('Number input should return function.', function() {
		var test = fallback.callback(1);
		expect(test).to.be.a('function');
	});

	it('Object input should return function.', function() {
		var test = fallback.callback({});
		expect(test).to.be.a('function');
	});

	it('Array input should return function.', function() {
		var test = fallback.callback([]);
		expect(test).to.be.a('function');
	});

	it('Function input should return original function.', function() {
		var test = fallback.callback(function() {
			return -1;
		});

		expect(test).to.be.a('function');
		expect(test()).to.equal(-1);
	});
});