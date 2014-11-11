/*global describe, expect, fallback, it*/

describe('fallback.toArray', function() {
	it('make sure Arguments are properly casted to an Array', function() {
		(function(window) {
			var args = fallback.toArray(arguments);
			expect(args).to.be.an('array');
		}(window));
	});
});
