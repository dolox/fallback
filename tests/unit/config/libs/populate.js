/* global describe, expect, fallback, it */

describe('tests.unit.config.libs.populate', function() {
	it('should be a Function', function() {
		expect(fallback.config.libs.init).to.be.a('function');
	});

	var tests = [
		true,
		false,
		[],
		'test',
		0,
		function() {},
		{},
		undefined,
		null
	];

	fallback.each(tests, function(value) {
		if (!fallback.isObject(value)) {
			it('should return `null` when a non-object is passed in as the 1st parameter of the Function', function() {
				var normalized = fallback.config.libs.populate(value, 'badkey', 'badvalue');
				expect(normalized).to.equal(null);
			});
		}

		if (!fallback.isString(value)) {
			it('should return `null` when a non-string is passed in as the 2nd parameter of the Function', function() {
				var normalized = fallback.config.libs.populate({}, value, 'badvalue');
				expect(normalized).to.equal(null);
			});
		}

		if (!fallback.isArray(value)) {
			it('should return a normalized Object when a malformed 3rd parameter is passed in', function() {
				var normalized = fallback.config.libs.populate({}, 'test', value);
				expect(JSON.stringify(normalized)).to.equal('{"test":{"alias":[],"check":null,"deps":[],"init":null,"exports":[],"urls":[]}}');
			});
		}
	});

	it('should return a normalized `Object` when a non-object is passed in as the 1st parameter of the Function', function() {
		var normalized = fallback.config.libs.populate({}, 'test', {
			badValue: true,
			alias: 'a',
			check: function() {},
			deps: 'b',
			exports: 'c',
			init: function() {},
			urls: 'd'
		});

		expect(normalized.test.check).to.be.a('function');
		expect(normalized.test.init).to.be.a('function');

		expect(JSON.stringify(normalized)).to.equal('{"test":{"alias":["a"],"deps":["b"],"exports":["c"],"urls":["d"]}}');
	});
});
