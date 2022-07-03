(function($) {
    "use strict";
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }

    function parallax() {
        $('.bg--parallax').each(function() {
            var el = $(this),
                xpos = "50%",
                windowHeight = $(window).height();
            if (isMobile.any()) {
                $(this).css('background-attachment', 'scroll');
            } else {
                $(window).scroll(function() {
                    var current = $(window).scrollTop(),
                        top = el.offset().top,
                        height = el.outerHeight();
                    if (top + height < current || top > current + windowHeight) {
                        return;
                    }
                    el.css('backgroundPosition', xpos + " " + Math.round((top - current) * 0.2) + "px");
                });
            }
        });
    }

    function backgroundImage() {
        var databackground = $('[data-background]');
        databackground.each(function() {
            if ($(this).attr('data-background')) {
                var image_path = $(this).attr('data-background');
                $(this).css({
                    'background': 'url(' + image_path + ')'
                });
            }
        });
    }

    function siteToggleAction() {
        var navSidebar = $('.navigation--sidebar'),
            filterSidebar = $('.ps-filter--sidebar');
        $('.menu-toggle-open').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('active')
            navSidebar.toggleClass('active');
            $('.ps-site-overlay').toggleClass('active');
        });

        $('.ps-toggle--sidebar').on('click', function(e) {
            e.preventDefault();
            var url = $(this).attr('href');
            $(this).toggleClass('active');
            $(this).siblings('a').removeClass('active');
            $(url).toggleClass('active');
            $(url).siblings('.ps-panel--sidebar').removeClass('active');
            $('.ps-site-overlay').toggleClass('active');
        });

        $('#filter-sidebar').on('click', function(e) {
            e.preventDefault();
            filterSidebar.addClass('active');
            $('.ps-site-overlay').addClass('active');
        });

        $('.ps-filter--sidebar .ps-filter__header .ps-btn--close').on('click', function(e) {
            e.preventDefault();
            filterSidebar.removeClass('active');
            $('.ps-site-overlay').removeClass('active');
        });

        $('body').on("click", function(e) {
            if ($(e.target).siblings(".ps-panel--sidebar").hasClass('active')) {
                $('.ps-panel--sidebar').removeClass('active');
                $('.ps-site-overlay').removeClass('active');
            }
        });
    }

    function editProd(){
        $('#editarProducto').on('click', function(e) {
            e.preventDefault();
            $('#price_prod').removeAttr("disabled");
            $('#name_prod').removeAttr("disabled");
            $('#categ_prod').removeAttr("disabled");
            $('#image_prod').addClass("hide");
            $('#id_image_prod').removeClass("hide");
        });
        $('#save').on('click', function(e) {
            e.preventDefault();
            $('#price_prod').prop("disabled",true);
            $('#name_prod').prop("disabled",true);
            $('#categ_prod').prop("disabled",true);
            $('#image_prod').removeClass("hide");
            $('#id_image_prod').addClass("hide");
            if($('#id_image_prod').val() ||$('#id_image_prod').val()!="" ){
                $("#image_prod").attr("src",$('#id_image_prod').val());   
            }
        });

        $('#out').on('click', function(e) {
            $('.contenedorVistaProductos').removeClass('none');
        });

        $('#add_prod').on('click', function(e) {
            e.preventDefault();
            
            let template_prod=`<tr>

            <td>1</td>

            <td>
                <h4> <span class="badge badge-success">${$('#exis_add').val()}</span></h4>
            </td>

            <td>
                <img src="${$('#img_add').val()}"
                    alt="" id="image_prod">
                <input type="text" id="id_image_prod" class="hide">
            </td>

            <td><input type="text" name="" id="name_prod" disabled
                    placeholder="${$('#name_add').val()}"> </td>

            <td><input type="text" name="" id="categ_prod" disabled
                    placeholder="${$('#categ_add').val()}"></td>

            <td><input type="text" name="" id="price_prod" disabled="disabled"
                    placeholder="${$('#price_add').val()}"></td>
            <td>
                <div class="btn-group">

                    <button type="button" id="editarProducto"
                        class="btn btn-warning rounded-circle mr-2">

                        <i class="fas fa-pencil-alt"></i>

                    </button>

                    <!-- <button type="button" class="btn btn-danger rounded-circle">

                        <i class="fas fa-trash"></i>
                    </button> -->

                    <button type="button" class="btn btn-success rounded-circle"
                        id="save">

                        <i class="fas fa-save"></i>
                    </button>

                </div>

            </td>

        </tr>`
            $('#table_prod').append(template_prod); 
            $('.contenedorVistaProductos').addClass('none');
            
        });

        $('#add_prod_button').on('click', function(e) {
            e.preventDefault();
            $('.contenedorVistaProductos').removeClass('none');
        });
    }

    function subMenuToggle() {
        $('.menu--mobile .menu-item-has-children > .sub-toggle').on('click', function(e) {
            e.preventDefault();
            var current = $(this).parent('.menu-item-has-children')
            $(this).toggleClass('active');
            current.siblings().find('.sub-toggle').removeClass('active');
            current.children('.sub-menu').slideToggle(350);
            current.siblings().find('.sub-menu').slideUp(350);
            if (current.hasClass('has-mega-menu')) {
                current.children('.mega-menu').slideToggle(350);
                current.siblings('.has-mega-menu').find('.mega-menu').slideUp(350);
            }

        });
        $('.menu--mobile .has-mega-menu .mega-menu__column .sub-toggle').on('click', function(e) {
            e.preventDefault();
            var current = $(this).closest('.mega-menu__column')
            $(this).toggleClass('active');
            current.siblings().find('.sub-toggle').removeClass('active');
            current.children('.mega-menu__list').slideToggle(350);
            current.siblings().find('.mega-menu__list').slideUp(350);
        });
        var listCategories = $('.ps-list--categories');
        if (listCategories.length > 0) {
            $('.ps-list--categories .menu-item-has-children > .sub-toggle').on('click', function(e) {
                e.preventDefault();
                var current = $(this).parent('.menu-item-has-children')
                $(this).toggleClass('active');
                current.siblings().find('.sub-toggle').removeClass('active');
                current.children('.sub-menu').slideToggle(350);
                current.siblings().find('.sub-menu').slideUp(350);
                if (current.hasClass('has-mega-menu')) {
                    current.children('.mega-menu').slideToggle(350);
                    current.siblings('.has-mega-menu').find('.mega-menu').slideUp(350);
                }

            });
            $('#pay').on('click',()=>{
                $('#container_pay').removeClass('none');
                $('#main-all').addClass('none');
                $('#product-specific').addClass('none')
            })
        }

        $('.ps-product__title').on('click', function(e) {
            e.preventDefault();
            // document.getElementById("main-all").style.display = "none";
            // document.getElementById("product-specific").style.display = "initial";
            $('#main-all').addClass("hide");
            $('#product-specific').removeClass("hide");
            // var current = $(this).closest('.mega-menu__column')
            // $(this).toggleClass('active');
            // current.siblings().find('.sub-toggle').removeClass('active');
            // current.children('.mega-menu__list').slideToggle(350);
            // current.siblings().find('.mega-menu__list').slideUp(350);
        });

        $('#showAll').on('click', function(e) {
            e.preventDefault();
            $('#main-all').removeClass("hide");
            $('#product-specific').addClass("hide");
        });

    }

    function stickyHeader() {
        var header = $('.header'),
            scrollPosition = 0,
            checkpoint = 50;
        header.each(function() {
            if ($(this).data('sticky') === true) {
                var el = $(this);
                $(window).scroll(function() {

                    var currentPosition = $(this).scrollTop();
                    if (currentPosition > checkpoint) {
                        el.addClass('header--sticky');
                    } else {
                        el.removeClass('header--sticky');
                    }
                });
            }
        })

        var stickyCart = $('#cart-sticky');
        if (stickyCart.length > 0) {
            $(window).scroll(function() {
                var currentPosition = $(this).scrollTop();
                if (currentPosition > checkpoint) {
                    stickyCart.addClass('active');
                } else {
                    stickyCart.removeClass('active');
                }
            });
        }
    }

    function owlCarouselConfig() {
        var target = $('.owl-slider');
        if (target.length > 0) {
            target.each(function() {
                var el = $(this),
                    dataAuto = el.data('owl-auto'),
                    dataLoop = el.data('owl-loop'),
                    dataSpeed = el.data('owl-speed'),
                    dataGap = el.data('owl-gap'),
                    dataNav = el.data('owl-nav'),
                    dataDots = el.data('owl-dots'),
                    dataAnimateIn = (el.data('owl-animate-in')) ? el.data('owl-animate-in') : '',
                    dataAnimateOut = (el.data('owl-animate-out')) ? el.data('owl-animate-out') : '',
                    dataDefaultItem = el.data('owl-item'),
                    dataItemXS = el.data('owl-item-xs'),
                    dataItemSM = el.data('owl-item-sm'),
                    dataItemMD = el.data('owl-item-md'),
                    dataItemLG = el.data('owl-item-lg'),
                    dataItemXL = el.data('owl-item-xl'),
                    dataNavLeft = (el.data('owl-nav-left')) ? el.data('owl-nav-left') : "<i class='icon-chevron-left'></i>",
                    dataNavRight = (el.data('owl-nav-right')) ? el.data('owl-nav-right') : "<i class='icon-chevron-right'></i>",
                    duration = el.data('owl-duration'),
                    datamouseDrag = (el.data('owl-mousedrag') == 'on') ? true : false;
                if (target.children('div, span, a, img, h1, h2, h3, h4, h5, h5').length >= 2) {
                    el.owlCarousel({
                        animateIn: dataAnimateIn,
                        animateOut: dataAnimateOut,
                        margin: dataGap,
                        autoplay: dataAuto,
                        autoplayTimeout: dataSpeed,
                        autoplayHoverPause: true,
                        loop: dataLoop,
                        nav: dataNav,
                        mouseDrag: datamouseDrag,
                        touchDrag: true,
                        autoplaySpeed: duration,
                        navSpeed: duration,
                        dotsSpeed: duration,
                        dragEndSpeed: duration,
                        navText: [dataNavLeft, dataNavRight],
                        dots: dataDots,
                        items: dataDefaultItem,
                        responsive: {
                            0: {
                                items: dataItemXS
                            },
                            480: {
                                items: dataItemSM
                            },
                            768: {
                                items: dataItemMD
                            },
                            992: {
                                items: dataItemLG
                            },
                            1200: {
                                items: dataItemXL
                            },
                            1680: {
                                items: dataDefaultItem
                            }
                        }
                    });
                }

            });
        }
    }

    function masonry($selector) {
        var masonry = $($selector);
        if (masonry.length > 0) {
            if (masonry.hasClass('filter')) {
                masonry.imagesLoaded(function() {
                    masonry.isotope({
                        columnWidth: '.grid-sizer',
                        itemSelector: '.grid-item',
                        isotope: {
                            columnWidth: '.grid-sizer'
                        },
                        filter: "*"
                    });
                });
                var filters = masonry.closest('.masonry-root').find('.ps-masonry-filter > li > a');
                filters.on('click', function(e) {
                    e.preventDefault();
                    var selector = $(this).attr('href');
                    filters.find('a').removeClass('current');
                    $(this).parent('li').addClass('current');
                    $(this).parent('li').siblings('li').removeClass('current');
                    $(this).closest('.masonry-root').find('.ps-masonry').isotope({
                        itemSelector: '.grid-item',
                        isotope: {
                            columnWidth: '.grid-sizer'
                        },
                        filter: selector
                    });
                    return false;
                });
            } else {
                masonry.imagesLoaded(function() {
                    masonry.masonry({
                        columnWidth: '.grid-sizer',
                        itemSelector: '.grid-item'
                    });
                });
            }
        }
    }

    function mapConfig() {
        var map = $('#contact-map');
        if (map.length > 0) {
            map.gmap3({
                address: map.data('address'),
                zoom: map.data('zoom'),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            }).marker(function(map) {
                return {
                    position: map.getCenter(),
                    icon: 'img/marker.png',
                };
            }).infowindow({
                content: map.data('address')
            }).then(function(infowindow) {
                var map = this.get(0);
                var marker = this.get(1);
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            });
        } else {
            return false;
        }
    }

    function slickConfig() {
        var product = $('.ps-product--detail');
        if (product.length > 0) {
            var primary = product.find('.ps-product__gallery'),
                second = product.find('.ps-product__variants'),
                vertical = product.find('.ps-product__thumbnail').data('vertical');
            primary.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.ps-product__variants',
                fade: true,
                dots: false,
                infinite: false,
                arrows: primary.data('arrow'),
                prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>",
            });
            second.slick({
                slidesToShow: second.data('item'),
                slidesToScroll: 1,
                infinite: false,
                arrows: second.data('arrow'),
                focusOnSelect: true,
                prevArrow: "<a href='#'><i class='fa fa-angle-up'></i></a>",
                nextArrow: "<a href='#'><i class='fa fa-angle-down'></i></a>",
                asNavFor: '.ps-product__gallery',
                vertical: vertical,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            arrows: second.data('arrow'),
                            slidesToShow: 4,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            arrows: second.data('arrow'),
                            slidesToShow: 4,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                ]
            });
        }
    }

    function tabs() {
        $('.ps-tab-list  li > a ').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(this).closest('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            $(target).addClass('active');
            $(target).siblings('.ps-tab').removeClass('active');
        });
        $('.ps-tab-list.owl-slider .owl-item a').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(this).closest('.owl-item').siblings('.owl-item').removeClass('active');
            $(this).closest('.owl-item').addClass('active');
            $(target).addClass('active');
            $(target).siblings('.ps-tab').removeClass('active');
        });
    }

    function rating() {
        $('select.ps-rating').each(function() {
            var readOnly;
            if ($(this).attr('data-read-only') == 'true') {
                readOnly = true
            } else {
                readOnly = false;
            }
            $(this).barrating({
                theme: 'fontawesome-stars',
                readonly: readOnly,
                emptyValue: '0'
            });
        });
    }

    function productLightbox() {
        var product = $('.ps-product--detail');
        if (product.length > 0) {
            $('.ps-product__gallery').lightGallery({
                selector: '.item a',
                thumbnail: true,
                share: false,
                fullScreen: false,
                autoplay: false,
                autoplayControls: false,
                actualSize: false
            });
            if (product.hasClass('ps-product--sticky')) {
                $('.ps-product__thumbnail').lightGallery({
                    selector: '.item a',
                    thumbnail: true,
                    share: false,
                    fullScreen: false,
                    autoplay: false,
                    autoplayControls: false,
                    actualSize: false
                });
            }
        }
        $('.ps-gallery--image').lightGallery({
            selector: '.ps-gallery__item',
            thumbnail: true,
            share: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            actualSize: false
        });
        $('.ps-video').lightGallery({
            thumbnail: false,
            share: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            actualSize: false
        });
    }

    function backToTop() {
        var scrollPos = 0;
        var element = $('#back2top');
        $(window).scroll(function() {
            var scrollCur = $(window).scrollTop();
            if (scrollCur > scrollPos) {
                // scroll down
                if (scrollCur > 500) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            } else {
                // scroll up
                element.removeClass('active');
            }

            scrollPos = scrollCur;
        });

        element.on('click', function() {
            $('html, body').animate({
                scrollTop: '0px'
            }, 800);
        });
    }

    function filterSlider() {
        var el = $('.ps-slider');
        var min = el.siblings().find('.ps-slider__min');
        var max = el.siblings().find('.ps-slider__max');
        var defaultMinValue = el.data('default-min');
        var defaultMaxValue = el.data('default-max');
        var maxValue = el.data('max');
        var step = el.data('step');
        if (el.length > 0) {
            el.slider({
                min: 0,
                max: maxValue,
                step: step,
                range: true,
                values: [defaultMinValue, defaultMaxValue],
                slide: function(event, ui) {
                    var values = ui.values;
                    min.text('$' + values[0]);
                    max.text('$' + values[1]);
                }
            });
            var values = el.slider("option", "values");
            min.text('$' + values[0]);
            max.text('$' + values[1]);
        } else {
            // return false;
        }
    }

    function modalInit() {
        var modal = $('.ps-modal');
        if (modal.length) {
            if (modal.hasClass('active')) {
                $('body').css('overflow-y', 'hidden');
            }
        }
        modal.find('.ps-modal__close, .ps-btn--close').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.ps-modal').removeClass('active');
        });
        $('.ps-modal-link').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(target).addClass('active');
            $("body").css('overflow-y', 'hidden');
        });
        $('.ps-modal').on("click", function(event) {
            if (!$(event.target).closest(".ps-modal__container").length) {
                modal.removeClass('active');
                $("body").css('overflow-y', 'auto');
            }
        });
    }

    function searchInit() {
        var searchbox = $('.ps-search');
        $('.ps-search-btn').on('click', function(e) {
            e.preventDefault();
            searchbox.addClass('active');
        });
        searchbox.find('.ps-btn--close').on('click', function(e) {
            e.preventDefault();
            searchbox.removeClass('active');
        });
    }

    function countDown() {
        var time = $(".ps-countdown");
        time.each(function() {
            var el = $(this),
                value = $(this).data('time');
            var countDownDate = new Date(value).getTime();
            var timeout = setInterval(function() {
                var now = new Date().getTime(),
                    distance = countDownDate - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds = Math.floor((distance % (1000 * 60)) / 1000);
                el.find('.days').html(days);
                el.find('.hours').html(hours);
                el.find('.minutes').html(minutes);
                el.find('.seconds').html(seconds);
                if (distance < 0) {
                    clearInterval(timeout);
                    el.closest('.ps-section').hide();
                }
            }, 1000);
        });
    }

    function productFilterToggle() {
        $('.ps-filter__trigger').on('click', function(e) {
            e.preventDefault();
            var el = $(this);
            el.find('.ps-filter__icon').toggleClass('active');
            el.closest('.ps-filter').find('.ps-filter__content').slideToggle();
        });
        if ($('.ps-sidebar--home').length > 0) {
            $('.ps-sidebar--home > .ps-sidebar__header > a').on('click', function(e) {
                e.preventDefault();
                $(this).closest('.ps-sidebar--home').children('.ps-sidebar__content').slideToggle();
            })
        }
    }

    function mainSlider() {
        var homeBanner = $('.ps-carousel--animate');
        homeBanner.slick({
            autoplay: true,
            speed: 1000,
            lazyLoad: 'progressive',
            arrows: false,
            fade: true,
            dots: true,
            prevArrow: "<i class='slider-prev ba-back'></i>",
            nextArrow: "<i class='slider-next ba-next'></i>"
        });
    }

    function subscribePopup() {
        var subscribe = $('#subscribe'),
            time = subscribe.data('time');
        setTimeout(function() {
            if (subscribe.length > 0) {
                subscribe.addClass('active');
                $('body').css('overflow', 'hidden');
            }
        }, time);
        $('.ps-popup__close').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.ps-popup').removeClass('active');
            $('body').css('overflow', 'auto');
        });
        $('#subscribe').on("click", function(event) {
            if (!$(event.target).closest(".ps-popup__content").length) {
                subscribe.removeClass('active');
                $("body").css('overflow-y', 'auto');
            }
        });
    }

    function stickySidebar() {
        var sticky = $('.ps-product--sticky'),
            stickySidebar, checkPoint = 992,
            windowWidth = $(window).innerWidth();
        if (sticky.length > 0) {
            stickySidebar = new StickySidebar('.ps-product__sticky .ps-product__info', {
                topSpacing: 20,
                bottomSpacing: 20,
                containerSelector: '.ps-product__sticky',
            });
            if ($('.sticky-2').length > 0) {
                var stickySidebar2 = new StickySidebar('.ps-product__sticky .sticky-2', {
                    topSpacing: 20,
                    bottomSpacing: 20,
                    containerSelector: '.ps-product__sticky',
                });
            }
            if (checkPoint > windowWidth) {
                stickySidebar.destroy();
                stickySidebar2.destroy();
            }
        } else {
            return false;
        }
    }

    function accordion() {
        var accordion = $('.ps-accordion');
        accordion.find('.ps-accordion__content').hide();
        $('.ps-accordion.active').find('.ps-accordion__content').show();
        accordion.find('.ps-accordion__header').on('click', function(e) {
            e.preventDefault();
            if ($(this).closest('.ps-accordion').hasClass('active')) {
                $(this).closest('.ps-accordion').removeClass('active');
                $(this).closest('.ps-accordion').find('.ps-accordion__content').slideUp(350);

            } else {
                $(this).closest('.ps-accordion').addClass('active');
                $(this).closest('.ps-accordion').find('.ps-accordion__content').slideDown(350);
                $(this).closest('.ps-accordion').siblings('.ps-accordion').find('.ps-accordion__content').slideUp();
            }
            $(this).closest('.ps-accordion').siblings('.ps-accordion').removeClass('active');
            $(this).closest('.ps-accordion').siblings('.ps-accordion').find('.ps-accordion__content').slideUp();
        });
    }

    function progressBar() {
        var progress = $('.ps-progress');
        progress.each(function(e) {
            var value = $(this).data('value');
            $(this).find('span').css({
                width: value + "%"
            })
        });
    }

    function customScrollbar() {
        $('.ps-custom-scrollbar').each(function() {
            var height = $(this).data('height');
            $(this).slimScroll({
                height: height + 'px',
                alwaysVisible: true,
                color: '#000000',
                size: '6px',
                railVisible: true,
            });
        })
    }

    function select2Cofig() {
        $('select.ps-select').select2({
            placeholder: $(this).data('placeholder'),
            minimumResultsForSearch: -1
        });
    }

    function carouselNavigation() {
        var prevBtn = $('.ps-carousel__prev'),
            nextBtn = $('.ps-carousel__next');
        prevBtn.on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(target).trigger('prev.owl.carousel', [1000]);
        });
        nextBtn.on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(target).trigger('next.owl.carousel', [1000]);
        });
    }

    function dateTimePicker() {
        $('.ps-datepicker').datepicker();
    }

    $(function() {
        backgroundImage();
        owlCarouselConfig();
        siteToggleAction();
        subMenuToggle();
        editProd();
        masonry('.ps-masonry');
        productFilterToggle();
        tabs();
        slickConfig();     
        productLightbox();        
        rating();
        backToTop();
        stickyHeader();
        filterSlider();
        mapConfig();
        modalInit();
        searchInit();
        countDown();
        mainSlider();
        parallax();
        stickySidebar();
        accordion();
        progressBar();
        customScrollbar();
        select2Cofig();
        carouselNavigation();
        dateTimePicker();
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(window).on('load', function() {
        $('body').addClass('loaded');
        subscribePopup();
    });

    $.scrollUp({
        scrollText:'',
        scrollSpeed: 1000
    })

})(jQuery);


    function aumentarWeb(dataNombre){
        const $contenedorMedicamentosCarrito=document.querySelectorAll(".medicamentoCarritoWeb");
        const $medicamentosIncremento=document.querySelectorAll(".nombreMedicamentoCarritoWeb");
        const $medicamentoCantidad=document.querySelectorAll(".nombreMedicamentoCarritoWeb + small > strong");
        const $medicamentoPrecio=document.querySelectorAll(".nombreMedicamentoCarritoWeb + small > span");
        const $totalCarritoWeb=document.querySelector(".carritoFooterWeb h3 strong span strong");        
        let cantidad=0,total=0,precio;
        for(let k=0;k<$medicamentosIncremento.length;k++){
            if($medicamentosIncremento[k].dataset.nombre==dataNombre){
                if($contenedorMedicamentosCarrito[k].classList.contains("none")){
                    $contenedorMedicamentosCarrito[k].classList.remove("none");
                }
                cantidad=$medicamentoCantidad[k].textContent;
                total=$totalCarritoWeb.textContent;                
                precio=$medicamentoPrecio[k].textContent;

                
                cantidad=Math.abs(cantidad)+Math.abs(0.5);
                $medicamentoCantidad[k].textContent=cantidad;
                total=Math.abs(total)+Math.abs(precio);
                
                $totalCarritoWeb.textContent=total.toFixed(2);
                
            }
        }
        document.querySelector(".carritoMovil").innerHTML=document.querySelector(".carritoWebPrincipal").innerHTML;
    }

    function disminuirWeb(dataNombre,num){
        const $medicamentosIncremento=document.querySelectorAll(".nombreMedicamentoCarritoWeb");
        const $medicamentoCantidad=document.querySelectorAll(".nombreMedicamentoCarritoWeb + small > strong");
        const $medicamentoPrecio=document.querySelectorAll(".nombreMedicamentoCarritoWeb + small > span");
        const $totalCarritoWeb=document.querySelector(".carritoFooterWeb h3 strong span strong");  
        const $contenedoresCarritosWeb=document.querySelectorAll(".medicamentoCarritoWeb");
        let cantidad=0,total=0,precio;
        for(let k=0;k<$medicamentosIncremento.length;k++){
            if($medicamentosIncremento[k].dataset.nombre==dataNombre){
                cantidad=$medicamentoCantidad[k].textContent;
                total=$totalCarritoWeb.textContent;                
                precio=$medicamentoPrecio[k].textContent;
                
                if(cantidad!=0){
                    cantidad=Math.abs(cantidad)-Math.abs(num);               
                    $medicamentoCantidad[k].textContent=cantidad;
                    total=Math.abs(total)-Math.abs(precio)*Math.abs(num);                    
                    $totalCarritoWeb.textContent=total.toFixed(2);   
                    if(cantidad==0){
                        $contenedoresCarritosWeb[k].classList.add("none");
                    }                                     
                }               
            }
        }
        document.querySelector(".carritoMovil").innerHTML=document.querySelector(".carritoWebPrincipal").innerHTML;
    }
    
    const $medicamentosWeb=document.querySelectorAll(".ps-product__title");
    
    function eventosCarritos($contenedor, pocision,e){
        const $medicamentosCarritoWeb=document.querySelectorAll(".nombreMedicamentoCarritoWeb");  
        
        let existe=false;
        for(let k=0;k<$medicamentosCarritoWeb.length;k++){

            if($contenedor[pocision].dataset.nombre==$medicamentosCarritoWeb[k].dataset.nombre){                    
                existe=true;
                //Inicio de los eventos de suma                
                console.log(k);
                if(e.target.getAttribute("alt")=="Icono de Suma"){
                    aumentarWeb($contenedor[pocision].dataset.nombre);                                
                }else if(e.target.getAttribute("alt")=="Icono de Resta"){//Fin de los eventos de suma e inicio de resta
                    disminuirWeb($contenedor[pocision].dataset.nombre,1);
                }else if(e.target.getAttribute("alt")=="Icono de Basurera"){//Fin de los eventos de resta e inicio de basura
                    const $medicamentoCantidad=document.querySelectorAll(".nombreMedicamentoCarritoWeb + small > strong");                    
                    const $medicamentosEliminar=document.querySelectorAll(".nombreMedicamentoCarritoWeb");
                    let num=0;
                    for(let z=0;z<$medicamentosEliminar.length;z++){
                        if($medicamentosEliminar[z].dataset.nombre==$contenedor[pocision].dataset.nombre){
                            num=$medicamentoCantidad[z].textContent;
                        }
                    }
                    disminuirWeb($contenedor[pocision].dataset.nombre,Math.abs(num));                   

                }             
                
            }        
    }

    if(!existe && e.target==$contenedor[pocision].childNodes[1] 
        && $contenedor[pocision].classList.contains("iconosDelCarritoConteiner")){
        
        const direccionImagen=document.querySelectorAll(".ps-product.ps-product--simple div a img")[pocision].getAttribute("src");
        const nombreMedicamento=document.querySelectorAll(".ps-product.ps-product--simple div:nth-of-type(2) div a")[pocision].textContent;
        const precioMedicamento=document.querySelectorAll(".ps-product__price span")[pocision].innerHTML;
        const $CARRITO=document.querySelector(".carritoWeb");
        const $elemetoCarrito=document.createElement("div");
        $elemetoCarrito.classList.add("ps-product--cart-mobile");
        $elemetoCarrito.classList.add("medicamentoCarritoWeb");
        var prod=[{id:90,cantidad:1},]
        $elemetoCarrito.innerHTML=`
        <div class="ps-product__thumbnail">
            <a href="#">
                
                <img src="${direccionImagen}" alt="">
            </a>
        </div>
    
        <div class="ps-product__content">
            <a class="ps-product__remove" href="#">
                <i class="icon-cross"></i>
            </a>
            <a class="nombreMedicamentoCarritoWeb" data-nombre="${$medicamentosWeb[pocision].dataset.nombre}" href="#">${nombreMedicamento}</a>                                            
            <small><strong>0.5</strong> x $<span>${precioMedicamento}</span></small>
            <div class="iconosDelCarritoConteinerVenta" data-nombre="${$medicamentosWeb[pocision].dataset.nombre}">
                <img src="./img-santini/icons/iconoSuma.svg" alt="Icono de Suma">
                <img src="./img-santini/icons/iconoRestar.svg" alt="Icono de Resta">
                <img src="./img-santini/icons/iconoBasurera.svg" alt="Icono de Basurera">
            </div>
        </div>`;
        $CARRITO.appendChild($elemetoCarrito);       
        


        const $medicamentosCarritoWebEventoCompras=document.querySelectorAll(".iconosDelCarritoConteinerVenta");

    for(let y=0;y<$medicamentosCarritoWebEventoCompras.length;y++){
        $medicamentosCarritoWebEventoCompras[y].addEventListener("click",(e)=>{ 
            if($medicamentosCarritoWebEventoCompras[y].dataset.nombre==$medicamentosWeb[pocision].dataset.nombre){
                eventosCarritos($medicamentosCarritoWebEventoCompras, y,e);
            }                  
        
        })            
    }
        aumentarWeb($medicamentosWeb[pocision].dataset.nombre);     
        
        //Esta es una de las partes de categoria
    }else if(!existe && e.target==$contenedor[pocision].childNodes[3] 
        && $contenedor[pocision].classList.contains("iconosDelCarritoConteinerVentaCategorias")){

            console.log($contenedor[pocision].childNodes[3]);
            let direccionImagen="";
            let nombreMedicamento="";
            let precioMedicamento="";
            if($contenedor[pocision].classList.contains("recomend")){

                
                
                    direccionImagen=document.querySelectorAll(".categoriaRecomendado div:nth-of-type(1) a img")[(pocision-2)].getAttribute("src");
                
                nombreMedicamento=document.querySelectorAll(".categoriaRecomendado div:nth-of-type(2) div:nth-of-type(1) a")[pocision].textContent;
                precioMedicamento=document.querySelectorAll(".categoriaRecomendado div:nth-of-type(2) div:nth-of-type(1) p span")[pocision].innerHTML;                
            }else{   
                direccionImagen=document.querySelectorAll(".categoriaMejor div:nth-of-type(1) a img")[pocision+5].getAttribute("src");
                nombreMedicamento=document.querySelectorAll(".categoriaMejor div:nth-of-type(2) div:nth-of-type(1) a")[pocision].textContent;
                precioMedicamento=document.querySelectorAll(".categoriaMejor div:nth-of-type(2) div:nth-of-type(1) p span")[pocision].innerHTML;                
            }

            const $CARRITO=document.querySelector(".carritoWeb");
            const $elemetoCarrito=document.createElement("div");
            $elemetoCarrito.classList.add("ps-product--cart-mobile");
            $elemetoCarrito.classList.add("medicamentoCarritoWeb");
            $elemetoCarrito.innerHTML=`
            <div class="ps-product__thumbnail">
                <a href="#">
                    
                    <img src="${direccionImagen}" alt="">
                </a>
            </div>
        
            <div class="ps-product__content">
                <a class="ps-product__remove" href="#">
                    <i class="icon-cross"></i>
                </a>
                <a class="nombreMedicamentoCarritoWeb" data-nombre="${$contenedor[pocision].dataset.nombre}" href="#">${nombreMedicamento}</a>                                            
                <small><strong>0.5</strong> x $<span>${precioMedicamento}</span></small>
                <div class="iconosDelCarritoConteinerVenta" data-nombre="${$contenedor[pocision].dataset.nombre}">
                    <img src="./img-santini/icons/iconoSuma.svg" alt="Icono de Suma">
                    <img src="./img-santini/icons/iconoRestar.svg" alt="Icono de Resta">
                    <img src="./img-santini/icons/iconoBasurera.svg" alt="Icono de Basurera">
                </div>
            </div>`;
            $CARRITO.appendChild($elemetoCarrito);
    
            const $medicamentosCarritoWebEventoCompras=document.querySelectorAll(".iconosDelCarritoConteinerVenta");

            for(let y=0;y<$medicamentosCarritoWebEventoCompras.length;y++){
                $medicamentosCarritoWebEventoCompras[y].addEventListener("click",(e)=>{                   
                    if($medicamentosCarritoWebEventoCompras[y].dataset.nombre==$contenedor[pocision].dataset.nombre){
                        eventosCarritos($medicamentosCarritoWebEventoCompras, y,e);
                    }                
                })            
            }
    
         
            aumentarWeb($contenedor[pocision].dataset.nombre);     
//Fin de la parte uno de categorias


    }
    }


        let $medicamentosCarritoWebEvento=document.querySelectorAll(".iconosDelCarritoConteiner");
    
        if($medicamentosCarritoWebEvento.length>0){
            for(let y=0;y<$medicamentosWeb.length;y++){
                $medicamentosCarritoWebEvento[y].addEventListener("click",(e)=>{                   
                eventosCarritos($medicamentosCarritoWebEvento, y,e);
                })            
            }
        }
        
    
        let $medicamentosCarritoWebEventoCompras=document.querySelectorAll(".iconosDelCarritoConteinerVenta");
    
        for(let y=0;y<$medicamentosCarritoWebEventoCompras.length;y++){
            $medicamentosCarritoWebEventoCompras[y].addEventListener("click",(e)=>{                   
            eventosCarritos($medicamentosCarritoWebEventoCompras, y,e);
            })            
        }
    
        

        
            let $categoriaMejoresContenedor=document.querySelectorAll(".iconosDelCarritoConteinerVentaCategorias");
            for(let y=0;y<$categoriaMejoresContenedor.length;y++){
                
                $categoriaMejoresContenedor[y].addEventListener("click",(e)=>{                   
                eventosCarritos($categoriaMejoresContenedor, y,e);
                })            
        }

//Agregando el carrito de la ultima categoria

    const $contenedoresIconosMedicamamentosCategoriaExistente=document.querySelectorAll(".categoriaExistentes");

    for(let y=0;y<$contenedoresIconosMedicamamentosCategoriaExistente.length;y++){
        
        $contenedoresIconosMedicamamentosCategoriaExistente[y].addEventListener("click",(e)=>{
            let pocision=y;
            let $medicamentosCarritoWebEventoCompras=document.querySelectorAll(".iconosDelCarritoConteinerVenta");
            const nombreMEd=document.querySelectorAll(".medicamentoCateExistente div:nth-of-type(2) div:nth-of-type(1) a")[pocision].dataset.nombre;
//Inicio del evento categoriasExistentes
            let noExiste=true;
            for(let k=0;k<$medicamentosCarritoWebEventoCompras.length;k++){
                if($medicamentosCarritoWebEventoCompras[k].dataset.nombre==nombreMEd){
                    if(e.target.classList.contains("icon-bag2")){
                        aumentarWeb(nombreMEd);
                        noExiste=false;
                    }else if(e.target.classList.contains("icon-eye")){
                        //Aqui debes de agregar la vista de los medicamentos
                    }
                }    
            }


            if(noExiste){
                noExiste=false;
                const direccionImagen=document.querySelectorAll(".medicamentoCateExistente div a:nth-of-type(1) img")[pocision].getAttribute("src");
                const nombreMedicamento=document.querySelectorAll(".medicamentoCateExistente div:nth-of-type(2) div:nth-of-type(1) a")[pocision].textContent;
                const precioMedicamento=document.querySelectorAll(".medicamentoCateExistente div:nth-of-type(2) div:nth-of-type(1) p span")[pocision].innerHTML;
                
                const $CARRITO=document.querySelector(".carritoWeb");
                const $elemetoCarrito=document.createElement("div");
                $elemetoCarrito.classList.add("ps-product--cart-mobile");
                $elemetoCarrito.classList.add("medicamentoCarritoWeb");
                $elemetoCarrito.innerHTML=`
                <div class="ps-product__thumbnail">
                    <a href="#">
                        
                        <img src="${direccionImagen}" alt="">
                    </a>
                </div>
            
                <div class="ps-product__content">
                    <a class="ps-product__remove" href="#">
                        <i class="icon-cross"></i>
                    </a>
                    <a class="nombreMedicamentoCarritoWeb" data-nombre="${nombreMEd}" href="#">${nombreMedicamento}</a>                                            
                    <small><strong>1</strong> x $<span>${precioMedicamento}</span></small>
                    <div class="iconosDelCarritoConteinerVentaExistentes iconosDelCarritoConteinerVenta" data-nombre="${nombreMEd}">
                        <img src="./img-santini/icons/iconoSuma.svg" alt="Icono de Suma">
                        <img src="./img-santini/icons/iconoRestar.svg" alt="Icono de Resta">
                        <img src="./img-santini/icons/iconoBasurera.svg" alt="Icono de Basurera">
                    </div>
                </div>`;
                $CARRITO.appendChild($elemetoCarrito);
        
        
        
                $medicamentosCarritoWebEventoCompras=document.querySelectorAll(".iconosDelCarritoConteinerVentaExistentes");   
        
            for(let y=0;y<$medicamentosCarritoWebEventoCompras.length;y++){
                $medicamentosCarritoWebEventoCompras[y].addEventListener("click",(ef)=>{                   
                    // console.log();                    
                    if($medicamentosCarritoWebEventoCompras[y].dataset.nombre==nombreMEd){
                        eventosCarritos($medicamentosCarritoWebEventoCompras, y,ef);
                    }                
                })            
            }
                aumentarWeb(nombreMEd);     
                
            }
        
        //Fin del evento CategoriaExistente            
        })
    }

    
    // console.log(carritoCompleto);
    const $visitaCategorias=document.querySelector(".VerTodo");

    if(!$visitaCategorias){
        let carritoCompleto=document.querySelector(".carritoWebPrincipal");    
        carritoCompleto.innerHTML=localStorage.getItem("carrito");
    }else{        
        $visitaCategorias.addEventListener("click",(e)=>{
            let carritoCompleto=document.querySelector(".carritoWebPrincipal").innerHTML;    
            localStorage.setItem("carrito",carritoCompleto);
            window.location.href="categories.html";
        })
    }
    

    let $medicamentosCarritoWebEventoMovil=document.querySelectorAll(".iconosDelCarritoConteinerMovil");
    
    if($medicamentosCarritoWebEventoMovil.length>0){
        for(let y=0;y<$medicamentosWeb.length;y++){
            $medicamentosCarritoWebEventoMovil[y].addEventListener("click",(e)=>{                   
            eventosCarritos($medicamentosCarritoWebEventoMovil, y,e);
            })            
        }
    }
    

    let $medicamentosCarritoWebEventoComprasMovil=document.querySelectorAll(".iconosDelCarritoConteinerVentaMovil");

    for(let y=0;y<$medicamentosCarritoWebEventoComprasMovil.length;y++){
        $medicamentosCarritoWebEventoComprasMovil[y].addEventListener("click",(e)=>{                   
        eventosCarritos($medicamentosCarritoWebEventoComprasMovil, y,e);
        })            
    }

    

    
        let $categoriaMejoresContenedorMovil=document.querySelectorAll(".iconosDelCarritoConteinerVentaCategoriasMovil");
        for(let y=0;y<$categoriaMejoresContenedorMovil.length;y++){
            
            $categoriaMejoresContenedorMovil[y].addEventListener("click",(e)=>{                   
            eventosCarritos($categoriaMejoresContenedorMovil, y,e);
            })            
    }

    function eventosCate(catego){
        const $vistaElementos=document.querySelectorAll(`${catego} div:nth-of-type(2) a`);
        const $galeria=document.querySelector(`.ps-wrapper div div:nth-of-type(1) a img`);
        const $vistaElementosImagenes=document.querySelectorAll(`${catego} div a img:nth-of-type(1)`);
        for(let y=0;y<$vistaElementos.length;y++){
            $vistaElementos[y].addEventListener("click",(e)=>{
                console.log(y);
                if($vistaElementosImagenes[y+1]){
                    $galeria.setAttribute("src",$vistaElementosImagenes[y+1].getAttribute("src"));
                    document.querySelector(".ps-wrapper div div:nth-of-type(2) a img").setAttribute("src",$vistaElementosImagenes[y+1].getAttribute("src"));
                    document.querySelector(".ps-product__variants div:nth-of-type(1) img").setAttribute("src",$vistaElementosImagenes[y+1].getAttribute("src"));
                    document.querySelector(".ps-product__variants div:nth-of-type(2) img").setAttribute("src",$vistaElementosImagenes[y+1].getAttribute("src"));
                    document.querySelector(".ps-wrapper div div:nth-of-type(2) a img").setAttribute("src",$vistaElementosImagenes[y+1].getAttribute("src"));
                    document.querySelector(".ps-product__variants div:nth-of-type(1) img").setAttribute("src",$vistaElementosImagenes[y+1].getAttribute("src"));
                    document.querySelector(".ps-product__variants div:nth-of-type(2) img").setAttribute("src",$vistaElementosImagenes[y+1].getAttribute("src"));
    
                }else{
                    $galeria.setAttribute("src",$vistaElementosImagenes[8].getAttribute("src"));
                    document.querySelector(".ps-wrapper div div:nth-of-type(2) a img").setAttribute("src",$vistaElementosImagenes[8].getAttribute("src"));
                    document.querySelector(".ps-product__variants div:nth-of-type(1) img").setAttribute("src",$vistaElementosImagenes[8].getAttribute("src"));
                    document.querySelector(".ps-product__variants div:nth-of-type(2) img").setAttribute("src",$vistaElementosImagenes[8].getAttribute("src"));
                    document.querySelector(".ps-wrapper div div:nth-of-type(2) a img").setAttribute("src",$vistaElementosImagenes[8].getAttribute("src"));
                    document.querySelector(".ps-product__variants div:nth-of-type(1) img").setAttribute("src",$vistaElementosImagenes[8].getAttribute("src"));
                    document.querySelector(".ps-product__variants div:nth-of-type(2) img").setAttribute("src",$vistaElementosImagenes[8].getAttribute("src"));
    
                }
                
                document.querySelector("h1").textContent=document.querySelectorAll(`${catego} div:nth-of-type(2) div:nth-of-type(1) a`)[y].textContent;    
                
                document.querySelectorAll("h4 span")[0].textContent=document.querySelectorAll(`${catego} div:nth-of-type(2) div:nth-of-type(1) p span`)[y].textContent;    
                document.querySelectorAll("h4 span")[1].textContent=document.querySelectorAll(`${catego} div:nth-of-type(2) div:nth-of-type(1) p span`)[y].textContent;    
            })
        }
    
    }

function eventosCateDos(catego){
    
    const $vistaElementos=document.querySelectorAll(`${catego} div:nth-of-type(2) div:nth-of-type(2) a`);
    console.log($vistaElementos);
    const $galeria=document.querySelector(`.ps-wrapper div div:nth-of-type(1) a img`);
    const $vistaElementosImagenes=document.querySelectorAll(`${catego} div a img:nth-of-type(1)`);
    for(let y=0;y<$vistaElementos.length;y++){
        $vistaElementos[y].addEventListener("click",(e)=>{
            
            
            $galeria.setAttribute("src",$vistaElementosImagenes[y-2].getAttribute("src"));
            document.querySelector(".ps-wrapper div div:nth-of-type(2) a img").setAttribute("src",$vistaElementosImagenes[y].getAttribute("src"));
            document.querySelector(".ps-product__variants div:nth-of-type(1) img").setAttribute("src",$vistaElementosImagenes[y].getAttribute("src"));
            document.querySelector(".ps-product__variants div:nth-of-type(2) img").setAttribute("src",$vistaElementosImagenes[y].getAttribute("src"));
            document.querySelector("h1").textContent=document.querySelectorAll(`${catego} div:nth-of-type(2) div:nth-of-type(1) a`)[y].textContent;    
            
            document.querySelectorAll("h4 span")[0].textContent=document.querySelectorAll(`${catego} div:nth-of-type(2) div:nth-of-type(1) p span`)[y].textContent;    
            document.querySelectorAll("h4 span")[1].textContent=document.querySelectorAll(`${catego} div:nth-of-type(2) div:nth-of-type(1) p span`)[y].textContent;    
        })
    }

}
eventosCate(".categoriaMejor");
eventosCateDos(".categoriaRecomendado");
eventosCate(".medicamentoCateExistente");


