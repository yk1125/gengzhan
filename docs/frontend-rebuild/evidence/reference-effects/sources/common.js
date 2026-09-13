setTimeout(function () {
    if (document.querySelector('[data-opacity]')) {
        document.querySelector('[data-opacity]').style.opacity = '1'
    }
    if (document.querySelector('[data-scroll-container]')) {
        document.querySelector('body').classList.add('isScroll')
    }
},30)

window.addEventListener('load',function () {
    setTimeout(function () {
        document.querySelector('body').classList.remove('isScroll')
    },40)

    window.addEventListener('resize',function () {
        if (document.querySelector('[data-scroll-container]')) {
            setTimeout(function () {
                locomotive.update()
            },1000)
        }
    })
})

$('.text_effect').each(function (index,ele) {
    var ly = $(ele).data('delay');
    if (ly === undefined) {
        ly = 20;
    }
    var text = $(ele).find('.appoint').text();
    var html = '';
    for(var i=0;i<text.length;i++){
        html += '<div style="display: inline-block;">'+text[i]+'</div>';
    }
    $(ele).find('.appoint').html('<div class="fist">'+html+'</div> <div class="fist">'+html+'</div>');
    $(ele).find('.fist').each(function (i,e) {
        $(e).find('div').each(function (i,e) {
            var delay = i*ly;
            $(e).css({
                'transition': '0.6s cubic-bezier(0.76, 0, 0.24, 1) '+ 0 +'ms'
            })
        })
        $(e).find('div').addClass('unset_delay')
    })
})




$('.down_select').each(function(i,e) {
    $(e).find('.pull div').append('<span></span>')
    if ($(e).is('.active')) {
        $(e).find('.pull').prepend('<div class="on">请选择<span></span></div>')
    }
    $(e).click(function (e) {
        $(this).toggleClass('on').siblings().removeClass('on')
        e.stopPropagation()
    })
    $(e).find('.pull div').click(function (e) {
        var text = $(this).text()
        $(this).addClass('on').siblings().removeClass('on')
        $(this).parents('.down_select').find('.txt').text(text)
        $('.down_select').removeClass('on')
        e.stopPropagation()
    })
    $(e).find('.pull div span').css('background-color',$(e).attr('data-color'))
})

$('body').click(function () {
    $('.down_select').removeClass('on')
})
var about_time;
document.querySelector('#about') ? about_time = 300 : about_time = 0
const countItems = document.querySelectorAll('.count-item');

function onIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const e = entry.target;
            setTimeout(function () {
                animateCount(e);
                about_time = 0
            },about_time)
            // observer.unobserve(e);
        }
    });
}
const observer = new IntersectionObserver(onIntersection);
countItems.forEach(item => observer.observe(item));
function animateCount(e) {
    var demo = { score: 0 },
        scoreDisplay = e,
        to = e.getAttribute('data-to'),
        speed = e.getAttribute('data-speed') * 1,
        separator = e.getAttribute('data-separator'),
        to_fixed = e.getAttribute('data-fixed');

    if (to !== null) {
        if (to.indexOf('.') !== -1) {
            var automatic = (to.length -1)-to.indexOf('.')
        }
    }
    if (speed === 0) {
        speed = 1;
    }
    TweenLite.to(demo, speed, {
        score: to,
        onUpdate: showScore
    });
    function showScore() {
        if (separator !== null) {
            scoreDisplay.innerHTML = formatNumberWithCommasAndDecimal(demo.score, to_fixed, separator);
        }else if (to_fixed !== null) {
            scoreDisplay.innerHTML = demo.score.toFixed(automatic);
        }else {
            scoreDisplay.innerHTML = demo.score.toFixed(0);
        }

    }
}
function formatNumberWithCommasAndDecimal(number, decimalPlaces,separator) {
    var formattedNumber = number.toFixed(decimalPlaces);
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return formattedNumber;
}


$('video:not(video[muted])').trigger('pause')

function video_alert(e) {
    var alert = $('.alert_video')
    var video = $('.alert_video .joke .video video')
    var controls = $(e).find('video').attr('controls')
    var loop = $(e).find('video').attr('loop')
    $(video).attr('controls',controls)
    $(video).attr('loop',loop)
    $(alert).addClass('video_active')
    $(video).attr('src',$(e).find('video').attr('src'))
    $(video).trigger('play');
    if ($(e).is('.all')) {
        $(alert).addClass('all')
    }else {
        $(alert).removeClass('all')
    }
}

function video_close() {
    $('.alert_video').removeClass('video_active')
    $('.alert_video .joke .video video').trigger('pause');
    $('.alert_video .joke .item').removeClass('item_active')
}

$(document).on('click','.alert_video .joke .close',function () {
    video_close()
})

$(document).on('click','.alert_video .mask',function () {
    video_close()
})

var video_html = '';
video_html+= `<div class="alert_video">
    <div class="joke">
        <div class="video">
            <video src=""></video>
        </div>
        <div class="close">
            <svg t="1676432369827" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2743" width="64" height="64">
                <path d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                      p-id="2744"></path>
            </svg>
        </div>
    </div>
    <div class="mask"></div>
</div>`

if ($('*[onclick*="video_alert(this)"] video').length > 0) {
    $('body').append(video_html)
}


function GetRequest() {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function link_scroll() {
    var anchor = GetRequest().scrollTop;
    if(anchor!==''){
        var ele = document.querySelector('#'+anchor);
        if(ele){
            window.addEventListener('load',function () {
                var offsetTop = ele.offsetTop
                if (clientWidth > all_mobile) {
                    setTimeout(function () {
                        locomotive.scrollTo(offsetTop - 100);
                    },10)
                }else {
                    $('html').animate({
                        scrollTop: offsetTop
                    },1000)
                }
            })
        }
    }
}

link_scroll()

document.querySelectorAll('[data-wheel]').forEach(function(element) {
    element.addEventListener('wheel', function(e) {
        e.stopPropagation();
    });
});



function on(t,s) {
    $(t).addClass('on').siblings().removeClass('on')
    $(s).removeClass('on').eq($(t).index()).addClass('on')
}

function log(t) {
    console.log(t)
}


