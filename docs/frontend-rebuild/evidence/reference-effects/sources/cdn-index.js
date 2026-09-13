// scrollbar.addListener((status) => {
//     window.pageYOffset = scrollbar.scrollTop;
//     index(window.pageYOffset)
// });
// if (clientWidth < all_mobile) {
//     setTimeout(function () {
//         $('.each_animate').addClass('on')
//     }, 10)
//     window.addEventListener('scroll', function () {
//         var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
//         if (clientWidth < all_mobile) {
//             $('.index3 .wrap .sj_content li').each(function (i, e) {
//                 var h = $(e).height()
//                 var start = (i * h) + $('.index3 .wrap .sj_content ul').position().top
//                 var value = 1 + (scrollTop - start) / 700 * -0.08
//                 if (scrollTop >= start) {
//                     $(e).css('transform', `scale(${value})`)
//                 }else if (scrollTop <= start) {
//                     $(e).css('transform', 'scale(1)')
//                 }
//             })
//         }
//     })
// }
//
// function index(scrollTop) {
//     var banner_parallax = document.querySelector('.banner .parallax')
//     if (scrollTop > 0) {
//         var speed = scrollTop * 0.9
//         banner_parallax.style.transform = 'translate3d(0px,' + speed + 'px,0px)'
//     } else {
//         banner_parallax.style.transform = 'translate3d(0px,0px,0px)'
//     }
//
//
//     var flex1 = $('.index2').position().top - (clientHeight / 3)
//     if (scrollTop >= flex1) {
//         var flex1_speed = (scrollTop - flex1) * -0.02
//         var flex1_speed2 = (scrollTop - flex1) * +0.1
//         $('.index2 .wrap .fist:first-child .flex:first-child').css('transform', 'translate3d(0px,' + flex1_speed + 'px,0px)')
//         $('.index2 .wrap .fist:first-child .flex:nth-child(2)').css('transform', 'translate3d(0px,' + flex1_speed2 + 'px,0px)')
//     }
//
//     var flex2 = $('.index2').position().top + $('.index2 .wrap .fist:first-child').height()
//     if (scrollTop >= flex2) {
//         var flex2_speed = (scrollTop - flex2) * -0.02
//         var flex2_speed2 = (scrollTop - flex2) * +0.1
//         $('.index2 .wrap .fist:last-child .flex:first-child').css('transform', 'translate3d(0px,' + flex2_speed + 'px,0px)')
//         $('.index2 .wrap .fist:last-child .flex:nth-child(2)').css('transform', 'translate3d(0px,' + flex2_speed2 + 'px,0px)')
//     }
//
//
//     var index4_h = clientHeight + 7000
//     $('.index4').css('height', index4_h + 'px')
//     var index4_start = $('.index4').position().top
//     var v = (scrollTop - index4_start) / 5000 * -8
//     var px = $('.index4 .bg').height() - clientHeight
//     var y = (scrollTop - index4_start) / (index4_h - clientHeight) * -px
//     if (scrollTop >= index4_start) {
//         $('.index4 .mask').css('animation-delay', v + 's')
//         $('.index4 .bg').css('transform', 'translateY(' + y + 'px)')
//     } else if (scrollTop <= index4_start) {
//         $('.index4 .mask').css('animation-delay', '0')
//         $('.index4 .bg').css('transform', 'translateY(0px)')
//     }
//     if (scrollTop >= $('.index4').next().position().top - clientHeight) {
//         $('.index4 .mask').css('animation-delay', '-8s')
//         $('.index4 .bg').css('transform', 'translateY(' + (-px) + 'px)')
//     }
//
//
//     // hide
//     if (scrollTop >= clientHeight) {
//         $('.banner .parallax').hide()
//     } else {
//         $('.banner .parallax').show()
//     }
//
// }
//
//
// $(document).on('click', '.index3 .wrap .content .item', function () {
//     let old = $('.index3 .wrap .content .item.on').index()
//     var index = $(this).index()
//     on(this)
//     var h = document.querySelector('.index3 .wrap .content .item').clientHeight
//     $('.index3 .wrap .content .move').css({
//         'transform': 'translateY(' + index * h + 'px)'
//     })
//     if (old != index) {
//         $('.picture .animate_video video').removeClass('on').trigger('pause')
//         $('.picture .animate_video .' + (old + 1) + '_' + (index + 1))[0].currentTime = 0
//         $('.picture .animate_video .' + (old + 1) + '_' + (index + 1)).addClass('on').trigger('play')
//     }
// })
//
// $('.index3 .wrap .content .item').find('.attr').each(function (i, e) {
//     var attr = $(e).find('p').html()
//     $(e).attr('data-text', attr)
// })
//
//
// // 手机端banner图
// var html = `<img src="http://cdn.seniorart.cn/images/20240530/b6db0c8e82726fd3626348a261390156.webp" class="back sj_back" style="display: none" alt="">`
//
// if (document.documentElement.clientWidth < 1024) {
//     $('.banner .swiper_banner video').remove()
//     $('.banner .swiper_banner .swiper-slide:first-child').append(html)
// }
