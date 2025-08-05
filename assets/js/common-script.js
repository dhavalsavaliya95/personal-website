$(document).ready(function() {
    // init smooth scroll
    var elem = document.querySelector("[data-scroll-container]");
    var scrollTopPosElem = document.querySelector("[data-scroll-to]");
    if (scrollTopPosElem) {
        var scrollTopPos = scrollTopPosElem.getBoundingClientRect().top / 3;
    }
    const scroll = new LocomotiveScroll({
        el: elem,
        smooth: true,
        smoothMobile: true,
    });
    scroll.on('scroll', obj => {
        if (typeof obj.currentElements['scrollToBlock'] === 'object') {
            var scrollPosition = Math.trunc(obj.scroll.y);
            if (scrollPosition > scrollTopPos) {
                scrollTopPosElem.style.display = 'none';
            }
            if (scrollPosition < 15) {
                scrollTopPosElem.style.display = 'inline';
            }
        }
    });

    // Text splitting
    Splitting();

    // toggle nav menu
    $('.menu-toggler').on('click', function() {
        $(this).toggleClass('on');
        $('.nav-menu').slideToggle()
    })

    // on change page fade effect
    $("body").css("display", "none");
    $('body').fadeIn(1000);
    $(".nav-menu li a").click(function(e) {
        e.preventDefault();
        $link = $(this).attr("href");
        $("body").fadeOut(800, function() {
            setTimeout(function() {
                window.location = $link;
            }, 100);
        });
    });

    function addClassByNavigator() {
        if (navigator.appVersion.indexOf("Linux") != -1) {
            $('[data-navigator]').addClass('is-linux');
        } else if (navigator.appVersion.indexOf("Win") != -1) {
            $('[data-navigator]').addClass('is-window');
        } else if (navigator.appVersion.indexOf("Mac") != -1) {
            $('[data-navigator]').addClass('is-mac');
        }
    }
    addClassByNavigator();

    function setCharAnimation() {
        var mediaQuery = window.matchMedia("(max-width: 768px)");
        var splitCharElem;
        if (mediaQuery.matches) {
            splitCharElem = document.querySelectorAll('.splitText.show-md .word .char');
        } else {
            splitCharElem = document.querySelectorAll('.splitText.hide-md .word .char');
        }

        if (splitCharElem) {
            for (var i = 0; i < splitCharElem.length; i++) {
                splitCharElem[i].style.setProperty('--animation-delay', i);
            }
        }
    }
    setCharAnimation();

    function selftSplitAnimation() {
        var tabElem = document.querySelectorAll('[data-animation="self"]');
        tabElem.forEach(function(el) {
            var targetChar = el.querySelectorAll('.word .char');
            for (var i = 0; i < targetChar.length; i++) {
                targetChar[i].style.setProperty('--animation-delay', i);
            }
        });
    }

    selftSplitAnimation();

    $(window).on('resize', function() {
        setCharAnimation();
    })
});