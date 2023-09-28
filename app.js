
var didScroll, lastScrollTop = 0;

var navbar = {
    duration: 300, // (ms) add css transition for 300 sec (css transition is 200)
    delta: 50, // (px) buffer (user has to scroll x to toggle navbar)
    transitioning: false, // changing state
    minimize: function () {
        if (this.el.hasClass('is-maximized')) {
            this.transition();
        }
        // Hide top menu
        this.el.removeClass('is-maximized').addClass('is-minimized');
    },
    maximize: function () {
        if (this.el.hasClass('is-minimized')) {
            this.transition();
        }
        this.el.removeClass('is-minimized').addClass('is-maximized');
    },
    transition: function () {
        var _this = this;

        // could have transition in css and toggle class is-transitioning here
        // but we're using duration for the setTimeout so easier to have everything together in js


        // top menu visible
        _this.el.find('.top-section').css('visibility', 'visible');

        // add css transition
        _this.transitioning = true;
        _this.el.css({
            '-webkit-transform': 'transform ' + _this.duration + 'ms',
            '-moz-transform': 'transform ' + _this.duration + 'ms',
            '-ms-transform': 'transform ' + _this.duration + 'ms',
            '-o-transform': 'transform ' + _this.duration + 'ms',
            'transition': 'transform ' + _this.duration + 'ms'
        });

        // remove css transform when transition is done
        setTimeout(function () {
            _this.el.css('transition', 'none');
            _this.transitioning = false;
            // top menu hidden
            if (_this.el.hasClass('is-minimized')) {
                _this.el.find('.top-section').css('visibility', 'hidden');
            }
        }, _this.duration)

    },
    handleScroll: function () {
        //var st = $(this).scrollTop();
        var st = $(window).scrollTop();
        var navbar_height = this.el.outerHeight();

        // Make sure they scroll more than delta and navbar is not transitioning
        if (Math.abs(lastScrollTop - st) <= this.delta || this.transitioning)
            return;

        // If they scrolled down and are past the navbar, add class .is-minimized.
        // This is necessary so you never see what is "behind" the navbar.
        // Scroll Down: minimize (hide top menu)
        if (st > lastScrollTop && st > navbar_height) {
            this.minimize();
        }
        // Scroll Up: maximize (show top menu)
        else if (st + $(window).height() < $(document).height()) {
            this.maximize();
        }

        lastScrollTop = st;
    },
    handleLogoClick: function (e) {
        e.preventDefault();
        this.maximize();
    },
    init: function (id) {

        var _this = this;
        _this.el = $(id);

        // === SCROLL
        $(window).scroll(function (event) {
            didScroll = true;
        });

        setInterval(function () {
            if (didScroll) {
                _this.handleScroll();
                didScroll = false;
            }
        }, 50);

        // === CLICK ON LOGO 
        var logo = _this.el.find('.bottom-section .navbar-logo');
        logo.on('click', function (e) {
            _this.handleLogoClick(e);
        });
    }
};

navbar.init('#navbar');