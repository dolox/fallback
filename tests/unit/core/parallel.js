/* global describe, expect, fallback, it */

describe('tests.unit.core.parallel', function() {
	it('should be a Function', function() {
		var test = fallback.parallel;
		expect(test).to.be.a('function');
	});

	it('functions should run in parallel and return a final callback when completed', function(done) {
		var test = [];

		var series = [
			function(callback) {
				setTimeout(function() {
					test.push(1);
					callback();
				}, 100);
			},

			function(callback) {
				setTimeout(function() {
					test.push(2);
					callback();
				}, 50);
			},

			function(callback) {
				setTimeout(function() {
					test.push(3);
					callback();
				}, 0);
			}
		];

		fallback.parallel(series, function() {
			expect(test.join()).to.be.equal('3,2,1');
			done();
		});
	});
});
