/*
	it('to always return undefined', function() {
		expect(fallback.each()).to.be(undefined);
	});


	// fallback.init
	
	it('fallback.head should be a reference to the documents head element', function() {
		expect(fallback.head).to.be.an('object');
	});

	fallback.each({
		fallback: 'object',
		require: 'function',
		define: 'function'
	}, function(type, reference) {
		it(reference + ' reference should exist in the `window`', function() {
			expect(window[reference]).to.be.an(type);
		});
	});

	it('the loader module should be initialized', function() {
		expect(fallback.loader.inited).to.equal(true);
	});
*/