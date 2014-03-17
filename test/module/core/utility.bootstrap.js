/*global describe, expect, fallback, it*/

describe('utility.bootstrap', function() {
	fallback.utility.bootstrap();

	var bootstrapCheck = function(reference) {
		it(reference + ' should be a function.', function() {
			expect(fallback[reference]).to.be.a('function');
		});
	};

	for (var index in fallback.utility.types) {
		var reference = 'is' + fallback.utility.types[index];
		bootstrapCheck(reference);
	}
});