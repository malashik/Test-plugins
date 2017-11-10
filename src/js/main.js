$(document).ready(function() {
    $('#fullpage').fullpage({
        // anchors:['P1','P2','P3','P4']
        menu: '#fixedMenu'
    })
    $('.btn__down').on('click',function(){
        $.fn.fullpage.moveSectionDown();
    })
    $('.arrow-top').on('click',function(){
        $.fn.fullpage.moveTo(1);
    })

    //// slider    
    const slides = document.querySelectorAll('.slider-item');
    const navItems = document.getElementsByClassName('head-nav__circle');
    let current = 0;
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
            console.log('current=', current)
        })
        $('.btn-prev').on('click', function(){
            goToSlide(-1);
            console.log('current=', current)
        })
        $('.head-nav__circle').on('click', function(){
            let indexActive = $(this).index();
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
})