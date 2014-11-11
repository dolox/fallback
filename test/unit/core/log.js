/*global describe, expect, fallback, it*/

describe('fallback.log', function() {
	it('should be a function', function() {
		expect(fallback.log).to.be.a('function');
	});

	fallback.each(fallback.log.levels, function(level, number) {
		it('should now throw an error for level ' + number, function() {
			fallback.debug = number;
			fallback.log(number, 'No error please!');
			fallback.debug = false;
		});
	});
});
