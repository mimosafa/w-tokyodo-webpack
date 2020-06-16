/**
 * ====================================================================================================
 * Common Scripts
 * ====================================================================================================
 */



/* ---------------------------------------------------------------
 * Variable
 * ------------------------------------------------------------ */

var _myUA;
var _myMedia;
var _winW = $(window).width();
var _winH = $(window).height();
var _scrollY = $(window).scrollTop();
var _sliderArr = [];
var _fancyScrollPos;
//var _beforeWinW = _winW;



/* ---------------------------------------------------------------
 * User Agent
 * ------------------------------------------------------------ */

_myUA = (function(u, v){
    return {
      tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
          || u.indexOf("ipad") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
          || u.indexOf("kindle") != -1
          || u.indexOf("silk") != -1
          || u.indexOf("playbook") != -1,
      mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
          || u.indexOf("iphone") != -1
          || u.indexOf("ipod") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
          || u.indexOf("blackberry") != -1,
    }
})(window.navigator.userAgent.toLowerCase(), window.navigator.appVersion.toLowerCase());



/* ---------------------------------------------------------------
 * Media
 * ------------------------------------------------------------ */

if(_winW <= 896 && _myMedia !== "sp") {
    _myMedia = "sp";
} else if(_winW > 896 && _myMedia !== "pc") {
    _myMedia = "pc";
}



/* ---------------------------------------------------------------
 * Veiwport
 * ------------------------------------------------------------ */

function updateMetaViewport(){
     if(_myUA.mobile) {
        viewportContent = "width=device-width, initial-scale=1.0, user-scalable=yes";
    } else {
        viewportContent = "width=1080";
    }

    document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
}

window.addEventListener("resize", updateMetaViewport, false);
window.addEventListener("orientationchange", updateMetaViewport, false);
var ev = document.createEvent("UIEvent");
ev.initEvent("resize", true, true)
window.dispatchEvent(ev);



/* ---------------------------------------------------------------
 * Event Handler
 * ------------------------------------------------------------ */

/* -- DOM Load Event -- */
$(document).ready(function() {

});


/* -- Window Scroll Event -- */
$(window).on("scroll", function() {
    _scrollY = $(this).scrollTop();
});


/* -- Window Resize Event -- */
var resizeTimer = false;

$(window).on("resize", function() {
    _winW = $(window).width();
    _winH = $(window).height();

    if(resizeTimer !== false) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function() {
        if(_winW <= 896 && _myMedia !== "sp") {
            _myMedia = "sp";
            init();
        } else if(_winW > 896 && _myMedia !== "pc") {
            _myMedia = "pc";
            init();
        }

        setResizeImg(".resize_img");

        /* _beforeWinW = _winW; */
    }, 200);
});


/* -- Window Load Event -- */
$(window).on("load", function() {
    _winW = $(window).width();
    _winH = $(window).height();
    _scrollY = $(window).scrollTop();

    init();
    setHeader();
    setFooter();
    setPageScroll();
    setTabs();
    setAccordion();
    setMap();
    setBgImg(".bg_img");
    setBrandMv();
    setResizeImg(".resize_img");

    /* Bxslider */
    if($(".bxslider").length !== 0) {
        var sliderLen = $(".bxslider").length;

        for(var i = 0; i < sliderLen; i++) {
            _sliderArr[i] = $(".bxslider").eq(i).bxSlider({
                mode: "fade",
                auto: true,
                speed: 1500,
                pager: false,
                controls: false,
                touchEnabled: false,
                onSliderLoad: function(currentIndex) {
                    if($(".bxslider").eq(i).hasClass("brand_bxslider")) {
                        $(".bxslider").eq(i).find("li").eq(currentIndex).addClass("active");
                    }
                },
                onSlideBefore: function($slideElement, oldIndex, newIndex) {
                    if($($slideElement).parent("ul").hasClass("brand_bxslider")) {
                        $($slideElement).addClass("active");
                    }
                },
                onSlideAfter: function($slideElement, oldIndex, newIndex) {
                    if($($slideElement).parent("ul").hasClass("brand_bxslider")) {
                        $($slideElement).parent("ul").find("li").eq(oldIndex).removeClass("active");
                    }
                }
            });

            if($(".bxslider").eq(i).find("li").length <= 1 || $("body").hasClass("top_page")) {
                _sliderArr[i].stopAuto();
            }
        }
    }

    /* Fancybox */
    if($(".fancybox").length !== 0) {
        $(".fancybox_img").fancybox({
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });

        $(".fancybox_inline").fancybox({
            maxWidth: 1000,
            maxHeight: 600,
            fitToView: true,
            width: "90%",
            height: "90%",
            autoSize: true,
            helpers: {
                overlay: {
                    locked: false
                }
            },
            beforeShow: function() {
                setResizeImg(".cnt_modalbox .resize_img");
            }
        });
    }

    $("#loader").fadeOut(350);
})



/* ---------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------ */

/* -- Initialize -- */
function init() {
    if(_myMedia === "pc") {
        $(".header_gnav_other, .header_lnav_menu").show();
    } else if(_myMedia === "sp") {
        $(".header_gnav_other, .header_lnav_menu").hide();
    }

    $(".header_gnav_brand, .header_gnav_menu").hide();
    $(".header_gnav_btn a").removeClass("active");
    $(".header_lnav_btn a").removeClass("active");
    $(".header_overlay").hide();

    $("#contents").css("padding-top", $(".header_inner").height() + $(".header_lnav").height() + "px");
}


/* -- Set Header -- */
function setHeader() {
    $(".header_gnav_btn a").on("click", function() {
        if(_myMedia === "pc") {
            $(".header_gnav_brand").slideToggle(350);
            $(".header_gnav_menu").slideToggle(350);
        } else if(_myMedia === "sp") {
            if($(".header_lnav_btn a").hasClass("active")) {
                $(".header_lnav_btn a").removeClass("active");
                $(".header_lnav_menu").hide();
                $(".header_overlay").hide();
            }

            $(".header_gnav_brand").slideToggle(350);
            $(".header_gnav_menu").slideToggle(350);
            $(".header_gnav_other").slideToggle(350);
        }

        $(".header_overlay").fadeToggle(350);
        $(this).toggleClass("active");

        return false;
    });

    $(".header_lnav_btn a").on("click", function() {
        if($(".header_gnav_btn a").hasClass("active")) {
            $(".header_gnav_btn a").removeClass("active");
            $(".header_gnav_brand, .header_gnav_menu, .header_gnav_other").hide();
            $(".header_overlay").hide();
        }

        if(_myMedia === "sp") {
            $(".header_lnav_menu").slideToggle(350);
        }

        $(".header_overlay").fadeToggle(350);
        $(this).toggleClass("active");

        return false;
    });
}


/* -- Set Footer -- */
function setFooter() {
    $(".footer_pagetop a").on("click", function() {
        $("body, html").animate({scrollTop: 0}, 500);

        return false;
    });

    scrollFooter();

    $(window).on("scroll", function() {
        scrollFooter();
    });
}

function scrollFooter() {
    if(_scrollY > 200) {
        $(".footer_pagetop").fadeIn();
    } else {
        $(".footer_pagetop").fadeOut();
    }
}


/* -- Set Page Scroll -- */
function setPageScroll() {
    var urlHash = location.hash;
    if(urlHash) {
        $("body,html").stop().scrollTop(0);
        setTimeout(function(){
            var target = $(urlHash);
            var position = target.offset().top - $("#header").height() - $(".header_lnav").height();
            $("body,html").stop().animate({scrollTop:position}, 350);
        }, 100);
    }

    $("a[href^='#']").not(".fancybox").on("click", function() {
        $(".header_gnav_btn a").removeClass("active");
        $(".header_gnav_brand").stop().slideUp(350);
        $(".header_gnav_menu").stop().slideUp(350);
        $(".header_overlay").fadeOut(350);

        if(_myMedia === "sp") {
            $(".header_lnav_btn a").removeClass("active");
            $(".header_lnav_menu").stop().slideUp(350);
        }

        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - $("#header").height() - $(".header_lnav").height();
        $("body,html").stop().animate({scrollTop:position}, 350);

        return false;
    });
}


/* -- Set Tabs -- */
function setTabs() {
    if($(".cnt_tabs").length !== 0) {
        $(".cnt_tabs_menu li").on("click", function() {
            $(".cnt_tabs_menu > li, .cnt_tabs_inner > li").removeClass("active");
            var tabIndex = $(this).index();
            $(".cnt_tabs_menu > li").eq(tabIndex).addClass("active");
            $(".cnt_tabs_inner > li").eq(tabIndex).addClass("active");
            setResizeImg(".cnt_tabs_inner > li.active .resize_img");
        });
    }
}


/* -- Set Accordion -- */
function setAccordion() {
    if($(".cnt_accordion").length !== 0) {
        $(".cnt_accordion > ul > li > a").on("click", function() {
            $(this).toggleClass("active");
            $(this).next("ul").stop().slideToggle(350);

            return false;
        });
    }
}


/* -- Set Map -- */
function setMap() {
    if($(".cnt_map").length !== 0) {
        $(".cnt_map > ul > li a").on("click", function() {
            var href= $(this).attr("href");
            var target = $(href === "#" || href === "" ? 'html' : href);

            if(!$(this).hasClass("active") || !target.offset()) { return false; }

            $(".cnt_accordion > ul > li > a").removeClass("active");
            $(".cnt_accordion > ul > li > a").next("ul").hide();
            $(".cnt_tabs_menu > li, .cnt_tabs_inner > li").removeClass("active");

            var mapParentClass;
            var mapClass;
            mapClass = $(this).parent().parent().attr("class");
            if($(this).parent().parent().parent().parent().hasClass("cnt_map")) {
                mapParentClass = $(this).parent().parent().attr("class");
            } else if($(this).parent().parent().parent().parent().parent().parent().hasClass("cnt_map")) {
                mapParentClass = $(this).parent().parent().parent().parent().attr("class");
            } else {
                mapParentClass = $(this).parent().parent().parent().parent().parent().parent().attr("class");
            }
            $(".cnt_tabs_menu").find("." + mapParentClass).addClass("active");
            $(".cnt_tabs_inner").find("." + mapParentClass).addClass("active");
            setResizeImg(".cnt_tabs_inner > li.active .resize_img");

            var speed = 500;
            if(target.offset()) {
                var position = target.offset().top - ($(".header_gnav").outerHeight() + $(".header_lnav").outerHeight());
                $("body,html").animate({scrollTop:position}, speed, function() {
                    $(".cnt_tabs_inner").find("." + mapParentClass).find(".cnt_accordion #" + mapClass).parent("a").addClass("active");
                    $(".cnt_tabs_inner").find("." + mapParentClass).find(".cnt_accordion #" + mapClass).parent().next("ul").stop().slideDown(350);
                });
            }

            return false;
        });

        setMapJump();
    }
}

function setMapJump() {
    /*
    var maxLen = $(".cnt_map > ul li a.active").length;
    var randomNum = Math.floor(Math.random() * (maxLen - 1) + 1);
    console.log();

    $(".cnt_map > ul li span > a").eq(randomNum).addClass("jump");

    setTimeout(setMapJump, 1000);
    */
}


/* -- Set Brand Main Visual -- */
function setBrandMv() {
    if($(".brand_mv").length !== 0) {
        $(".brand_mv .brand_mv_ttl").delay(0).animate({"top": 0, "opacity": 1}, 500, "easeOutCubic");
        $(".brand_mv .brand_mv_txt").delay(250).animate({"top": 0, "opacity": 1}, 500, "easeOutCubic");
        $(".brand_mv .cnt_btn").delay(500).animate({"top": 0, "opacity": 1}, 500, "easeOutCubic");
    }
}


/* -- Set Background Image -- */
function setBgImg(el) {
    if($(el).length !== 0) {
        $(el).each(function() {
            var els = $(this).find("li");
            $(els).each(function() {
                var src = $(this).find("img").attr("src");
                $(this).css("background-image", "url(" + src + ")");
            });
        });
    }
}


/* -- Set RePosition Image -- */
function setResizeImg(el) {
    if($(el).length !== 0) {
        $(el).each(function() {
            $(this).find("img").css({width: 100 + "%", height: "auto"});

            var border = parseInt($(this).css("border-top-width"));
            var w = $(this).outerWidth() - border * 2;
            var h = $(this).outerHeight() - border * 2;
            var imgW = $(this).find("img").width();
            var imgH = $(this).find("img").height();

            var ratio = imgH / imgW;

            var reImgW = w;
            var reImgH = w * ratio;

            if (h >= reImgH) {
                reImgH = h;
                reImgW = reImgH / ratio;
            }

            $(this).find("img").width(reImgW).height(reImgH).css({left: ((w - reImgW) / 2), top: ((h - reImgH) / 2)});
        });
    }
}
