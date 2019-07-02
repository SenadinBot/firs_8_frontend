$(document).ready(function () {

    // Adding Class on Scroll
    $(window).on('load', function () {
        var winOffset = document.documentElement.scrollTop || document.body.scrollTop;
        if (winOffset > 60.5) {
            $('body').addClass('nav-fixed');
        }
    });
    $(window).scroll(function () {
        var winOffset = document.documentElement.scrollTop || document.body.scrollTop;
        if (winOffset > 60) {
            $('body').addClass('nav-fixed');
        } else {
            $('body').removeClass('nav-fixed');
        }
    });

    // Open/Close Header Search
    $('.header-search-icon').on('click', function () {
        $(this).parent().addClass('search-active');
    });
    $('.inner-close-icon').on('click', function () {
        $('.header-search').removeClass('search-active');
    });

    // Open/Close Mobile Menu
    $('.nav-icon').on('click', function () {
        $('body').toggleClass('menu-open');
        $('.menu-item-side').removeClass('second-level');
        $('.sub-menu').removeClass('first-level');
    })

    $('.phone-container').on('click', function () {
        $('.menu-item-side').removeClass('second-level');
        $('.sub-menu').removeClass('first-level');
        $('body').removeClass('menu-open');
    })

    // Open/Close Mobile Submenu 
    if ($(window).width() < 992) {
        $('.sub-menu > .mobile-arrow').on('click', function (e) {
            $(this).parents('.sub-menu').toggleClass('first-level').siblings().removeClass('first-level');
            $('.menu-item-side').removeClass('second-level');
        });
        $('.menu-item-side .mobile-arrow').on('click', function (e) {
            $(this).parents('.menu-items-content-item').siblings().children().removeClass('second-level');
            $(this).parents('.menu-item-side').toggleClass("second-level").siblings().removeClass('second-level');
        });
    }

    // Tablet Header Menu
    if ($(window).width() > 992 && $(window).width() < 1199) {
        $(document).on('touchstart click', function (e) {
            $('.sub-menu').removeClass("active-hover");
        });
        $('.sub-menu').on('touchstart click', function (e) {
            console.log('test');
            event.stopPropagation();
        })
        $('.sub-menu > a').on('touchstart click', function (e) {
            if (e.type == "touchstart") {
                if (!$(this).parent().hasClass("active-hover")) {
                    e.preventDefault();
                }
                $(this).parent().toggleClass("active-hover").siblings().removeClass('active-hover');
                if ($(".sub-menu").hasClass("active-hover")) {
                    $(this).removeClass("active-hover");
                }
                event.stopPropagation();
            } else if (e.type == "click") {
            }
        });
    };

    // Footer Intro Carousel
    $('.footer-intro-carousel').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 7000,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
        ]
    });

    // Video Modal
    $('.video-modal').on('hidden.bs.modal', function () {
        $(".video-modal iframe").attr("src", $(".video-modal iframe").attr("src"));
    });

    // Testimonial Carousel
    $('.testimonial-carousel').slick({
        dots: true,
        arrows: false,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
        ]
    });

    // Products Carousel
    $('.products-carousel').slick({
        dots: true,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
        ]
    });

    // Accordion active body
    $('.card-header').click(function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
        } else {
            $('.card-header').parent().removeClass('active');
            $(this).parent().addClass('active');
        }
    });

    // Video Carousel
    $('.video-carousel').slick({
        dots: true,
        arrows: false,
        centerMode: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
        ]
    });

    // Text Image Carousel
    $('.text-image-carousel').slick({
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 800,
        lazyLoad: 'progressive',
        waitForAnimate: true,
        useTransform: true,
    }).slickAnimation();
    $('.slick-prev').click(function () {
        $('.text-image-carousel').slick('slickPrev');
    })
    $('.slick-next').click(function () {
        $('.text-image-carousel').slick('slickNext');
    })

    // Custom Select
    $("select").prettySelect();
    $('.select-title').on('click', function () {
        $(this).parents('.select-item').toggleClass('select-open').siblings().removeClass('select-open');
    });

    // Products Filter
    $('.filter-icon').on('click', function () {
        $(this).parent().addClass('active-filter');
    });
    $('.filter-list li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.filter-container').removeClass('active-filter');
    });
    var $obj = $('.filter-container');
    if ($obj.length) {
        var top = $obj.offset().top;
    }
    $(window).scroll(function (event) {
        var position = $(this).scrollTop() + 115;
        if (position >= top) {
            $obj.addClass('filter-fixed');
        } else {
            $obj.removeClass('filter-fixed');
        }
    });
    $(window).on('load', function () {
        var position = $(this).scrollTop() + 115;
        if (position >= top) {
            $('.filter-container').addClass('filter-fixed');
        }
    });

    // Form Steps Wizard
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.step-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');
    
    allWells.hide();
    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('active-step');
            $item.addClass('active-step');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allPrevBtn.click(function () {
        var curStep = $(this).closest(".step-content"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
        $('div.setup-panel div a[href="#' + curStepBtn + '"]').removeClass('active-step');
        prevStepWizard.removeAttr('disabled').trigger('click');
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".step-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url'], input[type='email'], input[type='password']"),
            isValid = true;
        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }
        if (isValid) {
            nextStepWizard.removeAttr('disabled').trigger('click');
        }
    });
    $('div.setup-panel div a.active-step').trigger('click');

});

//Set Map
function initMap() {
    if ($('#map').length > 0) {
        function initialize() {
            var myLatlng = new google.maps.LatLng(53.3333, -3.08333);
            var color = "#212640";
            var mapOptions = {
                zoom: 11,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                zoomControl: false,
                disableDefaultUI: true,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            //Callout Content
            var contentString = 'Some address here..';
            //Set window width + content
            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 500
            });

            //Add Marker
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                // icon: imagePath,
                title: 'image title'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(-84.999999, -179.999999),
                new google.maps.LatLng(84.999999, 179.999999));

            rect = new google.maps.Rectangle({
                bounds: bounds,
                fillColor: color,
                fillOpacity: 0.6,
                strokeWeight: 0,
                map: map
            });

            //Resize Function
            google.maps.event.addDomListener(window, "resize", function () {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    }
}
