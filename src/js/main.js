$(document).ready(function() {

    ///// Подключение fullpage, фиксация хедера, добавление прозрачности на слайде с картой
        $('#fullpage').fullpage({
            // anchors:['P1','P2','P3','P4']
            menu: '#headerMenu',
            navigation: true,
            afterLoad: function(anchorLink, index){
                var loadedSection = $(this);

                // header_fixed
                if(index !== 1 ){
                    $('.header').addClass('header_fixed')
                }else{
                    $('.header').removeClass('header_fixed')
                }

                // header_map
                if(index == 5){
                    $('.header').addClass('header_map')
                }else{
                    $('.header').removeClass('header_map')
                }
            }
        })
    $('.btn__down').on('click',function(){
        $.fn.fullpage.moveSectionDown();
    })
    $('.arrow-top').on('click',function(){
        $.fn.fullpage.moveTo(1);
    })


    //////////  Подключение owl-carousel при ширине экрана 768рх

    var isCarousel = function(){
        if(window.outerWidth <= 768 ){
            $('.works-container__wrap').addClass('owl-carousel');
            $('.advantages__list').addClass('owl-carousel');
            $(".owl-carousel").owlCarousel({
                loop: true,
                margin:15,
                stagePadding:30,
                items: 1
            });
        } else{
            $(".owl-carousel").owlCarousel(
                {return: false}
            )
        }
        // console.log('click');
        // console.log('window.outerWidth=',window.outerWidth);
    }
    isCarousel();
    window.addEventListener("resize", isCarousel)

    ///// Анимация на hamburger
    var hamburger = $('.hamburger');
    var fixedMenu = $('#fixedMenu');

    hamburger.on('click',function(){
        hamburger.toggleClass('hamburger_active');
        fixedMenu.toggle();
    })


    //// slider
    var slides = document.querySelectorAll('.slider-item');
    var navItems = document.getElementsByClassName('head-nav__circle');
    var current = 0;
    if(slides.length > 1){
        function goToSlide(n){
            slides[current].className = 'slider-item';
            navItems[current].className = 'head-nav__circle';
            current = current + n;
            if (current > 2){
                current = 0
            }
            if (current < 0){
                current = 2
            }
            slides[current].className = 'slider-item slider-item_active';
            navItems[current].className = 'head-nav__circle head-nav__circle_active';
        }
        $('.btn-next').on('click', function(){
            goToSlide(1);
        })
        $('.btn-prev').on('click', function(){
            goToSlide(-1);
        })
        $('.head-nav__circle').on('click', function(){
            var indexActive = $(this).index();
            slides[current].className = 'slider-item';
            navItems[current].className = 'head-nav__circle';
            current = indexActive;
            if (current > 2){
                current = 0
            }
            if (current < 0){
                current = 2
            }
            slides[current].className = 'slider-item slider-item_active';
            navItems[current].className = 'head-nav__circle head-nav__circle_active';
        })
    }

    //// Modal window
    var btn = $('.modalWindowTrigger');
    var modalWindow = $('.modal-window');
    var modalWindowClose = $('.modal-window__close');

    btn.on('click', function(){
        modalWindow.css('display', 'flex');
    })
    modalWindowClose.on('click', function(){
        modalWindow.css('display', 'none');
    })
})

