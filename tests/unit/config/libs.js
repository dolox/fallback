/* global describe, expect, fallback, it */

describe('tests.unit.config.libs', function() {
	it('should be a Function', function() {
		expect(fallback.config.libs).to.be.a('function');
	});

	var tests = [
		true,
		false,
		[],
		function() {},
		0,
		'test1',
		'test2',
		undefined,
		null
	];

	fallback.each(tests, function(value) {
		it('should return an empty Object when a non-object value is passed in', function() {
			var normalized = fallback.config.libs(value);
			expect(normalized).to.be.an('object');
			expect(JSON.stringify(normalized)).to.equal('{}');
		});
	});

	it('should return a `Object` when a `Object` is passed in', function() {
		var normalized = fallback.config.libs({});
		expect(normalized).to.be.a('object');
		expect(JSON.stringify(normalized)).to.equal('{}');
	});

	it('should return the properly normalized `Object` when the value of a key is set to `String`', function() {
		var normalized = fallback.config.libs({
			test: 'test1'
		});

		expect(JSON.stringify(normalized)).to.equal('{"test":{"alias":[],"check":null,"deps":[],"init":null,"exports":["test"],"urls":["test1"],"version":null}}');
	});

	it('should return the properly normalized `Object` when the value of a key is set to `Array`', function() {
		var normalized = fallback.config.libs({
			test: tests
		});

		expect(JSON.stringify(normalized)).to.equal('{"test":{"alias":[],"check":null,"deps":[],"init":null,"exports":["test"],"urls":["test1","test2"],"version":null}}');
	});

	it('should return the properly normalized `Object` when the value of a key is set to `Object` with malformed values', function() {
		var normalized = fallback.config.libs({
			test: {
				randomBadValue: tests,
				alias: tests,
				check: tests,
				deps: tests,
				exports: tests,
				init: tests,
				urls: tests,
				version: tests
			}
		});

		expect(JSON.stringify(normalized)).to.equal('{"test":{"alias":["test1","test2"],"check":null,"deps":["test1","test2"],"init":null,"exports":["test1","test2"],"urls":["test1","test2"],"version":null}}');
	});

	it('should return the properly normalized `Object` when the value of a key is set to `Object` with proper values', function() {
		var normalized = fallback.config.libs({
			test: {
				alias: ['1', '2', '3'],
				check: function() {},
				deps: ['3', '4', '5'],
				exports: ['6', '7', '8'],
				init: function() {},
				urls: ['9', '10', '11'],
				version: '1.2.3'
			}
		});

		expect(normalized.test.check).to.be.a('function');
		expect(normalized.test.init).to.be.a('function');
		expect(JSON.stringify(normalized)).to.equal('{"test":{"alias":["1","2","3"],"deps":["3","4","5"],"exports":["6","7","8"],"urls":["9","10","11"],"version":"1.2.3"}}');
	});
});
