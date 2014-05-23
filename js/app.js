/*global $, fallback, require*/

(function(global) {
	var app = {
		animating: true
	};

	app.initialize = function() {
		fallback.config({
			base: './js/',

			paths: {
				bootstrap: [
					'//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min',
					'vendor/bootstrap/bootstrap.min'
				],

				jsbin: '//static.jsbin.com/js/embed.js',

				jquery: [
					'//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
					'//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min',
					'vendor/jquery/jquery.min'
				],

				jqueryui: [
					'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min',
					'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min',
					'vendor/jquery-ui/jquery-ui.min'
				]
			},

			exports: {
				jquery: 'jQuery',
				jqueryui: 'jQuery.ui'
			},

			dependencies: {
				bootstrap: ['jqueryui'],
				jqueryui: ['jquery']
			}
		});

		require(function(bootstrap, jsbin) {
			app.initiate();
		})
	};

	app.initiate = function() {
		$(function() {
			app.header();
			app.tooltips();
			app.analytics();
			app.social();
		});

		$(global).resize(app.update);
		$(global.document).scroll(app.update);
	};

	app.analytics = function() {
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-38986040-3']);
		_gaq.push(['_trackPageview']);

		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	};

	app.header = function() {
		$('#bird').css({
			left: $(global).width() + 'px',
			position: 'relative'
		}).animate({
			left: 0
		}, 1500, 'easeOutBounce', function() {
			$('#splash-context').animate({
				opacity: 1
			}, 1000, function() {
				$('#social').animate({
					opacity: 1
				});

				$('#browser-support').animate({
					opacity: 1
				});

				$('#egg').css('opacity', 0.95);
				app.animating = false;
			});
		});
	};

	app.egg = function() {
		var me = this;
		var top = 340;

		if ($(document).scrollTop() > 200) {
			top = app.height - 20;
		}

		var egg_top = parseInt($('#egg').css('top')) || 0;

		if (!me.animating && top != egg_top) {
			me.animating = true;

			$('#egg').animate({
				top: top
			}, {
				duration: 500,
				queue: false,
			
				complete: function() {
					me.animating = false;
				}
			});
		}
	};

	app.social = function() {
		var me = app.social;
		me.facebook();
		me.twitter();
		me.google();
	};
	
	app.social.facebook = function() {
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=546581895401445";
			fjs.parentNode.insertBefore(js, fjs);
		}(global.document, 'script', 'facebook-jssdk'));
	};

	app.social.google = function() {
		var po = global.document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/platform.js';
		var s = global.document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	};

	app.social.twitter = function() {
		!function(d,s,id){
			var js,fjs=d.getElementsByTagName(s)[0],
			p=/^http:/.test(d.location)?'http':'https';

			if(!d.getElementById(id)){
				js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';
				fjs.parentNode.insertBefore(js,fjs);
			}
		}(global.document, 'script', 'twitter-wjs');
	};

	app.tooltips = function() {
		$('[data-toggle=tooltip]').tooltip({
			container: 'body'
		});
	};

	app.update = function() {
		var height = $(window).height();
		var top = $(document).scrollTop();
		var width = $(window).width();

		if (height != app.height || top != app.top || width != app.width) {
			app.height = height;
			app.top = top;
			app.width = width;
			app.egg();
		}
	};

	app.initialize();

	global.app = app;
})(this);