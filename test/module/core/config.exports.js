/*global describe, expect, fallback, it*/

describe('config.exports', function() {
	// Load up test modules, required for exports import.
	fallback.module('test1');
	fallback.module('test2');

	it('should always return an object.', function() {
		var exports = fallback.config.exports();
		expect(exports).to.be.a('object');
	});

	it('non-existant modules should be excluded.', function() {
		var exports = fallback.config.exports({
			test3: 'test2'
		});

		expect(exports.test3).to.equal(undefined);
	});

	it('exports should be imported to module object properly.', function() {
		fallback.config.exports({
			test1: 'test2'
		});

		expect(fallback.modules.test1.exports).to.equal('test2');
	});

	it('exports should be imported to exports object properly.', function() {
		fallback.config.exports({
			test1: 'test2'
		});

		expect(fallback.exports.test1).to.equal('test2');
	});
});