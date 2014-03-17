// @todo

/*global describe, expect, fallback, it*/

describe('require', function() {
	fallback.config({
		paths: {
			'#postload': [
				'index.failfirst.css',
				'index.fail.css',
				'index.css',
				'index.dontrequest.css'
			],

			FAIL_test: [
				'fail1',
				'fail2.js',
				'fail3'
			],

			JSON_test: [
				'json.fail',
				'//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min',
				'json.fail.never.hit'
			],

			jQuery_test: [
				'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.FAIL_ON_PURPOSE.min',
				'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min',
				'//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js'
			],

			jQueryUI_test: [
				'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
				'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
				'//js/loader.js?i=vendor/jquery-ui.min.js'
			]
		},

		init: {
			jQuery_test: function(jQuery_test) {
				//console.log('init');
				//console.log(jQuery_test);
				//jqueryious.noConflict(true);
			}
		},

		exports: {
			'jQuery_test': 'jQuery',
			'jQueryUI_test': 'jQuery.ui',
			'JSON_test': 'JSON'
		},

		dependencies: {
			jQueryUI_test: ['jQuery_test'],
			JSON_test: ['FAIL_test']
		}
	});

	define('require_test1', function() {
		return 'require_test1';
	});

	define('require_test2', function() {
		return 'require_test2';
	});

	it('dynamic parameters should return value', function(done) {
		require(function(require_test1) {
			expect(require_test1).to.equal('require_test1');
			done();
		});
	});

	it('dynamic parameters with deps array should return value', function(done) {
		require(['require_test2'], function(require_test2) {
			expect(require_test2).to.equal('require_test2');
			done();
		});
	});

	it('jQuery UI and jQuery should be undefined.', function() {
		expect(window.jQuery).to.be(undefined);
	});

	it('jQuery UI lazy load with dynamic parameters and deps should return jQuery UI object and jQuery global function should be defined.', function(done) {
		require(function(jQueryUI_test) {
			expect(jQueryUI_test).to.be.a('object');
			expect(window.jQuery).to.be.a('function');
			done();
		});
	});

	it('JSON test with all deps failing.', function(done) {
		require(function(JSON_test) {
			expect(JSON_test).to.be.a('object');
			done();
		});
	});
	
	

	// @todo test globals on and off
	// @todo test baseurl change
});