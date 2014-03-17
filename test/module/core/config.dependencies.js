/*global describe, expect, fallback, it*/

describe('config.dependencies', function() {
	// Load up test modules, required for dependencies import.
	fallback.module('test1');
	fallback.module('test2');

	it('should always return an object.', function() {
		var dependencies = fallback.config.dependencies();
		expect(dependencies).to.be.a('object');
	});

	it('a dependency should not depend on itself.', function() {
		var dependencies = fallback.config.dependencies({
			test1: ['test1']
		});

		expect(dependencies.test1.length).to.equal(0);
	});

	it('there should be no dupicates in dependendcy array.', function() {
		var dependencies = fallback.config.dependencies({
			test1: ['test2', 'test2']
		});

		expect(dependencies.test1.length).to.equal(1);
	});

	it('non-existant modules should be excluded.', function() {
		var dependencies = fallback.config.dependencies({
			test3: ['test2', 'test2']
		});

		expect(dependencies.test3).to.equal(undefined);
	});

	it('dependencies should be imported to module object properly.', function() {
		fallback.config.dependencies({
			test1: ['test2', 'test3']
		});

		expect(fallback.modules.test1.dependencies.length).to.equal(1);
	});
});