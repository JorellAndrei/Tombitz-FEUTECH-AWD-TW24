$(document).ready(function() {

    /* Manual Slider 1 */

    $(".slider-num-1 span").on("click", function() {
        $(this).addClass("active").siblings().removeClass("active");
        $(".Slider-screen").animate({
            marginLeft: $(this).index() * (-$(".container").width())
        }, 1000)
    })


    /* Manual Slider 2 */

    $(".indecators span").on("click", function() {

        $(this).addClass("active").siblings().removeClass("active");
        $(".Our-Testimonial ul").animate({
                marginLeft: $(this).index() * (-$(".container").width())
            },
            1000)
    })


    /*  nav-bar */

    $(".fa-bars").on("click", function() {
        $(".nav-bar").slideToggle();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    })

    $(window).on("scroll", function() {

        if ($("body").scrollTop() > $(".header").height()) {
            $(".header .navigator").css({
                backgroundColor: "#585b60"
            })
        } else {
            $(".header .navigator").css({
                backgroundColor: "#ff3366"
            })
        }
    })


    /*  Go Tob */
    $(window).on("scroll", function() {
        if ($("body").scrollTop() > 2500) {
            $(".scroll-Top i").fadeIn();
        } else {
            $(".scroll-Top i").fadeOut();
        }
    })


    $(".scroll-Top i").on("click", function() {
        $("body,html").animate({
            scrollTop: 0
        }, 2000)
    })


    $(".video-overlay").on("click", function() {

        $(this).fadeOut(1000);
        /*
        $("#bgvid").play();
        */

    })
})