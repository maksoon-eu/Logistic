$(function() {

    let nav = $("#nav");
    let navToggle = $("#navToggle");
    let intro = $("#intro");
    let header = $("#header");
    let introH = intro.innerHeight();
    let headerH = header.innerHeight();
    let scrollTop = $(window).scrollTop();

    headerScroll();

    $(window).on('scroll resize', function() {

        headerScroll();

    });

    $(function() {

        navToggle.on('click', function(event) {
            navToggle.toggleClass('burger-active');

            nav.toggleClass('show');
        });

    });

    function headerScroll() {
        introH = intro.innerHeight();
        headerH = header.innerHeight();
        let scrollTop = $(this).scrollTop();

        if ( scrollTop >= ( introH - headerH ) ) {
            header.addClass('header--dark');
        } else {
            header.removeClass('header--dark');
        }
    }

    $('[data-scroll]').on('click', function(event) {
        event.preventDefault()

        let scrollEl = $(this).data('scroll');
        let scrollElPos = $(scrollEl).offset().top;

        $('html, body').animate({
            scrollTop: scrollElPos - headerH
        }, 500)
    });


    let windowH = $(window).height();

    ScrollSpy(scrollTop);

    $(window).on('scroll', function() {
        scrollTop = $(this).scrollTop();

        ScrollSpy(scrollTop);
    });


    function ScrollSpy(scrollTop) {
        $('[data-scrollspy]').each(function() {
            let $this = $(this);
            let sectionId = $this.data('scrollspy');
            let sectionOffset = $this.offset().top;
            sectionOffset = sectionOffset - (windowH / 3);

            if (scrollTop >= sectionOffset) {
                $('nav [data-scroll]').removeClass('active');

                $('nav [data-scroll="' + sectionId + '"]').addClass('active');
            }

            if(scrollTop == 0) {
                $('nav [data-scroll]').removeClass('active');
            }
        });
    }


    $('[data-modal]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).data('modal');

        $('body').addClass('no-scroll');
        $(modal).addClass('show');

        setTimeout(function() {
            $(modal).find('.modal__content').css({
                transform: 'scale(1)',
                opacity: '1'
            });
        });
    });


    $('[data-modal-close]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).parents('.modal');

        modalClose(modal);
    });


    $('.modal').on('click', function(){
        let modal = $(this);

        modalClose(modal);
    })

    $('.modal__content').on('click', function(event){
        event.stopPropagation();
    })

    function modalClose(modal) {

        modal.find('.modal__content').css({
            transform: 'scale(.5)',
            opacity: '0'
        });

        setTimeout(function() {
            $('body').removeClass('no-scroll');
            modal.removeClass('show');
        }, 200);
    }
});