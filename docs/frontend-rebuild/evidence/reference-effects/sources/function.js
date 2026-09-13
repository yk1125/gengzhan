let locomotive, scrollbar,scrollTop, all_mobile = 1024, clientWidth = document.documentElement.clientWidth,
    clientHeight = document.documentElement.clientHeight, controls = true;
var thatIndex = 0;

var damp = 0.25
if (clientWidth > all_mobile) {
    damp = 0.08
}
var all_num = 0;
if (clientWidth > 1024) {
    all_num = 150
}
var AOS = {
    init: function(e) {
        var allAos = document.querySelectorAll('*[aos]')
        for (let i = 0; i < allAos.length; i++) {
            document.body.clientWidth > 100 ? perform() : execution()
            function perform() {
                allAos[i].classList.add('aos-init')
                var offset = allAos[i].getBoundingClientRect().top - document.documentElement.clientHeight + all_num
                if (offset < 0) {
                    allAos[i].classList.add('aos-animate')
                } else if (e.once !== true){
                    allAos[i].classList.remove('aos-animate')
                }
            }
            function execution() {
                allAos[i].removeAttribute('aos')
                allAos[i].removeAttribute('aos-delay')
            }
        }
    }
}

$(document).on('mouseenter','.header .r .outdated svg',function () {
    $('.header .r .outdated').addClass('on')
})
$(document).on('mouseleave','.header .r .outdated',function () {
    $('.header .r .outdated').removeClass('on')
})

var case_swiper;
function UpdateSwiper() {
    var interleaveOffset = 0.5;
    case_swiper = new Swiper('.case_swiper', {
        speed: 700,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        direction: 'vertical',
        on: {
            progress: function(swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.height * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform = "translate3d(0px, " + innerTranslate + "px, 0)";
                }
            },
            touchStart: function(swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function(swiper, speed) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition = speed + "ms";
                }
            }
        }
    })
    var design4_delay = 0
    var design4 = new Swiper('.design4 .content .swiper', {
        speed: 1000,
        allowTouchMove: false,
        effect: 'fade',
        navigation: {
            nextEl: '.design4 .wrap .content .matter .button .bor:nth-child(2)',
            prevEl: '.design4 .wrap .content .matter .button .bor:nth-child(1)',
        },
        on: {
            init () {
                var index = this.activeIndex
                var l = this.slides.length - 1
                console.log(l)
                var schedule = (100/l)*(l-1) - (100 / l) * index
                $('.design4 .wrap .content .cut .joke .line .before').css('clip-path','inset(0 '+ (schedule) +'% 0 0)')
                console.log(11)
            },
            slideNextTransitionStart: function(swiper){
                design4_delay = 0
            },
            slidePrevTransitionStart: function(swiper){
                design4_delay = 0
            },
            slideChange() {
                var index = this.activeIndex
                var l = this.slides.length - 1
                var schedule = 100 - (100 / l) * index
                var schedule2 =  (100/l)*(l-1) - (100 / l) * index
                setTimeout(function () {
                    $('.design4 .wrap .content .cut .joke .line .before').css('clip-path','inset(0 '+ (schedule2) +'% 0 0)')
                    setTimeout(function () {
                        $('.design4 .wrap .content .cut .joke .line .after').css('clip-path','inset(0 '+ (schedule) +'% 0 0)')
                        if (index!==l) {
                            $('.design4 .wrap .content .cut .joke .item').removeClass('on').eq((index+1)).prevAll().addClass('on')
                        }else {
                            $('.design4 .wrap .content .cut .joke .item').eq(l).addClass('on')
                        }
                    },design4_delay)
                },10)
            },
        },
        breakpoints: {
            100: {
                autoHeight: true
            },
            1025: {
                autoHeight: false
            },
        }
    })

    new Swiper('.pro_mk7 .content4 .swiper', {
        speed: 1000,
        slidesPerView: 'auto',
        spaceBetween: 60,
        freeMode: true,
    })

    pro_mk10 = new Swiper('.pro_mk10 .move .swiper', {
        speed: 1000,
        spaceBetween: 80,
        slidesPerView: 2,
        centeredSlides: true,
        on: {
            slideChange() {
                $('.pro_mk10 .wrap .height .cut .list').removeClass('on').eq(this.activeIndex).addClass('on')
            }
        }
    })

    new Swiper('.pro_apl9 .swiper', {
        speed: 1000,
        slidesPerView: 'auto',
        spaceBetween: 60,
        freeMode: true,
    })

    new Swiper('.pro_apl14 .swiper', {
        loop: true,
        slidesPerView : 1,
        speed: 20000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
    })


    new Swiper('.pro_lw9 .swiper', {
        loop: true,
        slidesPerView : 'auto',
        spaceBetween: 40,
        speed: 7000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
    })

    new Swiper('.go_horse_lamp .swiper', {
        loop: true,
        slidesPerView : 'auto',
        spaceBetween: 40,
        speed: 30000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
    })

    new Swiper('.case1 .wrap .insert .swiper', {
        loop: true,
        slidesPerView : 'auto',
        speed: 20000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
    })

    new Swiper('.pro_zj9 .wrap .content .swiper', {
        speed: 1000,
        slidesPerView: 'auto',
        spaceBetween: 44,
        freeMode: true,
    })

    new Swiper ('.pro_pdg13 .wrap .content .swiper', {
        loop: true,
        slidesPerView : 3,
        spaceBetween: 56,
        speed: 6000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        breakpoints: {
            100:{
                slidesPerView : 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView : 3,
                spaceBetween: 56,
            },
        }
    });

    new Swiper('.pro_zz2 .position_swiper .swiper', {
        loop: true,
        slidesPerView: 'auto',
        speed: 12000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
    })

    new Swiper('.pro_zz12 .swiper', {
        loop: true,
        slidesPerView : 'auto',
        spaceBetween: 40,
        speed: 20000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
    })

    new Swiper('.index5 .wrap .content.sj_content .scroll_x', {
        speed: 1000,
        spaceBetween:20,
        slidesPerView: 2,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    })
}

UpdateSwiper()

var pro_mk10;
// 全局更新
function getUpdate() {
    if (document.querySelector('.apl_content')) {
        var apl_content = $('.apl_content img')
        var apl = apl_content.offset().top - ((clientHeight - apl_content.height())/2)

        $('.apl_content').css('height',apl_content.height() + ((apl_content.height()*1.4 - apl_content.height())/2) + 'px')

        window.addEventListener('resize',function () {
            if (document.querySelector('.apl_content')) {
                var apl_content = $('.apl_content img')
                // console.log(apl_content.height())
                var apl = apl_content.offset().top - ((clientHeight - apl_content.height())/2)
                $('.apl_content').css('height',apl_content.height() + ((apl_content.height()*1.4 - apl_content.height())/2) + 'px')
            }
        })
    }


    var timer;
    var val = true;
    var st_arr = [];
    var xy_arr = [];
    var ht_arr = [];
    var apl_arr = [];
    var nk_arr = []
    let spList=[];
    if (document.querySelector('#caseInfo_mk')) {
        var mk_dis = clientHeight / 2
        var mk_len = $('.pro_mk10 .wrap .height .move .swiper-slide').length
        var mk5_len = $('.pro_mk5 .wrap .content3 .grid .item').length
        $('.pro_mk10 .wrap .height').css('height',clientHeight + (mk_dis * mk_len) + 'px')
        $('.pro_mk5 .wrap .content3').css('height',clientHeight + (mk_dis * mk5_len) + 'px')

        $(function () {
            st_arr = [];
            $('.sticky').each(function (i,e) {
                var data_top = $(e).attr('data-top')
                data_top ? data_top = data_top*1 : data_top = 0
                var top = $(e).offset().top - data_top
                st_arr.push(top)
            })
        })
    }

    if (document.querySelector('#caseInfo_xy')) {
        var radius = 35;
        var lineWidth = 2
        var entities = [];

        var defaultStyle = {
            size:24,
            leading: 24,
            family:'PingFang SC, Microsoft YaHei, sans-serif',
            alignment: "center",
            baseline: "baseline",
            margin: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            padding:{
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }

        var list = [
            {
                value:'视觉体验低',
                styles:{
                    fill:'#ffffff'
                },
                rectStyle:{
                    fill:'transparent',
                    stroke:'#ffffff',
                }
            },
            {
                value:'用户体验不佳',
                styles: {
                    fill:'#ffffff'
                },
                rectStyle:{
                    fill:'#CB0022',
                    stroke:'#CB0022',
                }
            },
            {
                value:'跨平台设备体验差',
                styles:{
                    fill:'#333333'
                },
                rectStyle:{
                    fill:'#ffffff',
                    stroke:'#ffffff',
                }
            },
            {
                value:'动效与交互体验差',
                styles:{
                    fill:'#333333'
                },
                rectStyle:{
                    fill:'#ffffff',
                    stroke:'#ffffff',
                }
            },
            {
                value:'信息模块杂乱无章',
                styles: {
                    fill:'#ffffff'
                },
                rectStyle:{
                    fill:'#CB0022',
                    stroke:'#CB0022',
                }
            },
            {
                value:'页面设计老旧',
                styles:{
                    fill:'#ffffff'
                },
                rectStyle:{
                    fill:'transparent',
                    stroke:'#ffffff',
                }
            },
            {
                value:'信息传递能力弱',
                styles:{
                    fill:'#333333'
                },
                rectStyle:{
                    fill:'#ffffff',
                    stroke:'#ffffff',
                }
            },
            {
                value:'品牌识别性低',
                styles:{
                    fill:'#ffffff'
                },
                rectStyle:{
                    fill:'transparent',
                    stroke:'#ffffff',
                }
            },
            {
                value:'版面设计廉价感',
                styles:{
                    fill:'#ffffff'
                },
                rectStyle:{
                    fill:'transparent',
                    stroke:'#ffffff',
                }
            },
            {
                value:'色彩与品牌不符',
                styles: {
                    fill:'#ffffff'
                },
                rectStyle:{
                    fill:'#CB0022',
                    stroke:'#CB0022',
                }
            },
        ];

        var img1 = document.createElement('img')
        img1.src='static/images/bq1.png'
        var img2 = document.createElement('img')
        img2.src='static/images/bq1.png'
        var circle = [
            new Two.Texture(img1),
            new Two.Texture(img2)
        ];


        var two = new Two({
            type: Two.Types.canvas,
            fullscreen: false,
            fitted:true,
            autostart: false
        });
        two.appendTo(document.querySelector('.pro_xy2 .canvas'))


        var solver = Matter.Engine.create();
        solver.world.gravity.y = 1;

        Matter.World.add(solver.world, [
            Matter.Bodies.rectangle(window.innerWidth/2,window.innerHeight*1.5, window.innerWidth*3, window.innerHeight, { isStatic: true }),
            Matter.Bodies.rectangle(-window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight, { isStatic: true }),
            Matter.Bodies.rectangle(window.innerWidth*1.5,window.innerHeight/2,window.innerWidth,window.innerHeight, { isStatic: true }),
            Matter.Bodies.rectangle(window.innerWidth/2,-window.innerHeight*.5,window.innerWidth*3,window.innerHeight, { isStatic: true })
        ])

        var mouse = Matter.Mouse.create(document.querySelector('.pro_xy2 .canvas'));
        var mouseConstraint = Matter.MouseConstraint.create(solver, {
            mouse: mouse,
            constraint: {
                stiffness: 0
            }
        });

        Matter.World.add(solver.world, mouseConstraint);

        var n = {};
        Matter.Events.on(mouseConstraint,'mousemove',function (event){
            if("undefined" != typeof n.x){
                let x = event.mouse.position.x,
                    y = event.mouse.position.y,
                    o = n.x - x,
                    s = n.y - y;
                let bodies = solver.world.bodies
                let current = Matter.Query.point(bodies,{
                    x:x,
                    y:y
                })[0];
                current &&  Matter.Body.applyForce(current,{
                    x:current.position.x,
                    y:current.position.y
                },{
                    x:o * -.02,
                    y:s * -.02
                })
            }
            n = {
                x:event.mouse.position.x,
                y:event.mouse.position.y
            }
            // console.log(event)
        })



        addSlogan()
        addCircle()

        Matter.World.add(solver.world, entities);

        two.bind("update", update);

        function addSlogan(){
            for(let i in list){
                var group = new Two.Group();
                var text = new Two.Text('',0,0,defaultStyle)

                group.isWord = true;

                var word = list[i];
                if(word.value){
                    text.value = word.value;
                    for(let prop in word.styles){
                        text[prop] = word.styles[prop]
                    }
                }else{
                    text.value = word;
                }

                var rect = text.getBoundingClientRect();

                text.translation.y = 8;

                var rectangle = new Two.RoundedRectangle(0, 0, rect.width + defaultStyle.padding.left + defaultStyle.padding.right + radius * 2, 2 * radius - lineWidth , radius - lineWidth);

                rectangle.fill = word.rectStyle ? word.rectStyle.fill : '#ffffff';
                rectangle.stroke = word.rectStyle ? word.rectStyle.stroke : '#ffffff';
                rectangle.linewidth = lineWidth

                var rectBound = rectangle.getBoundingClientRect();

                var x = Math.random() * window.innerWidth;
                var y = 0;

                var partA = Matter.Bodies.circle(x-rectBound.width/2, y+rectBound.height/2, radius),
                    partB = Matter.Bodies.rectangle(x-rectBound.width/2+(rectBound.width - 2*radius)/2, y+rectBound.height/2, rectBound.width-2*radius, 2 * radius),
                    partC = Matter.Bodies.circle(x-rectBound.width/2+ rectBound.width - 2*radius, y+rectBound.height/2, radius);
                var entity =  Matter.Body.create({
                    parts: [partA, partB, partC],
                })
                Matter.Body.setDensity(entity, 0.0015)
                entity.restitution = 0.5
                entity.object = group;
                entities.push(entity);

                group.text = text;
                group.rectangle = rectangle
                group.entity = entity
                group.add(rectangle,text)

                two.add(group);
            }
        }

        function addCircle(){
            var radius = 41;
            for(let i in circle){
                var group = new Two.Group();
                var image = new Two.ImageSequence(circle[i],0,0)

                var cirlceangle = new Two.Circle(0,0,radius)
                cirlceangle.fill = 'transparent';
                cirlceangle.stroke = '#ffffff';
                cirlceangle.linewidth = lineWidth;

                var rectBound = cirlceangle.getBoundingClientRect();
                var x = 0;
                // var y = Math.random() * window.innerHeight;
                var y = 500;

                var part = Matter.Bodies.circle(x-rectBound.width/2, y, rectBound.height/2);
                var entity =  Matter.Body.create({
                    parts: [part],
                })
                Matter.Body.setDensity(entity, 0.0015)
                entity.restitution = 0.5
                entity.object = group
                entities.push(entity)

                group.image = image;
                group.circleangle = cirlceangle;
                group.entity = entity;
                group.add(image,cirlceangle);
                two.add(group)
            }
        }

        function update(frameCount, timeDelta) {
            var allBodies = Matter.Composite.allBodies(solver.world);
            Matter.MouseConstraint.update(mouseConstraint, allBodies);
            Matter.MouseConstraint._triggerEvents(mouseConstraint);

            Matter.Engine.update(solver);
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                entity.object.position.copy(entity.position);
                entity.object.rotation = entity.angle;
            }
        }

        var lw11 = $('.pro_xy6')
        var h11 = parseInt(lw11.attr('data-h'))
        lw11.css('height',clientHeight + (h11*$('.pro_xy6 .wrap .content .left .list').length) + 'px')

        let scrollX, scrollXHeight, Horizontal

        function common_x(x, all, allW) {
            scrollX = x
            Horizontal = all
            var wid = $(allW).width()

            scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
            Horizontal.style.height = scrollXHeight + 'px'

            window.addEventListener('resize', function () {
                scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                Horizontal.style.height = scrollXHeight + 'px'
            });
        }

        common_x(document.querySelector('.pro_xy3 .fix .wrap .wrap_x'), document.documentElement.querySelector('.pro_xy3'), $('.pro_xy3 .fix .wrap'))


        function common_x_scroll(scrollTop, all, start) {
            var x_end = $(all).next().position().top - clientHeight
            if (scrollTop > start && scrollTop < x_end) {
                $(scrollX).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
            } else if (scrollTop <= start) {
                $(scrollX).css('transform', 'translate3d(0px, 0px, 0px)')
            }
            if (scrollTop >= x_end) {
                $(scrollX).css('transform', 'translate3d(-' + (scrollXHeight - clientHeight) + 'px, 0px, 0px)')
            }
        }


        Matter.Mouse.setOffset(mouse,Matter.Vector.create(0,scrollTop))

        common_x_scroll(scrollTop, $('.pro_xy3'), $('.pro_xy3').position().top)

        $(function () {
            xy_arr = [];
            $('.sticky').each(function (i,e) {
                var data_top = $(e).attr('data-top')
                data_top ? data_top = data_top*1 : data_top = 0
                var top = $(e).offset().top - data_top
                xy_arr.push(top)
            })
        })

    }

    if (document.querySelector('#caseInfo_hm')) {
        if($(window).width()>1024){
            $('.delay').each(function(index,item){
                $(item).children().each(function(index,item){
                    $(item).css('transition-delay',($(this).parent().data('interval')*index)+'s')
                })
            })
            // $('.delay').children().each(function(index,item){
            //     $(item).find('.num').attr('data-delay',($(this).parent().data('interval')*index)*1000)
            //     $(item).css('transition-delay',($(this).parent().data('interval')*index)+'s')
            // })
        }

        $('.sp').each(function(index,ele){
            spList.push($(ele).offset().top-$(ele).height());
        })
    }

    if (document.querySelector('#caseInfo_lw')) {
        var lw3 = $('.pro_lw3')
        var h = parseInt(lw3.attr('data-h'))
        lw3.css('height',clientHeight + h + 'px')


        var lw11 = $('.pro_lw11')
        var h11 = parseInt(lw11.attr('data-h'))
        lw11.css('height',clientHeight + (h11*$('.pro_lw11 .wrap .content .left .list').length) + 'px')
    }

    if (document.querySelector('#caseInfo_ht')) {
        $(function () {
            ht_arr = [];
            $('.sticky').each(function (i,e) {
                var data_top = $(e).attr('data-top')
                data_top ? data_top = data_top*1 : data_top = 0
                var top = $(e).offset().top - data_top
                ht_arr.push(top)
            })
        })
    }

    if (document.querySelector('#caseInfo_apl')) {
        let scrollX, scrollXHeight, Horizontal

        function common_x(x, all, allW) {
            scrollX = x
            Horizontal = all
            var wid = $(allW).width()

            scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
            Horizontal.style.height = scrollXHeight + 'px'

            window.addEventListener('resize', function () {
                scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                Horizontal.style.height = scrollXHeight + 'px'
            });
        }

        common_x(document.querySelector('.pro_apl8 .fix .wrap .wrap_x'), document.documentElement.querySelector('.pro_apl8'), $('.pro_apl8 .fix .wrap'))


        function common_x_scroll(scrollTop, all, start) {
            var x_end = $(all).next().position().top - clientHeight
            if (scrollTop > start && scrollTop < x_end) {
                $(scrollX).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
            } else if (scrollTop <= start) {
                $(scrollX).css('transform', 'translate3d(0px, 0px, 0px)')
            }
            if (scrollTop >= x_end) {
                $(scrollX).css('transform', 'translate3d(-' + (scrollXHeight - clientHeight) + 'px, 0px, 0px)')
            }

        }

        common_x_scroll(scrollTop, $('.pro_apl8'), $('.pro_apl8').position().top)

        $(function () {
            apl_arr = [];
            $('.sticky').each(function (i,e) {
                var data_top = $(e).attr('data-top')
                data_top ? data_top = data_top*1 : data_top = 0
                setTimeout(function () {
                    var top = $(e).offset().top - data_top
                    apl_arr.push(top)
                },100)
            })

            // $('.sticky').each(function (i,e) {
            //     var data_top = $(e).attr('data-top')
            //     data_top ? data_top = data_top*1 : data_top = 0
            //     setTimeout(function () {
            //         var offset = $(e)[0].getBoundingClientRect().top - document.documentElement.clientHeight - data_top
            //         apl_arr.push(offset)
            //     },100)
            // })
        })
    }

    if (document.querySelector('#caseInfo_yzzj')) {
        var myChart = echarts.init(document.querySelector('.echarts .joke'));
        var option = {
            color: ['#EF3645', '#FF704C', '#393F50'],
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['26%', '70%'],

                    emphasis: {
                        label: {
                            show: false,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        { value: 60},
                        { value: 25},
                        { value: 15},
                    ]
                }
            ]
        };
        myChart.setOption(option);
        var color = '#FBF9F9';
        var color_hy = '#3d3d3d';
        function draw(waterCircle, A, W, Q, H) {
            const width = waterCircle.width = waterCircle.offsetWidth;
            const height = waterCircle.height = waterCircle.offsetHeight;
            const ctx = waterCircle.getContext('2d');
            let y;
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.fillStyle = color;
            ctx.moveTo(0, A * Math.sin(Q) + H);
            for (let x = 1; x <= width; x++) {
                y = A * Math.sin(W * x + Q) + H;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.fill();
            ctx.closePath();
            Q -= 0.05;
            window.requestAnimationFrame(()=>draw(waterCircle, A, W, Q, H));
        }

        setTimeout(function() {
            const waterCircles = document.querySelectorAll('.water-circle');
            waterCircles.forEach((waterCircle)=>{
                    const A = 50;
                    const W = 0.2 / 60;
                    const H = 50;
                    let Q = 0;
                    draw(waterCircle, A, W, Q, H);
                }
            );
        }, 10)

        $('.pro_zj13 .position_content .flex .img').each(function (i,e) {
            var delay = i * 0.2
            $(e).css('transition-delay',delay + 's')
        })
    }

    if (document.querySelector('#caseInfo_lwgj')) {
        var pro_en2 = $('.pro_en2')
        var h = parseInt(pro_en2.attr('data-h'))
        var h_len = $('.pro_en2 .fix .wrap .content .left .item').length
        pro_en2.css('height',clientHeight + (h*h_len) + 'px')
    }

    if (document.querySelector('#caseInfo_pdg')) {
        var len =  ($('.pro_pdg10 .wrap .content .img').length) * 100
        $('.pro_pdg10').css('height', len + 'vh')


        setTimeout(function () {
            $('.pro_pdg4 .loading .matter1 .cube:first-child').css('animation','3s cube1 infinite ease')
            $('.pro_pdg4 .loading .matter1 .cube:nth-child(2)').css('animation','3s cube2 infinite ease')
            $('.pro_pdg4 .loading .matter1 .cube:nth-child(3)').css('animation','3s cube3 infinite ease')

            setTimeout(function () {
                $('.pro_pdg7 .matter1 .cube:nth-child(2)').addClass('two')
            },2000)
            setTimeout(function () {
                $('.pro_pdg7 .loading .matter1 .cube:nth-child(3)').addClass('left_active')

            },2300)
            setTimeout(function () {
                $('.pro_pdg7 .loading .matter1 .cube:first-child').addClass('er')
                setTimeout(function () {
                    $('.pro_pdg7 .loading .matter1 .cube:nth-child(1)').addClass('fist')
                    setTimeout(function () {
                        $('.pro_pdg7 .loading .cube:nth-child(3)').addClass('right_active')
                        setTimeout(function () {
                            $('.pro_pdg7 .loading .white').addClass('start')
                        },200)
                    },1000)
                },600)
            },2500)
        },10)


        function set_val() {
            $('.pro_pdg7 .right .animate .img img:first-child').addClass('on')
            var i = 0;
            var timer = setInterval(function () {
                i++
                if (i===4) {
                    i = 0
                }
                $('.pro_pdg7 .right .animate .img img').removeClass('on').eq(i).addClass('on')
            },800)
        }

        set_val()

        function set_val2() {
            $('.pro_pdg7.row .right .animate .img img:first-child').addClass('on')
            var i = 0;
            var timer = setInterval(function () {
                i++
                if (i===4) {
                    i = 0
                }
                $('.pro_pdg7.row .right .animate .img img').removeClass('on').eq(i).addClass('on')
            },800)
        }

        set_val2()


    }

    if (document.querySelector('#caseInfo_zz')) {
        var lw3 = $('.pro_lw3')
        var h = parseInt(lw3.attr('data-h'))
        lw3.css('height',clientHeight + h + 'px')
    }

    if (document.querySelector('#caseInfo_bng')) {
        $('.branch p').each(function (index, ele) {
            var $span = $(ele).find('span');
            var text = $(ele).html();

            if ($span.length === 0) {
                var textArray = text.split('');
                var html = '';
                for (var i in textArray) {
                    html += '<div style="display: inline-block;">' + textArray[i] + '</div>';
                }
                $(ele).html(html);
            } else {
                var spanText = $span.html();
                var spanTextArray = spanText.split('');
                var spanHtml = '';
                for (var i in spanTextArray) {
                    spanHtml += '<div style="display: inline-block;">' + spanTextArray[i] + '</div>';
                }
                $span.html(spanHtml);
            }

            $(ele).contents().filter(function() {
                return this.nodeType === 3;
            }).each(function() {
                var text = $(this).text();
                var textArray = text.split('');
                var html = '';
                for (var i in textArray) {
                    html += '<div style="display: inline-block;">' + textArray[i] + '</div>';
                }
                $(this).replaceWith(html);
            });

            $(ele).find('div').each(function (index, ele) {
                let delay = index * 0.08 + 0.3;
                // $(ele).css({
                //     'transition-delay': delay + 's',
                //     'opacity': '0',
                //     'transform': 'translateX(10px)',
                //     'min-width': '10px'
                // });
                if($(ele).text()==' '){
                    $(ele).css({
                        'transition-delay': delay + 's',
                        // 'opacity': '0',
                        'filter': 'blur(20px)',
                        'transform': 'translateX(10px)',
                        'min-width': '10px'
                    });
                }else{
                    $(ele).css({
                        'transition-delay': delay + 's',
                        // 'opacity': '0',
                        'filter': 'blur(20px)',
                        'transform': 'translateX(10px)',
                    });
                }
            });
        });

        let s1=[]
        let zg7_img_l = $('.section_11 .bottom .item').length
        var zg7_h = clientHeight * zg7_img_l
        var zg7_start = $('.section_11 .bottom').position().top - (clientHeight*2/ 10)
        if($(window).width()<=1440){
            zg7_start = $('.section_11 .bottom').position().top- (clientHeight*1.5/ 10)
        }
        var zg7_end = $('.section_11 .bottom').height() - clientHeight - (parseInt($('.section_11 .fix').css('top')))
        $('.section_11 .fixbox').css('height', zg7_h + 'px')

        let s=[]
        var zg8_img_l = $('.section_12 .bottom .item').length
        var zg8_h = clientHeight * zg8_img_l

        $('.section_12').css('height', zg8_h + 'px')

        if($(window).width()<=1024){
            $('.banner .text').addClass('aos-animate')
        }

        $(document).on('click','.banner .down',function(){
            let top = $('.banner').height()
            scrollbar.scrollTo(0, top, 1200);
        })
        $(document).on('mouseenter','.section_2 .warp .img .left',function(){
            $('.section_2 .warp .img').css("transform","perspective(400px) rotate3d(0,1,0, -2deg)")
        })
        $(document).on('mouseenter','.section_2 .warp .img .right',function(){
            $('.section_2 .warp .img').css("transform","perspective(400px) rotate3d(0,1,0, 2deg)")
        })
        $(document).on('mouseleave','.section_2 .warp .img',function(){
            $('.section_2 .warp .img').css("transform","perspective(400px) rotate3d(0,1,0, 0deg)")
        })

        if($(window).width()>1024){
            $(document).on('mouseenter','.section_10 .imgbox .left',function(){
                $('.section_10 .imgbox .tile').css("transform","perspective(400px) rotate3d(0,1,0, -2deg)")
            })
            $(document).on('mouseenter','.section_10 .imgbox .right',function(){
                $('.section_10 .imgbox .tile').css("transform","perspective(400px) rotate3d(0,1,0, 2deg)")
            })
            $(document).on('mouseleave','.section_10 .imgbox',function(){
                $('.section_10 .imgbox .tile').css("transform","perspective(400px) rotate3d(0,1,0, 0deg)")
            })

        }

        function imgmove(scroll){
            let top=$('.section_17').offset().top
            let distance=(scroll-top)/($('.section_17').height()-$('.section_17 .warp').height())
            distance=distance<0?0:distance>1?1:distance
            if(scroll>top){
                $('.section_17 .warp .listbox:nth-child(1) .list').css('transform','translateX('+(distance*-50)+'%)')
                $('.section_17 .warp .listbox:nth-child(2) .list').css('transform','translateX('+(distance*50)+'%)')
            }
        }
        function textmove(scroll){
            let top=$('.section_10').offset().top
            let distance=(scroll-top)/($('.section_10').height()-$('.section_10 .warp').height())
            distance=distance<0?0:distance>1?1:distance
            if(scroll>top){
                $('.section_10 .en:nth-child(1)').css('transform','translateX('+(distance*100)+'%)')
                $('.section_10 .en:nth-child(2)').css('transform','translateX('+(distance*-100)+'%)')
            }
        }

        function caseInfo1(scrollTop){


            if (scrollTop >= zg7_start && scrollTop <= $('.section_11').next().position().top - clientHeight) {
                $('.section_11 .fix').css('transform', 'translateY(' + (scrollTop - zg7_start) + 'px)')
                $('.section_11 .top').css('transform', 'translateY(' + (scrollTop - zg7_start) + 'px)')

            } else if (scrollTop <= zg7_start) {
                $('.section_11 .fix').css('transform', 'translateY(0px)')
                $('.section_11 .top').css('transform', 'translateY(0px)')
            }

            if (scrollTop >= $('.section_11').next().position().top - clientHeight) {
                $('.section_11 .fix').css('transform', 'translateY(' + zg7_end + 'px)')
                $('.section_11 .top').css('transform', 'translateY(' + zg7_end + 'px)')
            }


            // var zg7_start = $('.section_11').position().top + (parseInt($('.section_11 .bottom').css('top')))
            $('.section_11 .bottom .item:first-child').addClass('nb')
            $('.section_11 .bottom .item:nth-child(n+2)').each(function (i, e) {
                let img_start1 = (i * (clientHeight - (parseInt($('.section_11 .bottom').css('top'))))) + zg7_start - (clientHeight / 2)
                var y = 100 + (scrollTop - img_start1) / clientHeight * -100
                if (scrollTop >= img_start1 && scrollTop <= img_start1 + clientHeight - ((i + 1) * 20)) {
                    $(e).css({
                        'transform': 'translateY(' + y + 'vh)',
                    })
                } else if (scrollTop <= img_start1) {
                    $(e).css({
                        'transform': 'translateY(100vh)',
                    })
                }
                var e_ = (i + 1) * 20

                s1[i] = 1 - ((zg7_img_l - 1) - i) * 0.025
                if (scrollTop >= img_start1 + clientHeight - ((i + 1) * 20)) {
                    $(e).addClass('nb')
                    $(e).css({
                        'transform': 'translateY(' + e_ + 'px)',
                    })
                } else {
                    $(e).removeClass('nb')
                }
                $('.section_11 .bottom .item').each(function (index) {
                    let scale = s1[zg7_img_l - $('.section_11 .bottom .item.nb').length + index] == undefined ? 1 : s1[zg7_img_l - $('.section_11 .bottom .item.nb').length + index]
                    $('.section_11 .bottom .item').eq(index).find('img').css({
                        'transform': 'scale(' + scale + ')',
                    })
                })
            })
        }

        function caseInfo(scrollTop){
            var zg8_start = $('.section_12').position().top - (clientHeight*7 / 10)
            if($(window).width()<=1440){
                zg8_start = $('.section_12').position().top - (clientHeight*8 / 10)
            }
            var zg8_end = $('.section_12').height() - clientHeight - (parseInt($('.section_12 .fix').css('top')))

            if (scrollTop >= zg8_start && scrollTop <= $('.section_12').next().position().top - clientHeight) {

                $('.section_12 .fix').css('transform', 'translateY(' + (scrollTop - zg8_start) + 'px)')
                $('.section_11_2').css('transform', 'translateY(' + (scrollTop - zg8_start) + 'px)')

            } else if (scrollTop <= zg8_start) {
                $('.section_12 .fix').css('transform', 'translateY(0px)')
                $('.section_11_2').css('transform', 'translateY(0px)')
            }

            if (scrollTop >= $('.section_12').next().position().top - clientHeight) {
                $('.section_12 .fix').css('transform', 'translateY(' + zg8_end + 'px)')
                $('.section_11_2').css('transform', 'translateY(' + zg8_end + 'px)')
            }

            // var zg8_start = $('.section_12').position().top + (parseInt($('.section_12 .bottom').css('top')))
            $('.section_12 .bottom .item:first-child').addClass('nb')
            $('.section_12 .bottom .item:nth-child(n+2)').each(function (i, e) {
                var img_start = (i * (clientHeight - (parseInt($('.section_12 .bottom').css('top'))))) + zg8_start - (clientHeight / 2)
                var y = 100 + (scrollTop - img_start) / clientHeight * -100
                if (scrollTop >= img_start && scrollTop <= img_start + clientHeight - ((i + 1) * 20)) {
                    $(e).css({
                        'transform': 'translateY(' + y + 'vh)',
                    })
                } else if (scrollTop <= img_start) {
                    $(e).css({
                        'transform': 'translateY(100vh)',
                    })
                }
                var e_ = (i + 1) * 20

                s[i] = 1 - ((zg8_img_l - 1) - i) * 0.025
                if (scrollTop >= img_start + clientHeight - ((i + 1) * 20)) {
                    $(e).addClass('nb')
                    $(e).css({
                        'transform': 'translateY(' + e_ + 'px)',
                    })
                } else {
                    $(e).removeClass('nb')
                }
                $('.section_12 .bottom .item').each(function (index) {
                    let scale = s[zg8_img_l - $('.section_12 .bottom .item.nb').length + index] == undefined ? 1 : s[zg8_img_l - $('.section_12 .bottom .item.nb').length + index]
                    $('.section_12 .bottom .item').eq(index).find('img').css({
                        'transform': 'scale(' + scale + ')',
                    })
                })
            })
        }
    }

    if (document.querySelector('#caseInfo_ws_zl')) {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 2,
            loop:true,
            speed:1000,
        });

        var topArray=[];
        $('.section_4 .warp .right .img').each(function(index,ele) {
            topArray.push($(ele).position().top-($(window).height()/2));
        })
    }

    if (document.querySelector('#caseInfo_nk')) {
        var lw3 = $('.sec1 .scroll')
        var data_h = parseInt(lw3.attr('data-h'))
        lw3.css('height',clientHeight + data_h + 'px')


        let w1 = $('.sec8 .scroll .fix .flex img').width()*5 + 78*4 - ($('.sec8 .scroll .fix .flex img').width()-78)/2
        $('.sec8 .scroll .fix .flex:nth-child(2)').css('left', ($(window).width() - w1)+'px')

        $('.sec8 .scroll').css('height',(w1 - $(window).width() + $(window).height())+'px')


        let lw1 = $('.sec3 .fix_box img').width()*4+176*3+($(window).width()-1400)/2 - $(window).width() + ($(window).width()-1400)/2
        $('.sec3 .scroll').css('height',$('.sec3 .fix').height() + lw1 + 'px')

        $(function () {
            nk_arr = []
            $('.sticky').each(function (i,e) {
                var data_top = $(e).attr('data-top')
                data_top ? data_top = data_top*1 : data_top = 0
                setTimeout(function () {
                    var top = $(e).offset().top - data_top
                    nk_arr.push(top)
                },200)
            })
        })

    }

    if (document.querySelector('.caseInfo_bb')) {
        let cH = document.documentElement.clientHeight
        let cW = document.documentElement.clientWidth
        var s = [];
        var zg8_img_l = $('.sec9 .wrap .content .img').length
        var zg8_h = cH * zg8_img_l
        $('.sec9 .fix_box').css('height', zg8_h + 'px')

        $('.sec10 .position_translate:nth-last-child(1)').hover(function (){
            $('.sec10 .img').addClass('right')
            $('.sec10 .img').removeClass('left')
        },function (){
            $('.sec10 .img').removeClass('right')
            $('.sec10 .img').removeClass('left')
        })
        $('.sec10 .position_translate:nth-last-child(2)').hover(function (){
            $('.sec10 .img').removeClass('right')
            $('.sec10 .img').addClass('left')
        },function (){
            $('.sec10 .img').removeClass('right')
            $('.sec10 .img').removeClass('left')
        })
    }

    if (document.querySelector('.pro_haitian')) {

        var container = document.getElementById('container');
        var draggableEl = document.getElementById('draggableEl');
        var width = $('.pro_ht4 .img_box').width()
        var isDragging = false;
        var initialX = 0, initialLeft = 0;
        var minLeft = 0, maxLeft = container.clientWidth - draggableEl.clientWidth;

        if (document.documentElement.clientWidth > 1024) {
            draggableEl.addEventListener('mousedown', function (e) {
                // 更新初始位置和拖拽状态
                isDragging = true;
                initialX = e.clientX;
                initialLeft = parseInt(window.getComputedStyle(draggableEl).left);

                // 防止选中文本的默认行为
                e.preventDefault();
            });

            document.addEventListener('mousemove', function (e) {
                if (isDragging) {
                    // 计算鼠标的位移距离
                    var offsetX = e.clientX - initialX;

                    // 根据容器范围限制元素的位置
                    var newLeft = initialLeft + offsetX;
                    newLeft = Math.max(minLeft, newLeft);
                    newLeft = Math.min(width, newLeft);

                    $('.pro_ht4 .imgbox2').width(width - newLeft + 'px')

                    // 更新元素的位置
                    draggableEl.style.left = newLeft + 'px';
                }
            });

            document.addEventListener('mouseup', function () {
                isDragging = false;
            });
        }else {
            // 触摸移动
            draggableEl.addEventListener('touchstart', function (e) {
                isDragging = true;
                initialX = e.touches[0].clientX;
                initialLeft = parseInt(window.getComputedStyle(draggableEl).left);

                // 防止选中文本的默认行为
                e.preventDefault();
            });

            // 触摸拖动
            draggableEl.addEventListener('touchmove', function (e) {
                if (isDragging) {
                    // 计算鼠标的位移距离
                    var offsetX = e.touches[0].clientX - initialX;
                    // 计算鼠标触摸的位移距离

                    // 根据容器范围限制元素的位置
                    var newLeft = initialLeft + offsetX;
                    newLeft = Math.max(minLeft, newLeft);
                    newLeft = Math.min(width, newLeft);

                    $('.pro_ht4 .imgbox2').width(width - newLeft + 'px')

                    // 更新元素的位置
                    draggableEl.style.left = newLeft + 'px';
                }
            });

            // 触摸结束
            draggableEl.addEventListener('touchend', function (e) {
                isDragging = false;
            });
        }





    }

    if (document.querySelector('.pro_fb')) {
        const $img = $(".moveImg img");
        $(".moveImg").on("mousemove", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const halfWidth = rect.width / 2;
            const rotateY = ((x - halfWidth) / halfWidth) * 3;
            gsap.to($img, {
                duration: 1.5,
                rotateY: rotateY,
                ease: "power2.out",
                transformPerspective: 400,
                transformOrigin: "center",
            });
        });
        $(".moveImg").on("mouseleave", function () {
            gsap.to($img, {
                duration: 1.5,
                rotateY: 0,
                ease: "power3.out",
            });
        });

        var fb3 = $('.pro_fb3 .wrap .content').offset().top - document.documentElement.clientHeight

        var fb1Swiper = new Swiper('.fb1Swiper', {
            speed: 1000,
            spaceBetween: 20,
            slidesPerView: 1,
            centeredSlides: true,
            initialSlide: 0,
            allowTouchMove: false,
            breakpoints: {
                1024: {
                    spaceBetween: 20,
                    slidesPerView: 3,
                },
            },
        })
        var newLength = $('.fb1Swiper .swiper-slide').length
        var jl = 800
        $('.pro_fb8').css('height',document.documentElement.clientHeight + (newLength*jl) + 'px')
    }

    if (document.querySelector('.pro_dy')) {
        ScrollTrigger.create({
            trigger: '.sec1 .img',
            start: 'top bottom',
            end: '+=1000',
            onUpdate: (self) => {
                var progress = self.progress
                let scale = 1.1 - 0.1 * progress
                gsap.to('.sec1 .img img', {
                    scale: scale,
                    ease: 'power2.out',
                    duration: 0.5,
                });
            },
        });

        ScrollTrigger.create({
            trigger: '.sec2',
            start: 'top bottom',
            end: '+=2000',
            onUpdate: (self) => {
                var progress = self.progress
                let x = 140 * progress
                gsap.to('.sec2 .zi', {
                    x: -x,
                    ease: 'power2.out',
                    duration: 0.5,
                });
            },
        });

        ScrollTrigger.create({
            trigger: '.sec7',
            start: 'top bottom',
            end: '+='+$(window).height()*2,
            onUpdate: (self) => {
                var progress = self.progress
                let Y = 400 * progress
                gsap.to('.sec7 .img img', {
                    y: -Y,
                    ease: 'power2.out',
                    duration: 0.5,
                });
            },
        });
        let parallax = document.querySelector('.parallax')

        function getTransform(a,b) {
            a.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${b}, 0, 1)`;
        }

        let cH = document.documentElement.clientHeight
        let cW = document.documentElement.clientWidth
        var s = [];
        var zg8_img_l = $('.sec12 .fix .r .img').length
        var zg8_h = cH * zg8_img_l
        $('.sec12').css('height', zg8_h + 'px')

        ScrollTrigger.create({
            trigger: '.sec12',
            start: 'top top',
            end: '+='+ (zg8_h - cH),
            onUpdate: (self) => {
                var progress = self.progress
                let h = 48 * progress
                gsap.to('.sec12 .fix .wrap .l .l_box .scroll_box .scroll_box_line', {
                    height: h,
                    ease: 'power2.out',
                    duration: 0.5,
                });

            },
        });
        $('.banner').addClass('on')


        var sec12_swiper = new Swiper ('.sec12_swiper', {
            speed: 1000,
            loop: true, // 循环模式选项
            slidesPerView : 1,
            spaceBetween : 40,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        })
    }

    if (document.querySelector('.caseInfo_gxgk1')) {
        var itemL = $('.caseInfo_gxgk9 .fix .wrap .content .x .item').length
        var listClick = $('.caseInfo_gxgk9 .fix .wrap .cut .list')
        var sjSwiper = new Swiper('.sjSwiper', {
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 40,
            on: {
                slideChange() {
                    listClick.removeClass('on').eq(this.realIndex).addClass('on')
                }
            }
        })
        listClick.click(function () {
            var index = $(this).index()
            if (document.documentElement.clientWidth>1024) {
                var go = $('.caseInfo_gxgk9').position().top + (index * ($('.caseInfo_gxgk9').height() / itemL))
                if (index === itemL-1) {
                    go = $('.caseInfo_gxgk9').position().top + ($('.caseInfo_gxgk9').height() - clientHeight)
                }
                scrollbar.scrollTo(0, go, 1200);
            }else {
                sjSwiper.slideTo(index)
            }
        })
    }

    function caseParallax(scrollTop) {
        if (document.querySelector('.case_parallax')) {
            var speed = scrollTop * 0.2
            $('.case_parallax').css('transform', 'translateY(' + speed + 'px)')
            $('.common_case_banner .scroll-down').css('transform', 'translateY(-' + (scrollTop * 0.15) + 'px)')
        }
        if (document.querySelector('.caseInfo_rc3')) {
            var start = $('.caseInfo_rc3').position().top - clientHeight
            if (scrollTop >= start) {
                var y = (scrollTop - start) * 0.2
                $('.caseInfo_rc3 .img').css('transform', 'translateY(' + y + 'px)')
            }
        }
    }

    var Scrollbar = window.Scrollbar;
    Scrollbar.initAll({damping: damp,renderByPixels:false})
    scrollbar = Scrollbar.get(document.querySelector('#my-scrollbar'))
    scrollbar.addListener((status) => {
        window.pageYOffset = scrollbar.scrollTop;

        scroll_content(window.pageYOffset)
        scrollTop_start(window.pageYOffset)
        var scrollTop = window.pageYOffset
        caseParallax(scrollTop)
        // console.log(status)

        if (document.querySelector('.contact1')) {
            var a_parallax_ = document.querySelector('.contact1 .parallax_img img')
            if (scrollTop > 0) {
                var a_speed_ = scrollTop * 0.9
                a_parallax_.style.transform = 'translate3d(0px,' + a_speed_ + 'px,0px)'
            }else {
                a_parallax_.style.transform = 'translate3d(0px,0px,0px)'
            }
        }

        if (document.querySelector('.news .parallax_img')) {
            var a_parallax_ = document.querySelector('.news .parallax_img img')
            if (scrollTop > 0) {
                var a_speed_ = scrollTop * 0.9
                a_parallax_.style.transform = 'translate3d(0px,' + a_speed_ + 'px,0px)'
            }else {
                a_parallax_.style.transform = 'translate3d(0px,0px,0px)'
            }
        }

        if (document.querySelector('.about1')) {
            var all_height = clientHeight + 7500
            $('.about2').css('height',all_height +'px')

            var fix_h = clientHeight * $('.about_fix .wrap .content .matter').length
            $('.about_fix').css('height',fix_h +'px')


            var e = $('.about1 .wrap .content .l')
            // 上边距
            var top_ = parseInt($('.about1 .wrap .content').css('margin-top'))
            // 下边距
            var bottom = 0
            var h = clientHeight - e.height() - (top_+bottom)
            // 开始距离
            var start = $('.about1 .wrap .content').position().top
            // 结束距离
            var end = $('.about1').next().position().top - clientHeight + h
            var num_end = $('.about1 .wrap .content .r').height() - e.height()
            count_size(e,start,end,num_end,scrollTop,top_,bottom)

            var a_parallax = document.querySelector('.about1 .parallax_img img')
            if (scrollTop > 0) {
                var a_speed = scrollTop * 0.9
                a_parallax.style.transform = 'translate3d(0px,' + a_speed + 'px,0px)'
            }else {
                a_parallax.style.transform = 'translate3d(0px,0px,0px)'
            }

            var flex_ = $('.about3').position().top - clientHeight
            if(scrollTop>flex_){
                var value = (scrollTop - flex_) *0.3
                $('.about3 .wrap .content .flex:first-child,.about3 .wrap .content .flex:last-child').css('transform','translateX(-'+value+'px)')
                $('.about3 .wrap .content .flex:nth-child(2)').css('transform','translateX('+value+'px)')
            }

            var line_start = $('.about4 .wrap .bottom .scroll_animate').offset().top - (clientHeight / 2)
            var line_h = $('.about4 .wrap .bottom .scroll_animate .position .line').height()
            if (scrollTop >= line_start) {
                var v = (scrollTop - line_start) / line_h * 100>100?100:(scrollTop - line_start) / line_h * 100
                $('.about4 .wrap .bottom .scroll_animate .position .line div').css('clip-path','inset(0 0 '+ (100-v) +'% 0)')
                $('.about4 .wrap .bottom .scroll_animate .position .circle').css('transform','translateY('+  (line_h * v/100)*((line_h-134)/line_h) +'px)')
            }else if (scrollTop <= line_start) {
                $('.about4 .wrap .bottom .scroll_animate .position .line div').css('clip-path','inset(0 0 100% 0)')
                $('.about4 .wrap .bottom .scroll_animate .position .circle').css('transform','translateY(0px)')
            }

            if (v>=100) {
                $('.about4 .wrap .bottom .scroll_animate .position .circle').addClass('hide')
            }else {
                $('.about4 .wrap .bottom .scroll_animate .position .circle').removeClass('hide')
            }

            var fix = $('.about_fix')
            var fix_d = (fix.height()-clientHeight)
            var about_fix = fix.position().top + parseInt(fix.css('margin-top'))
            if (scrollTop>=about_fix) {
                $('.about_fix .fix').css('transform','translateY('+(scrollTop-about_fix)+'px)')
            }else if (scrollTop < about_fix) {
                $('.about_fix .fix').css('transform','translateY(0px)')
            }
            if (scrollTop >= fix.next().position().top - clientHeight) {
                $('.about_fix .fix').css('transform','translateY('+fix_d+'px)')
            }

            var l = $('.about_fix .wrap .content .matter:not(:first-child)').length
            $('.about_fix .wrap .content .matter:not(:first-child)').each(function (i,e) {
                var start = (i * clientHeight) + about_fix
                var y = 100 + (scrollTop - start) / clientHeight * -100
                if (scrollTop >= start && scrollTop <= start + clientHeight) {
                    $(e).css({
                        'transform': 'translateY(' + y + 'vh)',
                    })
                } else if (scrollTop <= start) {
                    $(e).css({
                        'transform': 'translateY(100vh)',
                    })
                }
                var e_ = (i + 1) * 20
                if (scrollTop >= start + clientHeight - ((i + 1) * 20)) {
                    $('.about_fix .wrap .content .matter').eq(i).addClass('opacity')
                    $(e).css({
                        'transform': 'translateY(' + e_ + 'px)',
                    })
                }else {
                    $('.about_fix .wrap .content .matter').eq(i).removeClass('opacity')
                }
            })

            //
            var a_st = $('.about2').position().top
            var a_v = 5 + (scrollTop - a_st) / 1000 * -5
            if (scrollTop >= a_st) {
                $('.about2 .fix .position_text').css('filter','blur('+ a_v +'px)')
            }else if (scrollTop <= a_st) {
                $('.about2 .fix .position_text').css('filter','blur(5px)')
            }

            if (scrollTop >= a_st + 1000) {
                $('.about2 .fix .position_text').css('filter','blur(0)')
            }

            if (clientWidth <= all_mobile) {
                window.addEventListener('scroll',function () {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                    var flex_ = $('.about3').position().top - clientHeight
                    if(scrollTop>flex_){
                        var value = (scrollTop - flex_) *0.3
                        $('.about3 .wrap .content .flex:first-child,.about3 .wrap .content .flex:last-child').css('transform','translateX(-'+value+'px)')
                        $('.about3 .wrap .content .flex:nth-child(2)').css('transform','translateX('+value+'px)')
                    }

                })
            }

            
            // start 
            /* ================================================
      2. scrollerProxy 桥接 smooth-scrollbar ↔ GSAP
      ================================================ */
            // ScrollTrigger.scrollerProxy('#my-scrollbar', {
            //     scrollTop: function (v) {
            //         if (arguments.length) scrollbar.scrollTop = v;
            //         return scrollbar.scrollTop;
            //     },
            //     getBoundingClientRect: function () {
            //         return {
            //             top: 0, left: 0,
            //             width: window.innerWidth,
            //             height: window.innerHeight
            //         };
            //     },
            //     pinType: 'transform'
            // });
            scrollbar.addListener(ScrollTrigger.update);
            // scrollbar.addListener((status) => {
            //     window.pageYOffset = scrollbar.scrollTop;
            //     scrollTop_start(window.pageYOffset)
            // })

            /* ================================================
               3. 工具函数
               TOTAL = 最长动画的滚动像素（distance + animate = 1200 + 2500）
               ================================================ */
            var TOTAL = 4000;

            /** 滚动像素 → timeline position（0~1） */
            function at(distance) {
                return distance / TOTAL;
            }

            /** 滚动像素 → timeline duration（0~1） */
            function dur(animate) {
                return animate / TOTAL;
            }

            /* ================================================
               4. gsap.set — 设定所有元素的初始状态
                  （对应原代码中 scrollTop < start_distance 时的样式）
               ================================================ */

            /* ── matter1 ── */
            gsap.set('.matter1 .img1', {xPercent: 0, yPercent: 0, scale: 0.75, opacity: 0.75});
            gsap.set('.matter1 .img1 img', {filter: 'blur(5px)'});

            gsap.set('.matter1 .img2', {xPercent: 0, yPercent: 0, scale: 0.2});
            gsap.set('.matter1 .img2 img', {opacity: 0});

            gsap.set('.matter1 .img3', {xPercent: 0, yPercent: 0, scale: 0.2});
            gsap.set('.matter1 .img3 img', {opacity: 0});

            /* ── matter2 ── */
            gsap.set('.matter2 .img1', {xPercent: 0, yPercent: 0, scale: 0.5, opacity: 0.5});
            gsap.set('.matter2 .img1 img', {filter: 'blur(10px)'});

            gsap.set('.matter2 .img2', {xPercent: 0, yPercent: 0, scale: 0.2});
            gsap.set('.matter2 .img2 img', {opacity: 0});

            gsap.set('.matter2 .img3', {xPercent: 0, yPercent: 0, scale: 0.2});
            gsap.set('.matter2 .img3 img', {opacity: 0});

            /* ── matter3 ── */
            gsap.set('.matter3 .img1', {xPercent: 0, yPercent: 0, scale: 1});

            gsap.set('.matter3 .img2', {xPercent: 0, yPercent: 0, scale: 0.2});
            gsap.set('.matter3 .img2 img', {opacity: 0});

            gsap.set('.matter3 .img3', {xPercent: 0, yPercent: 0, scale: 0.2});
            gsap.set('.matter3 .img3 img', {opacity: 0});

            /* ── matter4 ── */
            gsap.set('.matter4 .img1', {xPercent: 0, yPercent: 0, scale: 0.5, opacity: 0.1});
            gsap.set('.matter4 .img1 img', {filter: 'blur(5px)'});

            gsap.set('.matter4 .img2', {xPercent: 0, yPercent: 0, scale: 0.2});
            gsap.set('.matter4 .img2 img', {opacity: 0});

            gsap.set('.matter4 .img3', {xPercent: 0, yPercent: 0, scale: 0.2});
            gsap.set('.matter4 .img3 img', {opacity: 0});

            /* ================================================
               5. gsap.timeline — 所有动画
                  scrub: true → 时间线进度与滚动位置 1:1 对应
                  pin: true   → 固定 .about2，等价于原 data-view="auto"

                  position 参数 = at(distance)   对应原 data-distance
                  duration 参数 = dur(animate)   对应原 data-animate
               ================================================ */
            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about2',
                    start: 'top top',
                    end: '+=' + TOTAL,
                    scrub: true,
                    // pin: true,
                    scroller: '#my-scrollbar',
                    invalidateOnRefresh: true
                }
            });

            /* ── matter1 ── */
            tl
                .to('.matter1 .img1', {
                    xPercent: -150, yPercent: -200,
                    scale: 2, opacity: 1,
                    ease: 'none', duration: dur(1000)
                }, at(0))
                .to('.matter1 .img1 img', {
                    filter: 'blur(0px)',
                    ease: 'none', duration: dur(100)
                }, at(0))

                .to('.matter1 .img2', {
                    xPercent: -150, yPercent: -200,
                    scale: 2,
                    ease: 'none', duration: dur(2000)
                }, at(300))
                .to('.matter1 .img2 img', {
                    opacity: 1,
                    ease: 'none', duration: dur(200)
                }, at(300))

                .to('.matter1 .img3', {
                    xPercent: -60, yPercent: -40,
                    scale: 1.5,
                    ease: 'none', duration: dur(2500)
                }, at(1200))
                .to('.matter1 .img3 img', {
                    opacity: 1,
                    ease: 'none', duration: dur(200)
                }, at(1200))

                /* ── matter2 ── */
                .to('.matter2 .img1', {
                    xPercent: 150, yPercent: -200,
                    scale: 2, opacity: 1,
                    ease: 'none', duration: dur(1000)
                }, at(0))
                .to('.matter2 .img1 img', {
                    filter: 'blur(0px)',
                    ease: 'none', duration: dur(100)
                }, at(0))

                .to('.matter2 .img2', {
                    xPercent: 150, yPercent: -200,
                    scale: 2,
                    ease: 'none', duration: dur(1500)
                }, at(200))
                .to('.matter2 .img2 img', {
                    opacity: 1,
                    ease: 'none', duration: dur(200)
                }, at(200))

                .to('.matter2 .img3', {
                    xPercent: 60, yPercent: -40,
                    scale: 1.5,
                    ease: 'none', duration: dur(2500)
                }, at(800))
                .to('.matter2 .img3 img', {
                    opacity: 1,
                    ease: 'none', duration: dur(200)
                }, at(800))

                /* ── matter3 ── */
                .to('.matter3 .img1', {
                    xPercent: -150, yPercent: 200,
                    scale: 2,
                    ease: 'none', duration: dur(1000)
                }, at(0))

                .to('.matter3 .img2', {
                    xPercent: -150, yPercent: 200,
                    scale: 2,
                    ease: 'none', duration: dur(1500)
                }, at(200))
                .to('.matter3 .img2 img', {
                    opacity: 1,
                    ease: 'none', duration: dur(200)
                }, at(200))

                .to('.matter3 .img3', {
                    xPercent: -60, yPercent: 40,
                    scale: 1.5,
                    ease: 'none', duration: dur(2500)
                }, at(800))
                .to('.matter3 .img3 img', {
                    opacity: 1,
                    ease: 'none', duration: dur(200)
                }, at(800))

                /* ── matter4 ── */
                .to('.matter4 .img1', {
                    xPercent: 150, yPercent: 200,
                    scale: 2, opacity: 1,
                    ease: 'none', duration: dur(1000)
                }, at(0))
                .to('.matter4 .img1 img', {
                    filter: 'blur(0px)',
                    ease: 'none', duration: dur(100)
                }, at(0))

                .to('.matter4 .img2', {
                    xPercent: 150, yPercent: 200,
                    scale: 2,
                    ease: 'none', duration: dur(2000)
                }, at(300))
                .to('.matter4 .img2 img', {
                    opacity: 1,
                    ease: 'none', duration: dur(200)
                }, at(300))

                .to('.matter4 .img3', {
                    xPercent: 60, yPercent: 40,
                    scale: 1.5,
                    ease: 'none', duration: dur(2500)
                }, at(1200))
                .to('.matter4 .img3 img', {
                    opacity: 1,
                    ease: 'none', duration: dur(200)
                }, at(1200));

            // end


//             var matter = {
//                 matter1: [
//                     {
//                         start: 100,
//                         x: 0,
//                         x_end: -150,
//                         y: 0,
//                         y_end: -200,
//                         scale: 0.75,
//                         scale_end: 2,
//                         blur: 4,
//                         blur_end: 0,
//                         opacity: 0.75,
//                         opacity_end: 1,
//                         scrollTop_distance: 1500,
//                         scrollTop_distance2: 200,
//                     },
//                     {
//                         start: 400,
//                         x: 0,
//                         x_end: -60,
//                         y: 0,
//                         y_end: -40,
//                         scale: 0.25,
//                         scale_end: 1.5,
//                         blur: 10,
//                         blur_end: 0,
//                         opacity: 0,
//                         opacity_end: 1,
//                         scrollTop_distance: 5500,
//                         scrollTop_distance2: 3000,
//                         delay: 400,
//                     }
//                 ],
//                 matter2: [
//                     {
//                         start: 200,
//                         x: 0,
//                         x_end: 150,
//                         y: 0,
//                         y_end: -200,
//                         scale: 0.5,
//                         scale_end: 2,
//                         blur: 10,
//                         blur_end: 0,
//                         opacity: 0.5,
//                         opacity_end: 1,
//                         scrollTop_distance: 1500,
//                         scrollTop_distance2: 200,
//                     },
//                     {
//                         start: 400,
//                         x: 0,
//                         x_end: 150,
//                         y: 0,
//                         y_end: -200,
//                         scale: 0.25,
//                         scale_end: 2,
//                         blur: 10,
//                         blur_end: 0,
//                         opacity: 0,
//                         opacity_end: 1,
//                         scrollTop_distance: 3500,
//                         scrollTop_distance2: 600,
//                         delay: 150,
//                     },
//                     {
//                         start: 800,
//                         x: 0,
//                         x_end: 60,
//                         y: 0,
//                         y_end: -40,
//                         scale: 0.15,
//                         scale_end: 1.5,
//                         blur: 10,
//                         blur_end: 0,
//                         opacity: 0,
//                         opacity_end: 1,
//                         scrollTop_distance: 6000,
//                         scrollTop_distance2: 2500,
//                         delay: 400,
//                     }
//                 ],
//                 matter3: [
//                     {
//                         start: 100,
//                         x: 0,
//                         x_end: -150,
//                         y: 0,
//                         y_end: 200,
//                         scale: 1,
//                         scale_end: 2,
//                         blur: 0,
//                         blur_end: 0,
//                         opacity: 1,
//                         opacity_end: 1,
//                         scrollTop_distance: 1500,
//                         scrollTop_distance2: 200,
//                     },
//                     {
//                         start: 400,
//                         x: 0,
//                         x_end: -150,
//                         y: 0,
//                         y_end: 200,
//                         scale: 0.25,
//                         scale_end: 2,
//                         blur: 10,
//                         blur_end: 0,
//                         opacity: 0,
//                         opacity_end: 1,
//                         scrollTop_distance: 3500,
//                         scrollTop_distance2: 600,
//                         delay: 150,
//                     },
//                     {
//                         start: 800,
//                         x: 0,
//                         x_end: -60,
//                         y: 0,
//                         y_end: 40,
//                         scale: 0.15,
//                         scale_end: 1.5,
//                         blur: 10,
//                         blur_end: 0,
//                         opacity: 0,
//                         opacity_end: 1,
//                         scrollTop_distance: 6000,
//                         scrollTop_distance2: 2500,
//                         delay: 400,
//                     }
//                 ],
//                 matter4: [
//                     {
//                         start: 200,
//                         x: 0,
//                         x_end: 150,
//                         y: 0,
//                         y_end: 200,
//                         scale: 0.5,
//                         scale_end: 2,
//                         blur: 10,
//                         blur_end: 0,
//                         opacity: 0.1,
//                         opacity_end: 1,
//                         scrollTop_distance: 1500,
//                         scrollTop_distance2: 200,
//                     },
//                     {
//                         start: 600,
//                         x: 0,
//                         x_end: 60,
//                         y: 0,
//                         y_end: 40,
//                         scale: 0.25,
//                         scale_end: 1.5,
//                         blur: 10,
//                         blur_end: 0,
//                         opacity: 0,
//                         opacity_end: 1,
//                         scrollTop_distance: 5500,
//                         scrollTop_distance2: 3000,
//                         delay: 400,
//                     }
//                 ],
//             }
//
//             // 1
//
//             var positionTop = $('.about2').position().top
//             var a_start = positionTop + matter.matter1[0].start
//             var matter1_img1_x = (scrollTop - a_start) / matter.matter1[0].scrollTop_distance * matter.matter1[0].x_end
//             var matter1_img1_y = (scrollTop - a_start) / matter.matter1[0].scrollTop_distance *  matter.matter1[0].y_end
//             var matter1_img1_s = matter.matter1[0].scale + (scrollTop - a_start) / matter.matter1[0].scrollTop_distance * (matter.matter1[0].scale_end - matter.matter1[0].scale)
//             var matter1_img1_blur = matter.matter1[0].blur + (scrollTop - a_start) / matter.matter1[0].scrollTop_distance2 * -matter.matter1[0].blur
//             var matter1_img1_opacity = matter.matter1[0].opacity + (scrollTop - a_start) / matter.matter1[0].scrollTop_distance2 * (matter.matter1[0].opacity_end - matter.matter1[0].opacity)
//
//             if (scrollTop >= a_start && scrollTop <= a_start + matter.matter1[0].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img1').css({
//                     'filter': 'blur('+ matter1_img1_blur +'px)',
//                     'opacity': matter1_img1_opacity
//                 })
//             }else if (scrollTop <= a_start) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img1').css({
//                     'filter': 'blur('+ matter.matter1[0].blur +'px)',
//                     'opacity': matter.matter1[0].opacity
//                 })
//             }
//             if (scrollTop >= a_start + matter.matter1[0].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img1').css({
//                     'filter': 'blur('+ matter.matter1[0].blur_end +')',
//                     'opacity': matter.matter1[0].opacity_end
//                 })
//             }
//
//             if (scrollTop >= a_start && scrollTop <= a_start + matter.matter1[0].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img1').css({
//                     'transform': 'translate3d('+ matter1_img1_x +'%, '+ matter1_img1_y +'%, 0px) scale('+ matter1_img1_s +')',
//                 })
//             }else if (scrollTop <= a_start) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img1').css({
//                     'transform': 'translate3d('+ matter.matter1[0].x +', '+ matter.matter1[0].y +', 0px) scale('+ matter.matter1[0].scale +')',
//                 })
//             }
//             if (scrollTop >= a_start + matter.matter1[0].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img1').css({
//                     'transform': 'translate3d('+ matter.matter1[0].x_end +'%, '+ matter.matter1[0].y_end +'%, 0px) scale('+ matter.matter1[0].scale_end +')',
//                 })
//             }
//
// // 2
//             var a_start2 = positionTop + matter.matter2[0].start
//             var matter2_img1_x = (scrollTop - a_start2) / matter.matter2[0].scrollTop_distance * matter.matter2[0].x_end
//             var matter2_img1_y = (scrollTop - a_start2) / matter.matter2[0].scrollTop_distance *  matter.matter2[0].y_end
//             var matter2_img1_s = matter.matter2[0].scale + (scrollTop - a_start2) / matter.matter2[0].scrollTop_distance * (matter.matter2[0].scale_end - matter.matter2[0].scale)
//             var matter2_img1_blur = matter.matter2[0].blur + (scrollTop - a_start2) / matter.matter2[0].scrollTop_distance2 * -matter.matter2[0].blur
//             var matter2_img1_opacity = matter.matter2[0].opacity + (scrollTop - a_start2) / matter.matter2[0].scrollTop_distance2 * (matter.matter2[0].opacity_end - matter.matter2[0].opacity)
//
//             if (scrollTop >= a_start2 && scrollTop <= a_start2 + matter.matter2[0].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img1').css({
//                     'filter': 'blur('+ matter2_img1_blur +'px)',
//                     'opacity': matter2_img1_opacity
//                 })
//             }else if (scrollTop <= a_start2) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img1').css({
//                     'filter': 'blur('+ matter.matter2[0].blur +'px)',
//                     'opacity': matter.matter2[0].opacity
//                 })
//             }
//             if (scrollTop >= a_start2 + matter.matter2[0].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img1').css({
//                     'filter': 'blur('+ matter.matter2[0].blur_end +')',
//                     'opacity': matter.matter2[0].opacity_end
//                 })
//             }
//
//             if (scrollTop >= a_start2 && scrollTop <= a_start2 + matter.matter2[0].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img1').css({
//                     'transform': 'translate3d('+ matter2_img1_x +'%, '+ matter2_img1_y +'%, 0px) scale('+ matter2_img1_s +')',
//                 })
//             }else if (scrollTop <= a_start2) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img1').css({
//                     'transform': 'translate3d('+ matter.matter2[0].x +', '+ matter.matter2[0].y +', 0px) scale('+ matter.matter2[0].scale +')',
//                 })
//             }
//             if (scrollTop >= a_start2 + matter.matter2[0].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img1').css({
//                     'transform': 'translate3d('+ matter.matter2[0].x_end +'%, '+ matter.matter2[0].y_end +'%, 0px) scale('+ matter.matter2[0].scale_end +')',
//                 })
//             }
//
// // 3
//
//             var a_start3 = positionTop + matter.matter3[0].start
//             var matter3_img1_x = (scrollTop - a_start3) / matter.matter3[0].scrollTop_distance * matter.matter3[0].x_end
//             var matter3_img1_y = (scrollTop - a_start3) / matter.matter3[0].scrollTop_distance *  matter.matter3[0].y_end
//             var matter3_img1_s = matter.matter3[0].scale + (scrollTop - a_start3) / matter.matter3[0].scrollTop_distance * (matter.matter2[0].scale_end - matter.matter3[0].scale)
//             var matter3_img1_blur = matter.matter3[0].blur + (scrollTop - a_start3) / matter.matter3[0].scrollTop_distance2 * -matter.matter2[0].blur
//             var matter3_img1_opacity = matter.matter3[0].opacity + (scrollTop - a_start3) / matter.matter3[0].scrollTop_distance2 * (matter.matter2[0].opacity_end - matter.matter3[0].opacity)
//
//             if (scrollTop >= a_start3 && scrollTop <= a_start3 + matter.matter3[0].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img1').css({
//                     'filter': 'blur('+ matter3_img1_blur +'px)',
//                     'opacity': matter3_img1_opacity
//                 })
//             }else if (scrollTop <= a_start3) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img1').css({
//                     'filter': 'blur('+ matter.matter3[0].blur +'px)',
//                     'opacity': matter.matter3[0].opacity
//                 })
//             }
//             if (scrollTop >= a_start3 + matter.matter3[0].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img1').css({
//                     'filter': 'blur('+ matter.matter3[0].blur_end +')',
//                     'opacity': matter.matter3[0].opacity_end
//                 })
//             }
//
//             if (scrollTop >= a_start3 && scrollTop <= a_start3 + matter.matter3[0].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img1').css({
//                     'transform': 'translate3d('+ matter3_img1_x +'%, '+ matter3_img1_y +'%, 0px) scale('+ matter3_img1_s +')',
//                 })
//             }else if (scrollTop <= a_start3) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img1').css({
//                     'transform': 'translate3d('+ matter.matter3[0].x +', '+ matter.matter3[0].y +', 0px) scale('+ matter.matter3[0].scale +')',
//                 })
//             }
//             if (scrollTop >= a_start3 + matter.matter3[0].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img1').css({
//                     'transform': 'translate3d('+ matter.matter3[0].x_end +'%, '+ matter.matter3[0].y_end +'%, 0px) scale('+ matter.matter3[0].scale_end +')',
//                 })
//             }
//
// //4
//             var a_start4 = positionTop + matter.matter4[0].start
//             var matter4_img1_x = (scrollTop - a_start4) / matter.matter4[0].scrollTop_distance * matter.matter4[0].x_end
//             var matter4_img1_y = (scrollTop - a_start4) / matter.matter4[0].scrollTop_distance *  matter.matter4[0].y_end
//             var matter4_img1_s = matter.matter4[0].scale + (scrollTop - a_start4) / matter.matter4[0].scrollTop_distance * (matter.matter2[0].scale_end - matter.matter4[0].scale)
//             var matter4_img1_blur = matter.matter4[0].blur + (scrollTop - a_start4) / matter.matter4[0].scrollTop_distance2 * -matter.matter2[0].blur
//             var matter4_img1_opacity = matter.matter4[0].opacity + (scrollTop - a_start4) / matter.matter4[0].scrollTop_distance2 * (matter.matter2[0].opacity_end - matter.matter4[0].opacity)
//
//             if (scrollTop >= a_start4 && scrollTop <= a_start4 + matter.matter4[0].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img1').css({
//                     'filter': 'blur('+ matter4_img1_blur +'px)',
//                     'opacity': matter4_img1_opacity
//                 })
//             }else if (scrollTop <= a_start4) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img1').css({
//                     'filter': 'blur('+ matter.matter4[0].blur +'px)',
//                     'opacity': matter.matter4[0].opacity
//                 })
//             }
//             if (scrollTop >= a_start4 + matter.matter4[0].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img1').css({
//                     'filter': 'blur('+ matter.matter4[0].blur_end +')',
//                     'opacity': matter.matter4[0].opacity_end
//                 })
//             }
//
//             if (scrollTop >= a_start4 && scrollTop <= a_start4 + matter.matter4[0].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img1').css({
//                     'transform': 'translate3d('+ matter4_img1_x +'%, '+ matter4_img1_y +'%, 0px) scale('+ matter4_img1_s +')',
//                 })
//             }else if (scrollTop <= a_start4) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img1').css({
//                     'transform': 'translate3d('+ matter.matter4[0].x +', '+ matter.matter4[0].y +', 0px) scale('+ matter.matter4[0].scale +')',
//                 })
//             }
//             if (scrollTop >= a_start4 + matter.matter4[0].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img1').css({
//                     'transform': 'translate3d('+ matter.matter4[0].x_end +'%, '+ matter.matter4[0].y_end +'%, 0px) scale('+ matter.matter4[0].scale_end +')',
//                 })
//             }
//
// // 3-2
//             var a_start5 = positionTop + matter.matter3[1].start
//             var matter5_img1_x = (scrollTop - (a_start5 + matter.matter3[1].delay)) / matter.matter3[1].scrollTop_distance * matter.matter3[1].x_end
//             var matter5_img1_y = (scrollTop - (a_start5 + matter.matter3[1].delay)) / matter.matter3[1].scrollTop_distance *  matter.matter3[1].y_end
//             var matter5_img1_s = matter.matter3[1].scale + (scrollTop - (a_start5 + matter.matter3[1].delay)) / matter.matter3[1].scrollTop_distance * (matter.matter2[1].scale_end - matter.matter3[1].scale)
//             var matter5_img1_blur = matter.matter3[1].blur + (scrollTop - a_start5) / matter.matter3[1].scrollTop_distance2 * -matter.matter2[1].blur
//             var matter5_img1_opacity = matter.matter3[1].opacity + (scrollTop - a_start5) / matter.matter3[1].scrollTop_distance2 * (matter.matter2[1].opacity_end - matter.matter3[1].opacity)
//
//             if (scrollTop >= a_start5 && scrollTop <= a_start5 + matter.matter3[1].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img2').css({
//                     'filter': 'blur('+ matter5_img1_blur +'px)',
//                     'opacity': matter5_img1_opacity
//                 })
//             }else if (scrollTop <= a_start5) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img2').css({
//                     'filter': 'blur('+ matter.matter3[1].blur +'px)',
//                     'opacity': matter.matter3[1].opacity
//                 })
//             }
//             if (scrollTop >= a_start5 + matter.matter3[1].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img2').css({
//                     'filter': 'blur('+ matter.matter3[1].blur_end +')',
//                     'opacity': matter.matter3[1].opacity_end
//                 })
//             }
//
//             if (scrollTop >= (a_start5 + matter.matter3[1].delay) && scrollTop <= (a_start5 + matter.matter3[1].delay) + matter.matter3[1].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img2').css({
//                     'transform': 'translate3d('+ matter5_img1_x +'%, '+ matter5_img1_y +'%, 0px) scale('+ matter5_img1_s +')',
//                 })
//             }else if (scrollTop <= (a_start5 + matter.matter3[1].delay)) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img2').css({
//                     'transform': 'translate3d('+ matter.matter3[1].x +', '+ matter.matter3[1].y +', 0px) scale('+ matter.matter3[1].scale +')',
//                 })
//             }
//             if (scrollTop >= (a_start5 + matter.matter3[1].delay) + matter.matter3[1].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img2').css({
//                     'transform': 'translate3d('+ matter.matter3[1].x_end +'%, '+ matter.matter3[1].y_end +'%, 0px) scale('+ matter.matter3[1].scale_end +')',
//                 })
//             }
//
// // 2-2
//             var a_start6 = positionTop + matter.matter2[1].start
//             var matter6_img1_x = (scrollTop - (a_start6 + matter.matter2[1].delay)) / matter.matter2[1].scrollTop_distance * matter.matter2[1].x_end
//             var matter6_img1_y = (scrollTop - (a_start6 + matter.matter2[1].delay)) / matter.matter2[1].scrollTop_distance *  matter.matter2[1].y_end
//             var matter6_img1_s = matter.matter2[1].scale + (scrollTop - (a_start6 + matter.matter2[1].delay)) / matter.matter2[1].scrollTop_distance * (matter.matter2[1].scale_end - matter.matter2[1].scale)
//             var matter6_img1_blur = matter.matter2[1].blur + (scrollTop - a_start6) / matter.matter2[1].scrollTop_distance2 * -matter.matter2[1].blur
//             var matter6_img1_opacity = matter.matter2[1].opacity + (scrollTop - a_start6) / matter.matter2[1].scrollTop_distance2 * (matter.matter2[1].opacity_end - matter.matter2[1].opacity)
//
//             if (scrollTop >= a_start6 && scrollTop <= a_start6 + matter.matter2[1].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img2').css({
//                     'filter': 'blur('+ matter6_img1_blur +'px)',
//                     'opacity': matter6_img1_opacity
//                 })
//             }else if (scrollTop <= a_start6) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img2').css({
//                     'filter': 'blur('+ matter.matter2[1].blur +'px)',
//                     'opacity': matter.matter2[1].opacity
//                 })
//             }
//             if (scrollTop >= a_start6 + matter.matter2[1].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img2').css({
//                     'filter': 'blur('+ matter.matter2[1].blur_end +')',
//                     'opacity': matter.matter2[1].opacity_end
//                 })
//             }
//
//             if (scrollTop >= (a_start6 + matter.matter2[1].delay) && scrollTop <= (a_start6 + matter.matter2[1].delay) + matter.matter2[1].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img2').css({
//                     'transform': 'translate3d('+ matter6_img1_x +'%, '+ matter6_img1_y +'%, 0px) scale('+ matter6_img1_s +')',
//                 })
//             }else if (scrollTop <= (a_start6 + matter.matter2[1].delay)) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img2').css({
//                     'transform': 'translate3d('+ matter.matter2[1].x +', '+ matter.matter2[1].y +', 0px) scale('+ matter.matter2[1].scale +')',
//                 })
//             }
//             if (scrollTop >= (a_start6 + matter.matter2[1].delay) + matter.matter2[1].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img2').css({
//                     'transform': 'translate3d('+ matter.matter2[1].x_end +'%, '+ matter.matter2[1].y_end +'%, 0px) scale('+ matter.matter2[1].scale_end +')',
//                 })
//             }
//
// // 1-2
//             var a_start7 = positionTop + matter.matter1[1].start
//             var matter7_img1_x = (scrollTop - (a_start7 + matter.matter1[1].delay)) / matter.matter1[1].scrollTop_distance * matter.matter1[1].x_end
//             var matter7_img1_y = (scrollTop - (a_start7 + matter.matter1[1].delay)) / matter.matter1[1].scrollTop_distance *  matter.matter1[1].y_end
//             var matter7_img1_s = matter.matter1[1].scale + (scrollTop - (a_start7 + matter.matter1[1].delay)) / matter.matter1[1].scrollTop_distance * (matter.matter1[1].scale_end - matter.matter1[1].scale)
//             var matter7_img1_blur = matter.matter1[1].blur + (scrollTop - a_start7) / matter.matter1[1].scrollTop_distance2 * -matter.matter2[1].blur
//             var matter7_img1_opacity = matter.matter1[1].opacity + (scrollTop - a_start7) / matter.matter1[1].scrollTop_distance2 * (matter.matter2[1].opacity_end - matter.matter1[1].opacity)
//
//             if (scrollTop >= a_start7 && scrollTop <= a_start7 + matter.matter1[1].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img2').css({
//                     'filter': 'blur('+ matter7_img1_blur +'px)',
//                     'opacity': matter7_img1_opacity
//                 })
//             }else if (scrollTop <= a_start7) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img2').css({
//                     'filter': 'blur('+ matter.matter1[1].blur +'px)',
//                     'opacity': matter.matter1[1].opacity
//                 })
//             }
//             if (scrollTop >= a_start7 + matter.matter1[1].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img2').css({
//                     'filter': 'blur('+ matter.matter1[1].blur_end +')',
//                     'opacity': matter.matter1[1].opacity_end
//                 })
//             }
//
//             if (scrollTop >= (a_start7 + matter.matter1[1].delay) && scrollTop <= (a_start7 + matter.matter1[1].delay) + matter.matter1[1].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img2').css({
//                     'transform': 'translate3d('+ matter7_img1_x +'%, '+ matter7_img1_y +'%, 0px) scale('+ matter7_img1_s +')',
//                 })
//             }else if (scrollTop <= (a_start7 + matter.matter1[1].delay)) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img2').css({
//                     'transform': 'translate3d('+ matter.matter1[1].x +', '+ matter.matter1[1].y +', 0px) scale('+ matter.matter1[1].scale +')',
//                 })
//             }
//             if (scrollTop >= (a_start7 + matter.matter1[1].delay) + matter.matter1[1].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter1 .img.img2').css({
//                     'transform': 'translate3d('+ matter.matter1[1].x_end +'%, '+ matter.matter1[1].y_end +'%, 0px) scale('+ matter.matter1[1].scale_end +')',
//                 })
//             }
//
// // 4-2
//             var a_start8 = positionTop + matter.matter4[1].start
//             var matter8_img1_x = (scrollTop - (a_start8 + matter.matter4[1].delay)) / matter.matter4[1].scrollTop_distance * matter.matter4[1].x_end
//             var matter8_img1_y = (scrollTop - (a_start8 + matter.matter4[1].delay)) / matter.matter4[1].scrollTop_distance *  matter.matter4[1].y_end
//             var matter8_img1_s = matter.matter4[1].scale + (scrollTop - (a_start8 + matter.matter4[1].delay)) / matter.matter4[1].scrollTop_distance * (matter.matter4[1].scale_end - matter.matter4[1].scale)
//             var matter8_img1_blur = matter.matter4[1].blur + (scrollTop - a_start8) / matter.matter4[1].scrollTop_distance2 * -matter.matter4[1].blur
//             var matter8_img1_opacity = matter.matter4[1].opacity + (scrollTop - a_start8) / matter.matter4[1].scrollTop_distance2 * (matter.matter4[1].opacity_end - matter.matter4[1].opacity)
//
//             if (scrollTop >= a_start8 && scrollTop <= a_start8 + matter.matter4[1].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img2').css({
//                     'filter': 'blur('+ matter8_img1_blur +'px)',
//                     'opacity': matter8_img1_opacity
//                 })
//             }else if (scrollTop <= a_start8) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img2').css({
//                     'filter': 'blur('+ matter.matter4[1].blur +'px)',
//                     'opacity': matter.matter4[1].opacity
//                 })
//             }
//             if (scrollTop >= a_start8 + matter.matter4[1].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img2').css({
//                     'filter': 'blur('+ matter.matter4[1].blur_end +')',
//                     'opacity': matter.matter4[1].opacity_end
//                 })
//             }
//
//             if (scrollTop >= (a_start8 + matter.matter4[1].delay) && scrollTop <= (a_start8 + matter.matter4[1].delay) + matter.matter4[1].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img2').css({
//                     'transform': 'translate3d('+ matter8_img1_x +'%, '+ matter8_img1_y +'%, 0px) scale('+ matter8_img1_s +')',
//                 })
//             }else if (scrollTop <= (a_start8 + matter.matter4[1].delay)) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img2').css({
//                     'transform': 'translate3d('+ matter.matter4[1].x +', '+ matter.matter4[1].y +', 0px) scale('+ matter.matter4[1].scale +')',
//                 })
//             }
//             if (scrollTop >= (a_start8 + matter.matter4[1].delay) + matter.matter4[1].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter4 .img.img2').css({
//                     'transform': 'translate3d('+ matter.matter4[1].x_end +'%, '+ matter.matter4[1].y_end +'%, 0px) scale('+ matter.matter4[1].scale_end +')',
//                 })
//             }
//
// // 2-3
//             var a_start9 = positionTop + matter.matter2[2].start
//             var matter9_img1_x = (scrollTop - (a_start9 + matter.matter2[2].delay)) / matter.matter2[2].scrollTop_distance * matter.matter2[2].x_end
//             var matter9_img1_y = (scrollTop - (a_start9 + matter.matter2[2].delay)) / matter.matter2[2].scrollTop_distance *  matter.matter2[2].y_end
//             var matter9_img1_s = matter.matter2[2].scale + (scrollTop - (a_start9 + matter.matter2[2].delay)) / matter.matter2[2].scrollTop_distance * (matter.matter2[2].scale_end - matter.matter2[2].scale)
//             var matter9_img1_blur = matter.matter2[2].blur + (scrollTop - a_start9) / matter.matter2[2].scrollTop_distance2 * -matter.matter2[2].blur
//             var matter9_img1_opacity = matter.matter2[2].opacity + (scrollTop - a_start9) / matter.matter2[2].scrollTop_distance2 * (matter.matter2[2].opacity_end - matter.matter2[2].opacity)
//
//             if (scrollTop >= a_start9 && scrollTop <= a_start9 + matter.matter2[2].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img3').css({
//                     'filter': 'blur('+ matter9_img1_blur +'px)',
//                     'opacity': matter9_img1_opacity
//                 })
//             }else if (scrollTop <= a_start9) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img3').css({
//                     'filter': 'blur('+ matter.matter2[2].blur +'px)',
//                     'opacity': matter.matter2[2].opacity
//                 })
//             }
//             if (scrollTop >= a_start9 + matter.matter2[2].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img3').css({
//                     'filter': 'blur('+ matter.matter2[2].blur_end +')',
//                     'opacity': matter.matter2[2].opacity_end
//                 })
//             }
// //
//             if (scrollTop >= (a_start9 + matter.matter2[2].delay) && scrollTop <= (a_start9 + matter.matter2[2].delay) + matter.matter2[2].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img3').css({
//                     'transform': 'translate3d('+ matter9_img1_x +'%, '+ matter9_img1_y +'%, 0px) scale('+ matter9_img1_s +')',
//                 })
//             }else if (scrollTop <= (a_start9 + matter.matter2[2].delay)) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img3').css({
//                     'transform': 'translate3d('+ matter.matter2[2].x +', '+ matter.matter2[2].y +', 0px) scale('+ matter.matter2[2].scale +')',
//                 })
//             }
//             if (scrollTop >= (a_start9 + matter.matter2[2].delay) + matter.matter2[2].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter2 .img.img3').css({
//                     'transform': 'translate3d('+ matter.matter2[2].x_end +'%, '+ matter.matter2[2].y_end +'%, 0px) scale('+ matter.matter2[2].scale_end +')',
//                 })
//             }
//
// // 3-3
//             var a_start10 = positionTop + matter.matter3[2].start
//             var matter10_img1_x = (scrollTop - (a_start10 + matter.matter3[2].delay)) / matter.matter3[2].scrollTop_distance * matter.matter3[2].x_end
//             var matter10_img1_y = (scrollTop - (a_start10 + matter.matter3[2].delay)) / matter.matter3[2].scrollTop_distance *  matter.matter3[2].y_end
//             var matter10_img1_s = matter.matter3[2].scale + (scrollTop - (a_start10 + matter.matter3[2].delay)) / matter.matter3[2].scrollTop_distance * (matter.matter2[2].scale_end - matter.matter3[2].scale)
//             var matter10_img1_blur = matter.matter3[2].blur + (scrollTop - a_start10) / matter.matter3[2].scrollTop_distance2 * -matter.matter2[2].blur
//             var matter10_img1_opacity = matter.matter3[2].opacity + (scrollTop - a_start10) / matter.matter3[2].scrollTop_distance2 * (matter.matter2[2].opacity_end - matter.matter3[2].opacity)
//
//             if (scrollTop >= a_start10 && scrollTop <= a_start10 + matter.matter3[2].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img3').css({
//                     'filter': 'blur('+ matter10_img1_blur +'px)',
//                     'opacity': matter10_img1_opacity
//                 })
//             }else if (scrollTop <= a_start10) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img3').css({
//                     'filter': 'blur('+ matter.matter3[2].blur +'px)',
//                     'opacity': matter.matter3[2].opacity
//                 })
//             }
//             if (scrollTop >= a_start10 + matter.matter3[2].scrollTop_distance2) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img3').css({
//                     'filter': 'blur('+ matter.matter3[2].blur_end +')',
//                     'opacity': matter.matter3[2].opacity_end
//                 })
//             }
//
//             if (scrollTop >= (a_start10 + matter.matter3[2].delay) && scrollTop <= (a_start10 + matter.matter3[2].delay) + matter.matter3[2].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img3').css({
//                     'transform': 'translate3d('+ matter10_img1_x +'%, '+ matter10_img1_y +'%, 0px) scale('+ matter10_img1_s +')',
//                 })
//             }else if (scrollTop <= (a_start10 + matter.matter3[2].delay)) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img3').css({
//                     'transform': 'translate3d('+ matter.matter3[2].x +', '+ matter.matter3[2].y +', 0px) scale('+ matter.matter3[2].scale +')',
//                 })
//             }
//             if (scrollTop >= (a_start10 + matter.matter3[2].delay) + matter.matter3[2].scrollTop_distance) {
//                 $('.about2 .fix .wrap .matter.matter3 .img.img3').css({
//                     'transform': 'translate3d('+ matter.matter3[2].x_end +'%, '+ matter.matter3[2].y_end +'%, 0px) scale('+ matter.matter3[2].scale_end +')',
//                 })
//             }

            function count_size(e,start,end,num_end,scrollTop) {
                if (scrollTop > start && scrollTop <= end) {

                    $(e).css('transform', 'translate3d(0px, ' + (scrollTop - start) + 'px, 0px)')
                }else if (scrollTop < start){
                    $(e).css('transform', 'translate3d(0px,0px, 0px)')
                }
                if (scrollTop >= end) {
                    $(e).css('transform', 'translate3d(0px, '+ num_end +'px, 0px)')
                }
            }
        }

        if (document.querySelector('.solution')) {
            var item_ = $('.solution3 .wrap .fix .item')
            var height = $('.solution3').css('height', (item_.length * clientHeight) + 'px')

            var matterArr = []
            $('.solution2 .wrap .content .matter').each(function (i,e) {
                var start = $(e).offset().top
                matterArr.push(start)
            })

            var content = $('.design2 .wrap .content');
            var content_s = content.position().top;
            var items = $('.design2 .wrap .content .item');
            var all = content.height() / (items.length + 1);

            item_.each(function (i,e) {
                $(e).css('z-index',item_.length-i)
                // var start = (i*clientHeight) + $('.solution3').position().top
                // var value =  (scrollTop - start) / clientHeight * 100
                // if (scrollTop >= start && scrollTop <= $('.solution3').next().position().top - clientHeight) {
                //     $(e).css('clip-path','inset(0 0 '+ value +'% 0)')
                // }else if (scrollTop <= start) {
                //     $(e).css('clip-path','inset(0 0 0 0)')
                // }
                // if (scrollTop >= start + clientHeight) {
                //     $(e).css('clip-path','inset(0 0 100% 0)')
                // }

                var start = $('.solution3').position().top
                var value= (scrollTop - start) / ((item_.length-1) * clientHeight)*100
                if (scrollTop >= start && scrollTop <= $('.solution3').next().position().top - clientHeight) {
                    $(e).css('clip-path','inset(0 0 '+ ((i*-100)+value*(item_.length-1)) +'% 0)')
                }else if (scrollTop <= start) {
                    $(e).css('clip-path','inset(0 0 '+ (i*100) +'% 0)')
                }

                if (scrollTop >= $('.solution3').next().position().top - clientHeight) {
                    $(e).css('clip-path','inset(0 0 '+ (((item_.length-1)-i)*100) +'% 0)')
                }

            })

            $('.solution2 .wrap .content .matter').each(function (i,e) {
                var top = $(e).offset().top - clientHeight
                var top2 = ($(e).offset().top - clientHeight) + 1000

                var h = $(e).find('.bottom').height()
                var bottom_start = top + 100
                var value = (scrollTop - bottom_start)
                var bottom_h = $(e).find('.bg').height() - h - 40
                if (value >= bottom_h) {
                    value = bottom_h
                }
                if (scrollTop >= bottom_start) {
                    $(e).find('.bottom_y').css('transform','translateY('+ value +'px)')
                }else if (scrollTop <= bottom_start){
                    $(e).find('.bottom_y').css('transform','translateY(0px)')
                }
                // if (scrollTop >= top) {
                //     $(e).css({
                //         'transform': 'scale('+ s +')'
                //     })
                // }else if (scrollTop <= top) {
                //     $(e).css({
                //         'transform': 'scale(0.9)'
                //     })
                // }
                // if (scrollTop >= top2) {
                //     $(e).find('.joke').css({
                //         'transform': 'scale('+ s2 +')'
                //     })
                // }else if (scrollTop <= top2) {
                //     $(e).find('.joke').css({
                //         'transform': 'scale(1)'
                //     })
                // }

                var matter_h = $(e).outerHeight()
                var joke_h = $(e).find('.joke').height()
                var start2 = matterArr[i] - (clientHeight - joke_h)/2
                var top3 = matter_h - joke_h
                var y = (scrollTop - start2)
                var s = 0.9 + (scrollTop - (matterArr[i] - clientHeight)) / top3 * 0.1;
                var s2 = 1 + (scrollTop - (start2 + top3)) / top3 *-0.1
                s >= 1 ? s = 1 : s
                s2 <= 0.9 ? s2 = 0.9 : s2
                // var s2 = 1 + (scrollTop - top2) / (clientHeight*0.9) *-0.1

                // s2 <= 0.9 ? s2 = 0.9 : s2

                if(scrollTop>= (matterArr[i] - clientHeight) ){
                    console.log(1)
                    if (scrollTop>=start2 && scrollTop <= start2 + top3) {
                        $(e).css('transform','translateY('+ y +'px) scale('+ s +')')
                    }else if (scrollTop <= start2) {
                        $(e).css('transform', 'translateY(0px) scale('+s+')')
                    }

                    if (scrollTop >= start2 + (top3 / 2))  {
                        $(e).addClass('on')
                    }else {
                        $(e).removeClass('on')
                    }

                    if (scrollTop >= start2 + top3) {
                        $(e).css('transform','translateY('+ top3 +'px) scale('+ s2 +')')
                    }
                }else if (scrollTop <= (matterArr[i] - clientHeight)){
                    $(e).css('transform', 'translateY(0px) scale(.9)')
                }


            })

            //
            $('.public_sticky').each(function (i, e) {
                var height = $(e).find('.content_fix').height()
                var position = $(e).position().top - parseInt(((clientHeight - height) / 2))
                if (scrollTop >= position && scrollTop <= position + $(e).height() - height) {
                    $(e).find('.content_fix').css('transform', 'translateY(' + (scrollTop - position) + 'px)')
                } else if (scrollTop <= position) {
                    $(e).find('.content_fix').css('transform', 'translateY(0px)')
                }

                if (scrollTop >= position + $(e).height() - height) {
                    $(e).find('.content_fix').css('transform', 'translateY(' + ($(e).height() - height) + 'px)')
                }

            })
            for (var i = 0; i < items.length; i++) {
                var item = items.eq(i);
                var index = i + 1;
                var start = content_s + i * all;
                var end = content_s + (i + 1) * all;
                var _1, _2;

                _1 = 66 + (scrollTop - start) / all * -58;
                _2 = 8 + (scrollTop - start) / all * 58;

                if (scrollTop >= start && scrollTop <= end) {
                    item.css('height', _1 + '%');
                    if (index < items.length) {
                        items.eq(index).css('height', _2 + '%');
                    }
                } else {
                    if (index < items.length) {
                        items.eq(index).css('height', '8%');
                    }
                }
                if (scrollTop >= end) {
                    items.eq(0).css('height', '8%');
                }
                if (scrollTop >= content_s + (items.length - 1) * all) {
                    items.eq(items.length - 1).css('height', '66%');
                }

                var slideToIndex = Math.floor((scrollTop - content_s) / (content.height() / (items.length + 1)))
                slideToIndex <= 0 ? slideToIndex = 0 : slideToIndex
                slideToIndex >= (items.length - 1) ? slideToIndex = (items.length - 1) : slideToIndex
                items.removeClass('on').eq(slideToIndex).addClass('on')
            }
            //
        }

        if (document.querySelector('.design4')) {
            var design3 = $('.design3')
            var design3_h = parseInt(design3.attr('data-h'))
            var content = $('.design2 .wrap .content');
            var content_s = content.position().top;
            var items = $('.design2 .wrap .content .item');
            var all = content.height() / (items.length + 1);
            var after = $('.design3 .wrap .content .scroll .after');
            var list = $('.design3 .scroll_list')
            var st = design3.position().top
            var i_length = list.length
            design3.css('height',clientHeight + (design3_h*i_length) + 'px')
            after.css('height',$('.design3 .wrap .content .scroll').height() / i_length + 'px')
            $(document).on('click', '.design2 .wrap .content .item', function () {
                var to = content_s + ($(this).index()) * all
                scrollbar.scrollTo(0, to, 800);
            })

            $('.public_sticky').each(function (i, e) {
                var height = $(e).find('.content_fix').height()
                var position = $(e).position().top - parseInt(((clientHeight - height) / 2))
                if (scrollTop >= position && scrollTop <= position + $(e).height() - height) {
                    $(e).find('.content_fix').css('transform', 'translateY(' + (scrollTop - position) + 'px)')
                } else if (scrollTop <= position) {
                    $(e).find('.content_fix').css('transform', 'translateY(0px)')
                }

                if (scrollTop >= position + $(e).height() - height) {
                    $(e).find('.content_fix').css('transform', 'translateY(' + ($(e).height() - height) + 'px)')
                }


            })
            for (var i = 0; i < items.length; i++) {
                var item = items.eq(i);
                var index = i + 1;
                var start = content_s + i * all;
                var end = content_s + (i + 1) * all;
                var _1, _2;

                _1 = 66 + (scrollTop - start) / all * -58;
                _2 = 8 + (scrollTop - start) / all * 58;

                if (scrollTop >= start && scrollTop <= end) {
                    item.css('height', _1 + '%');
                    if (index < items.length) {
                        items.eq(index).css('height', _2 + '%');
                    }
                } else {
                    if (index < items.length) {
                        items.eq(index).css('height', '8%');
                    }
                }
                if (scrollTop >= end) {
                    items.eq(0).css('height', '8%');
                }
                if (scrollTop >= content_s + (items.length - 1) * all) {
                    items.eq(items.length - 1).css('height', '66%');
                }

                var slideToIndex = Math.floor((scrollTop - content_s) / (content.height() / (items.length + 1)))
                slideToIndex <= 0 ? slideToIndex = 0 : slideToIndex
                slideToIndex >= (items.length - 1) ? slideToIndex = (items.length - 1) : slideToIndex
                items.removeClass('on').eq(slideToIndex).addClass('on')
            }
            var design3_index = Math.floor((scrollTop - st) / ((design3.height() - clientHeight) / i_length))
            design3_index <= 0 ? design3_index = 0 : design3_index
            design3_index >= (i_length-1) ? design3_index = (i_length-1) : design3_index
            console.log(design3_index)
            if (scrollTop >= st && scrollTop <= design3.next().position().top - clientHeight) {
                list.removeClass('on').eq(design3_index).addClass('on')
                list.removeClass('on').eq(design3_index).addClass('on')
                after.css('transform','translateY('+ ($('.design3 .wrap .content .scroll').height() / i_length) *design3_index +'px)')
            }
        }

        if (document.querySelector('.index1')) {
            var banner_parallax = document.querySelector('.banner .parallax')
            if (scrollTop > 0) {
                var speed = scrollTop * 0.9
                banner_parallax.style.transform = 'translate3d(0px,' + speed + 'px,0px)'
            } else {
                banner_parallax.style.transform = 'translate3d(0px,0px,0px)'
            }


            var flex1 = $('.index2').position().top - (clientHeight / 3)
            if (scrollTop >= flex1) {
                var flex1_speed = (scrollTop - flex1) * -0.02
                var flex1_speed2 = (scrollTop - flex1) * +0.1
                $('.index2 .wrap .fist:first-child .flex:first-child').css('transform', 'translate3d(0px,' + flex1_speed + 'px,0px)')
                $('.index2 .wrap .fist:first-child .flex:nth-child(2)').css('transform', 'translate3d(0px,' + flex1_speed2 + 'px,0px)')
            }

            var flex2 = $('.index2').position().top + $('.index2 .wrap .fist:first-child').height()
            if (scrollTop >= flex2) {
                var flex2_speed = (scrollTop - flex2) * -0.02
                var flex2_speed2 = (scrollTop - flex2) * +0.1
                $('.index2 .wrap .fist:last-child .flex:first-child').css('transform', 'translate3d(0px,' + flex2_speed + 'px,0px)')
                $('.index2 .wrap .fist:last-child .flex:nth-child(2)').css('transform', 'translate3d(0px,' + flex2_speed2 + 'px,0px)')
            }


            var index4_h = clientHeight + 7000
            $('.index4').css('height', index4_h + 'px')
            var index4_start = $('.index4').position().top
            var v = (scrollTop - index4_start) / 5000 * -8
            var px = $('.index4 .bg').height() - clientHeight
            var y = (scrollTop - index4_start) / (index4_h - clientHeight) * -px
            if (scrollTop >= index4_start) {
                $('.index4 .mask').css('animation-delay', v + 's')
                $('.index4 .bg').css('transform', 'translateY(' + y + 'px)')
            } else if (scrollTop <= index4_start) {
                $('.index4 .mask').css('animation-delay', '0')
                $('.index4 .bg').css('transform', 'translateY(0px)')
            }
            if (scrollTop >= $('.index4').next().position().top - clientHeight) {
                $('.index4 .mask').css('animation-delay', '-8s')
                $('.index4 .bg').css('transform', 'translateY(' + (-px) + 'px)')
            }


            // hide
            if (scrollTop >= clientHeight) {
                $('.banner .parallax').hide()
            } else {
                $('.banner .parallax').show()
            }
        }

        if (document.querySelector('#caseInfo_zg')) {
            var zg8_img_l = $('.pro_zg8 .wrap .content .img').length
            var zg8_h = clientHeight * zg8_img_l

            $('.pro_zg8').css('height', zg8_h + 'px')

            var s = [];

            let scrollX, scrollXHeight, Horizontal

            function common_x(x, all, allW) {
                scrollX = x
                Horizontal = all
                var wid = $(allW).width()

                scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                Horizontal.style.height = scrollXHeight + 'px'

                window.addEventListener('resize', function () {
                    scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                    Horizontal.style.height = scrollXHeight + 'px'
                });
            }

            common_x(document.querySelector('.pro_zg7 .height .fix .content .wrap_x'), document.documentElement.querySelector('.pro_zg7 .height'), $('.pro_zg7 .height .fix .content'))


            function common_x_scroll(scrollTop, all, start) {
                var x_end = $(all).parents('section').next().position().top - clientHeight
                if (scrollTop > start && scrollTop < x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
                } else if (scrollTop <= start) {
                    $(scrollX).css('transform', 'translate3d(0px, 0px, 0px)')
                }
                if (scrollTop >= x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollXHeight - clientHeight) + 'px, 0px, 0px)')
                }
            }

            $('.position_translate:nth-child(2)').hover(function () {
                $('.pro_zg5 .wrap .img').addClass('right')
            }, function () {
                $('.pro_zg5 .wrap .img').removeClass('right')
            })


            var position = $('.pro_zg7 .height').position().top
            var end = $('.height').height() - clientHeight
            if (scrollTop >= position) {
                $('.pro_zg7 .height .fix').css('transform', 'translateY(' + (scrollTop - position) + 'px)')
            } else if (scrollTop <= position) {
                $('.pro_zg7 .height .fix').css('transform', 'translateY(0px)')
            }
            if (scrollTop >= $('.pro_zg7').next().position().top - clientHeight) {
                $('.pro_zg7 .height .fix').css('transform', 'translateY(' + end + 'px)')
            }

            common_x_scroll(scrollTop, $('.pro_zg7 .height'), position)

            //
            var zg8_start = $('.pro_zg8').position().top + (parseInt($('.pro_zg8 .fix').css('top')) + $('.pro_zg8 .wrap .title').height())
            var zg8_end = $('.pro_zg8').height() - clientHeight - (parseInt($('.pro_zg8 .fix').css('top')) + $('.pro_zg8 .wrap .title').height())

            if (clientWidth>1920) {
                zg8_start = $('.pro_zg8').position().top
                zg8_end = $('.pro_zg8').height() - clientHeight
            }

            if (scrollTop >= zg8_start && scrollTop <= $('.pro_zg8').next().position().top - clientHeight) {

                $('.pro_zg8 .fix').css('transform', 'translateY(' + (scrollTop - zg8_start) + 'px)')
            } else if (scrollTop <= zg8_start) {
                $('.pro_zg8 .fix').css('transform', 'translateY(0px)')
            }

            if (scrollTop >= $('.pro_zg8').next().position().top - clientHeight) {
                $('.pro_zg8 .fix').css('transform', 'translateY(' + zg8_end + 'px)')
            }

            $('.pro_zg8 .wrap .content .img:first-child').addClass('nb')
            $('.pro_zg8 .wrap .content .img:nth-child(n+2)').each(function (i, e) {
                var img_start = (i * (clientHeight - (parseInt($('.pro_zg8 .fix').css('top')) + $('.pro_zg8 .wrap .title').height()))) + zg8_start
                var y = 100 + (scrollTop - img_start) / clientHeight * -100
                if (scrollTop >= img_start && scrollTop <= img_start + clientHeight - ((i + 1) * 20)) {
                    $(e).css({
                        'transform': 'translateY(' + y + 'vh)',
                    })
                } else if (scrollTop <= img_start) {
                    $(e).css({
                        'transform': 'translateY(100vh)',
                    })
                }
                var e_ = (i + 1) * 20

                s[i] = 1 - ((zg8_img_l - 1) - i) * 0.025
                if (scrollTop >= img_start + clientHeight - ((i + 1) * 20)) {
                    $(e).addClass('nb')
                    $(e).css({
                        'transform': 'translateY(' + e_ + 'px)',
                    })
                } else {
                    $(e).removeClass('nb')
                }
                $('.pro_zg8 .wrap .content .img').each(function (index) {
                    let scale = s[zg8_img_l - $('.pro_zg8 .wrap .content .img.nb').length + index] == undefined ? 1 : s[zg8_img_l - $('.pro_zg8 .wrap .content .img.nb').length + index]
                    $('.pro_zg8 .wrap .content .img').eq(index).find('img').css({
                        'transform': 'scale(' + scale + ')',
                        opacity: 1 - ($('.pro_zg8 .wrap .content .img.nb').length - index - 1) * 0.4
                    })
                })
            })


            var b = true;
            var a = $('.pro_zg8 .wrap .content .jump').offset().top - (clientHeight / 2)
            if (scrollTop >= a) {
                if (b) {
                    $('.pro_zg8 .wrap .content .jump').addClass('on')
                    b = false
                }
            }
        }

        if (document.querySelector('#caseInfo_xs')) {
            var lw3 = $('.sec2 .scroll')
            var data_h = parseInt(lw3.attr('data-h'))
            lw3.css('height',clientHeight + data_h + 'px')

            let w =  $('.sec8 .crosswise').width() - (($(window).width()-$('.sec8 .fix').width())/2)
            $('.sec8').css('height',w + 'px')

            var flex_ = $('.sec1 .img').position().top - $(window).height()
            if (scrollTop>flex_) {
                let img_ = -(scrollTop - flex_)*0.08
                $('.sec1 .img img').css('transform','translateY(' + img_ + 'px)')
            }
            let h = $('.sec2 .scroll').position().top
            let scale = (scrollTop-h)/data_h*(1-0.72) +0.72
            let h2  = $('.sec3').position().top - $(window).height()
            if (scrollTop>h && scrollTop<h2) {
                $('.sec2 .fix .img>img').css('transform','scale(' + scale + ')')
                $('.sec2 .wrap .fix').css('transform','translateY(' + (scrollTop-h) + 'px)')
                $('.sec2 .fix .img .img_text').removeClass('on')
            }else if (scrollTop>h2) {
                $('.sec2 .fix .img>img').css('transform','scale(1)')
                $('.sec2 .fix .img .img_text').addClass('on')
            }else if (scrollTop<h) {
                $('.sec2 .fix .img>img').css('transform','scale(0.72)')
            }


            let h1 = $('.sec4').position().top - 100
            let h3 = h1 + $('.sec4 .wrap').height() - 100 - $('.sec4 .wrap .left').height()
            if (scrollTop>h1 && scrollTop<h3) {
                $('.sec4 .wrap .left').css('transform','translateY(' + (scrollTop-h1) + 'px)')
            }else if(scrollTop<h1) {
                $('.sec4 .wrap .left').css('transform','translateY(0px)')
            }

            let h4 = $('.sec7 .wrap .imgList').position().top - $(window).height()
            let h5 = $('.sec8').position().top - $(window).height()
            let scroll1 = (scrollTop-h4)/(h5-h4) * 80
            if (scrollTop>h4 && scrollTop<h5) {
                $('.sec7 .wrap .imgList .left').css('transform','translateY(' + (-scroll1) + 'px)')
                $('.sec7 .wrap .imgList .right').css('transform','translateY(' + (scroll1) + 'px)')
            }

            let h6 = $('.sec8').position().top
            let h7 = $('.sec9').position().top - $(window).height()
            if (scrollTop>h6 && scrollTop<h7) {
                $('.sec8 .fix').css('transform','translateY(' + (scrollTop-h6) + 'px)')
                $('.sec8 .crosswise').css('transform','translateX(' + (-(scrollTop-h6)) + 'px)')
            }else if (scrollTop<h6) {
                $('.sec8 .fix').css('transform','translateY(0px)')
                $('.sec8 .crosswise').css('transform','translateX(0px)')
            }else if (scrollTop>h7) {
                $('.sec8 .fix').css('transform','translateY(' + (w-$(window).height()) + 'px)')
                $('.sec8 .crosswise').css('transform','translateX(' + (-(w-$(window).height())) + 'px)')
            }

            let h8 = $('.sec9').position().top - $(window).height()
            let h9 = $('.sec10').position().top - $(window).height()
            if (scrollTop>h8 && scrollTop<h9) {
                let scroll2 = (scrollTop-h8)/(h9-h8) * 100
                let scroll3 = (scrollTop-h8)/(h9-h8) * 50
                $('.sec9 .wrap .img_box .img:nth-child(1)').css('transform','translateY(' + (-scroll2) + 'px)')
                $('.sec9 .wrap .img_box .img:nth-child(2)').css('transform','translateY(' + scroll2 + 'px)')
                $('.sec9 .wrap .img_box .img:nth-child(3)').css('transform','translateY(' + scroll3 + 'px)')
            }

            let h10 = $('.sec10 .wrap .sec10_box').position().top - $(window).height()
            let h11 = $('.sec11').position().top - $(window).height()
            if (scrollTop>h10 && scrollTop<h11) {
                let line = (scrollTop-h10)/(h11-h10) * 3150 - 3150
                $('.sec10 .wrap .sec10_box .box_line svg .st01').css('stroke-dashoffset',line)
            }

            let h12 = $('.sec11 .wrap .mobile .mobile_box').position().top - $(window).height()
            let h13 = $('.sec12').position().top - $(window).height()
            if (scrollTop>h12 && scrollTop<h13) {
                let scroll3 = (scrollTop-h12)/(h13-h12) * 348
                $('.sec11 .wrap .mobile .mobile_box .item:nth-child(1)').css('transform','translateY(' + scroll3 + 'px)')
                $('.sec11 .wrap .mobile .mobile_box .item:nth-child(3)').css('transform','translateY(' + (-scroll3) + 'px)')
            }


        }

        if (document.querySelector('#caseInfo_zgsy')) {
            var w1 = $(window).height()*0.402/9*16*5 + 72*4
            $('.sec8 .scroll .fix .flex:nth-child(2)').css('left', ($(window).width() - w1)+'px')
            $('.sec8 .scroll').css('height',(w1 - $(window).width() + $(window).height())+'px')

            var h11 = ($(window).width()*0.9 - 74)*0.49/637*318*5 + 72*4
            $('.sec5 .main .wrap .scroll_box').css('height',(h11)+'px')
            $('.sec5 .main .wrap .scroll .item:nth-child(2)').css('top','calc(100vh - '+ (h11) +'px)')

            var arr = []
            window.addEventListener('load',function () {
                $('.sticky').each(function (i,e) {
                    var data_top = $(e).attr('data-top')
                    data_top ? data_top = data_top*1 : data_top = 0
                    setTimeout(function () {
                        var top = $(e).offset().top - data_top
                        arr.push(top)
                    },100)
                })
            })

            // scrollTop
            let h = $('.sec1').position().top - $(window).height()
            if (scrollTop > h) {
                $('.sec1 .bg img').css('transform', 'translateY(' + ((scrollTop - h)*0.3) + 'px)')
            }
            let h1 = $('.sec2 .scroll').position().top
            let h2 = $('.sec3').position().top - $(window).height()
            let r1 = (scrollTop - h1)/(h2 - h1) * 120 - 120
            let y1 = (scrollTop - h1)/(h2 - h1) * -145
            let x1 = (scrollTop - h1)/(h2 - h1) * 125
            let y2 = (scrollTop - h1)/(h2 - h1) * 70
            let y3 = (scrollTop - h1)/(h2 - h1) * 140
            let sX = (scrollTop - h1 - (h2 - h1)/2)/((h2 - h1)/2) * 1
            if (scrollTop > h1 && scrollTop < h2) {
                $('.sec2 .scroll .fix').css('transform', 'translateY(' + (scrollTop - h1) + 'px)')
                $('.three_circles').css('transform','rotateZ(' + r1 + 'deg)')
                $('.three_circles .three_circle:nth-child(1)').css('transform','translate(0%,' + y1 + '%)')
                $('.three_circles .three_circle:nth-child(3)').css('transform','translate('+ x1 +'%,' + y2 + '%)')
                $('.three_circles .three_circle:nth-child(5)').css('transform','translate(-'+ x1 +'%,' + y2 + '%)')
                if (scrollTop < (h1+(h2-h1)/2)) {
                    $('.three_circles .three_line:nth-child(2)').css('transform','rotateZ(60deg) translate(0px, -' + y3 + 'px) scaleX(0)')
                    $('.three_circles .three_line:nth-child(4)').css('transform','rotateZ(0deg) translate(0px, ' + y3 + 'px) scaleX(0)')
                    $('.three_circles .three_line:nth-child(6)').css('transform','rotateZ(-60deg) translate(0px, -' + y3 + 'px) scaleX(0)')
                }else if (scrollTop > (h1+(h2-h1)/2)) {
                    $('.three_circles .three_line:nth-child(2)').css('transform','rotateZ(60deg) translate(0px, -' + y3 + 'px) scaleX(' + sX + ')')
                    $('.three_circles .three_line:nth-child(4)').css('transform','rotateZ(0deg) translate(0px, ' + y3 + 'px) scaleX(' + sX + ')')
                    $('.three_circles .three_line:nth-child(6)').css('transform','rotateZ(-60deg) translate(0px, -' + y3 + 'px) scaleX(' + sX + ')')
                }
                if (scrollTop > (h1+(h2-h1)/4*3)) {
                    $('.three_circles .three_circle .three_circle_text').addClass('on')
                }else  {
                    $('.three_circles .three_circle .three_circle_text').removeClass('on')
                }
            } else if (scrollTop < h1) {
                $('.sec2 .scroll .fix').css('transform', 'translateY(0px)')
                $('.three_circles').css('transform','rotateZ(-120deg)')
                $('.three_circles .three_circle').css('transform','translate(0%, 0%)')
            } else if (scrollTop > h2) {
                $('.three_circles').css('transform','rotateZ(0deg)')
                $('.three_circles .three_circle:nth-child(1)').css('transform','translate(0%, -145%)')
                $('.three_circles .three_circle:nth-child(3)').css('transform','translate(125%, 70%)')
                $('.three_circles .three_circle:nth-child(5)').css('transform','translate(-125%, 70%)')
            }
            $('.sticky').each(function (i,e) {
                var v = scrollTop - arr[i]
                var end = $(e).parents('section').next().position().top
                var v_end = $(e).parents('section').height()
                if (scrollTop >= arr[i] && scrollTop <= end) {
                    $(e).css('transform','translateY('+v+'px)')
                }else if (scrollTop < arr[i]) {
                    $(e).css('transform','translateY(0px)')
                }

                if (scrollTop >= end) {
                    $(e).css('transform','translateY('+v_end+'px)')
                }
            })

            let h3 = $('.sec5 .scroll_box').position().top
            let h4 = $('.sec6').position().top - $(window).height()
            if (scrollTop > h3 && scrollTop < h4) {
                $('.sec5 .scroll_box .scroll').css('transform', 'translateY(' + (scrollTop - h3) + 'px)')
                $('.sec5 .scroll_box .scroll .item:nth-child(1)').css('transform', 'translateY(-' + (scrollTop - h3) + 'px)')
                $('.sec5 .scroll_box .scroll .item:nth-child(2)').css('transform', 'translateY(' + (scrollTop - h3) + 'px)')
            }else if (scrollTop < h3 ) {
                $('.sec5 .scroll_box .scroll').css('transform', 'translateY(0px)')
                $('.sec5 .scroll_box .scroll .item:nth-child(1)').css('transform', 'translateY(0px)')
                $('.sec5 .scroll_box .scroll .item:nth-child(2)').css('transform', 'translateY(0px)')
            }

            let h5 = $('.sec8 .scroll').position().top
            let h6 = $('.sec9').position().top - $(window).height()
            if (scrollTop > h5 && scrollTop < h6) {
                $('.sec8 .scroll .fix').css('transform', 'translateY(' + (scrollTop - h5) + 'px)')
                $('.sec8 .scroll .fix .flex:nth-child(1)').css('transform', 'translateX(-' + (scrollTop - h5) + 'px)')
                $('.sec8 .scroll .fix .flex:nth-child(2)').css('transform', 'translateX(' + (scrollTop - h5) + 'px)')
            }else if (scrollTop < h5 ) {
                $('.sec8 .scroll .fix').css('transform', 'translateY(0px)')
                $('.sec8 .scroll .fix .flex:nth-child(1)').css('transform', 'translateX(0px)')
                $('.sec8 .scroll .fix .flex:nth-child(2)').css('transform', 'translateX(0px)')
            }else if (scrollTop > h6) {
                $('.sec8 .scroll .fix .flex:nth-child(1)').css('transform', 'translateX(-' + (w1 - $(window).width()) + 'px)')
                $('.sec8 .scroll .fix .flex:nth-child(2)').css('transform', 'translateX(' + (w1 - $(window).width()) + 'px)')
            }
            // scrollTop



            var container = document.getElementById('container');
            var draggableEl = document.getElementById('draggableEl');
            var width = $('.sec3 .img_box').width()
            var isDragging = false;
            var initialX = 0, initialLeft = 0;
            var minLeft = 0, maxLeft = container.clientWidth - draggableEl.clientWidth;

            draggableEl.addEventListener('mousedown', function (e) {
                // 更新初始位置和拖拽状态
                isDragging = true;
                initialX = e.clientX;
                initialLeft = parseInt(window.getComputedStyle(draggableEl).left);

                // 防止选中文本的默认行为
                e.preventDefault();
            });

            document.addEventListener('mousemove', function (e) {
                if (isDragging) {
                    // 计算鼠标的位移距离
                    var offsetX = e.clientX - initialX;

                    // 根据容器范围限制元素的位置
                    var newLeft = initialLeft + offsetX;
                    newLeft = Math.max(minLeft, newLeft);
                    newLeft = Math.min(width, newLeft);

                    // console.log(newLeft-initialLeft,newLeft,-(newLeft-initialLeft)+newLeft/2)

                    $('.sec3 .imgbox2').width(width - newLeft + 'px')

                    // 更新元素的位置
                    draggableEl.style.left = newLeft + 'px';
                }
            });

            document.addEventListener('mouseup', function () {
                isDragging = false;
            });

        }

        if (document.querySelector('#caseInfo_mk')) {
            var flex_ = $('.pro_mk4').position().top - clientHeight
            if(scrollTop>flex_){
                var value = (scrollTop - flex_) *0.3
                $('.pro_mk4 .wrap .flex').css('transform','translateX(-'+value+'px)')
                $('.pro_mk4 .wrap .flex:nth-child(2)').css('transform','translateX('+value+'px)')
            }

            var mk_item = $('.public_pro .mk_content .flex .item')
            var st = $('.public_pro .mk_content').position().top
            var i_length = mk_item.length
            var index = Math.floor((scrollTop - st) / (($('.mk_content').height() - clientHeight) / i_length))

            index <= 0 ? index = 0 : index
            index >= (i_length-1) ? index = (i_length-1) : index



            if (scrollTop >=st && scrollTop<=$('.public_pro').next().position().top - clientHeight) {
                mk_item.removeClass('on').eq(index).addClass('on')
                mk_item.eq(index).prevAll().addClass('on')
                $('.public_pro .mk_content .mk_fix').css('transform','translateY('+ (scrollTop-st) +'px)')
            }else if (scrollTop < st) {
                $('.public_pro .mk_content .mk_fix').css('transform','translateY(0px)')
            }

            if (scrollTop>=$('.public_pro').next().position().top - clientHeight) {
                $('.public_pro .mk_content .mk_fix').css('transform','translateY('+ ($('.mk_content').height()-clientHeight) +'px)')
            }

            var mk10_st = $('.pro_mk10 .wrap .height').position().top
            if (scrollTop >=mk10_st && scrollTop<=$('.pro_mk10').next().position().top - clientHeight) {
                $('.pro_mk10 .wrap .height .hei_fix').css('transform','translateY('+ (scrollTop - mk10_st) +'px)')
            }else if (scrollTop <= mk10_st) {
                $('.pro_mk10 .wrap .height .hei_fix').css('transform','translateY(0px)')
            }
            if (scrollTop>=$('.pro_mk10').next().position().top - clientHeight) {
                $('.public_pro .mk_content .mk_fix').css('transform','translateY('+ ($('.pro_mk10 .wrap .height').height()-clientHeight) +'px)')
            }

            var swiper_index = Math.floor((scrollTop - mk10_st) / (($('.pro_mk10 .wrap .height').height() - clientHeight) / mk_len))

            swiper_index <= 0 ? swiper_index = 0 : swiper_index
            swiper_index >= (i_length-1) ? swiper_index = (i_length-1) : swiper_index
            pro_mk10.slideTo(swiper_index)


            var mk5_st = $('.pro_mk5 .wrap .content3').position().top
            var mk5_index = Math.floor((scrollTop - mk5_st) / (($('.pro_mk5 .wrap .content3').height() - clientHeight) / i_length))
            mk5_index <= 0 ? mk5_index = 0 : index
            mk5_index >= (mk5_len-1) ? mk5_index = (mk5_len-1) : mk5_index

            var mk5_item = $('.pro_mk5 .wrap .content3 .grid .item')
            if (scrollTop >= mk5_st && scrollTop<=$('.pro_mk5').next().position().top - clientHeight) {
                mk5_item.removeClass('on').eq(mk5_index).addClass('on')
                mk5_item.eq(mk5_index).prevAll().addClass('on')
                $('.pro_mk5 .wrap .content3 .mk_fix').css('transform','translateY('+ (scrollTop - mk5_st) +'px)')
            }else if (scrollTop <= mk5_st) {
                $('.pro_mk5 .wrap .content3 .mk_fix').css('transform','translateY(0px)')
            }

            if (scrollTop >= $('.pro_mk5').next().position().top - clientHeight) {
                $('.public_pro .mk_content .mk_fix').css('transform','translateY('+ ($('.pro_mk5 .wrap .content3').height()-clientHeight) +'px)')
            }


            $('.sticky').each(function (i,e) {
                var v = scrollTop - st_arr[i]
                var end = $(e).parents('section').next().position().top
                var v_end = $(e).parents('section').height()
                if (scrollTop >= st_arr[i] && scrollTop <= end) {
                    $(e).css('transform','translateY('+v+'px)')
                }else if (scrollTop < st_arr[i]) {
                    $(e).css('transform','translateY(0px)')
                }

                if (scrollTop >= end) {
                    $(e).css('transform','translateY('+v_end+'px)')
                }
            })

            console.log('#')
            // scrollTop
        }

        if (document.querySelector('#caseInfo_xy')) {

            var lw11 = $('.pro_xy6')
            var h11 = parseInt(lw11.attr('data-h'))
            lw11.css('height',clientHeight + (h11*$('.pro_xy6 .wrap .content .left .list').length) + 'px')

            let scrollX, scrollXHeight, Horizontal

            function common_x(x, all, allW) {
                scrollX = x
                Horizontal = all
                var wid = $(allW).width()

                scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                Horizontal.style.height = scrollXHeight + 'px'

                window.addEventListener('resize', function () {
                    scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                    Horizontal.style.height = scrollXHeight + 'px'
                });
            }

            common_x(document.querySelector('.pro_xy3 .fix .wrap .wrap_x'), document.documentElement.querySelector('.pro_xy3'), $('.pro_xy3 .fix .wrap'))


            function common_x_scroll(scrollTop, all, start) {
                var x_end = $(all).next().position().top - clientHeight
                if (scrollTop > start && scrollTop < x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
                } else if (scrollTop <= start) {
                    $(scrollX).css('transform', 'translate3d(0px, 0px, 0px)')
                }
                if (scrollTop >= x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollXHeight - clientHeight) + 'px, 0px, 0px)')
                }
            }


            Matter.Mouse.setOffset(mouse,Matter.Vector.create(0,scrollTop))

            common_x_scroll(scrollTop, $('.pro_xy3'), $('.pro_xy3').position().top)

            var list = $('.pro_xy6 .left .list')
            var st = $('.pro_xy6').position().top
            var i_length = list.length
            var index = Math.floor((scrollTop - st) / (($('.pro_xy6').height() - clientHeight) / i_length))
            index <= 0 ? index = 0 : index
            index >= (i_length-1) ? index = (i_length-1) : index

            if (scrollTop >= st && scrollTop <= $('.pro_xy6').next().position().top - clientHeight) {
                $('.pro_xy6 .wrap .content .left .list').removeClass('on').eq(index).addClass('on')
                $('.pro_xy6 .wrap .content .right img').removeClass('on').eq(index).addClass('on')
            }


            if (scrollTop >= $('.pro_xy2').position().top) {
                two.play()
            }

            console.log(xy_arr)
            $('.sticky').each(function (i,e) {
                var v = scrollTop - xy_arr[i]
                var end = $(e).parents('section').next().position().top
                var v_end = $(e).parents('section').height()
                if (scrollTop >= xy_arr[i] && scrollTop <= end) {
                    $(e).css('transform','translateY('+v+'px)')
                }else if (scrollTop < xy_arr[i]) {
                    $(e).css('transform','translateY(0px)')
                }

                if (scrollTop >= end) {
                    $(e).css('transform','translateY('+v_end+'px)')
                }
            })
        }

        if (document.querySelector('#caseInfo_hm')) {
            let scroll = window.pageYOffset;
            let index=0
            for(var i in spList){
                if(scroll>spList[index]+$(window).height()){
                    index=i
                }
            }
            let sp=$('.sp').eq(index)
            let distance=(scroll-spList[index])/$(window).height()*2
            distance=distance<0?0:distance>1?1:distance
            let num=sp.data('num')

            if($(window).width()<=1024){
                if($(window).width()<=540){
                    return
                }
                num=num/1024*100
                sp.children('.item').eq(0).css("transform","translateY("+(num/2-num*distance)+"vw)")
                sp.children('.item').eq(1).css("transform","translateY("+(num*distance-num/2)+"vw)")
                return
            }
            if(scroll>spList[index]&&scroll<spList[index]+$(window).height()){
                sp.children('.item').eq(0).css("transform","translateY("+(num/2-num*distance)+"px)")
                sp.children('.item').eq(1).css("transform","translateY("+(num*distance-num/2)+"px)")
            }
        }

        if (document.querySelector('#caseInfo_lw')) {
            let scrollX, scrollXHeight, Horizontal


            function common_x(x, all, allW) {
                scrollX = x
                Horizontal = all
                var wid = $(allW).width()

                scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                Horizontal.style.height = scrollXHeight + 'px'

                window.addEventListener('resize', function () {
                    scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                    Horizontal.style.height = scrollXHeight + 'px'
                });
            }

            common_x(document.querySelector('.pro_lw10 .fix .wrap .wrap_x'), document.documentElement.querySelector('.pro_lw10'), $('.pro_lw10 .fix .wrap'))


            function common_x_scroll(scrollTop, all, start) {
                var x_end = $(all).next().position().top - clientHeight
                if (scrollTop > start && scrollTop < x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
                } else if (scrollTop <= start) {
                    $(scrollX).css('transform', 'translate3d(0px, 0px, 0px)')
                }
                if (scrollTop >= x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollXHeight - clientHeight) + 'px, 0px, 0px)')
                }

            }

            var flex_ = $('.pro_lw2').position().top
            if(scrollTop>flex_ && scrollTop <= $('.pro_lw2').next().position().top-clientHeight){
                var value = (scrollTop - flex_) *0.32
                $('.pro_lw2 .fix .matter:first-child > div').css('transform','translateY(-'+value+'px)')
                $('.pro_lw2 .fix .matter:nth-child(2) > div').css('transform','translateY('+value+'px)')
            }else if (scrollTop <= flex_) {
                $('.pro_lw2 .fix .matter:first-child > div').css('transform','translateY(0px)')
                $('.pro_lw2 .fix .matter:nth-child(2) > div').css('transform','translateY(0px)')
            }
            common_x_scroll(scrollTop, $('.pro_lw10'), $('.pro_lw10').position().top)



            var list = $('.pro_lw11 .left .list')
            var st = $('.pro_lw11').position().top
            var i_length = list.length
            var index = Math.floor((scrollTop - st) / (($('.pro_lw11').height() - clientHeight) / i_length))
            index <= 0 ? index = 0 : index
            index >= (i_length-1) ? index = (i_length-1) : index

            if (scrollTop >= st && scrollTop <= $('.pro_lw11').next().position().top - clientHeight) {
                $('.pro_lw11 .wrap .content .left .list').removeClass('on').eq(index).addClass('on')
                $('.pro_lw11 .wrap .content .right img').removeClass('on').eq(index).addClass('on')
            }

            var img_parallax = $('.pro_lw .wrap .picture img')
            var img_start = img_parallax.offset().top - clientHeight
            var speed = (scrollTop - img_start) * -0.15
            if (scrollTop >= img_start) {
                img_parallax.css('transform','translateY('+ speed +'px)')
            }
        }

        if (document.querySelector('#caseInfo_ht')) {

            console.log(ht_arr)
            $('.sticky').each(function (i,e) {
                var v = scrollTop - ht_arr[i]
                var end = $(e).parents('section').next().position().top
                var v_end = $(e).parents('section').height()
                if (scrollTop >= ht_arr[i] && scrollTop <= end) {
                    $(e).css('transform','translateY('+v+'px)')
                }else if (scrollTop < ht_arr[i]) {
                    $(e).css('transform','translateY(0px)')
                }

                if (scrollTop >= end) {
                    $(e).css('transform','translateY('+v_end+'px)')
                }
            })
        }

        if (document.querySelector('#caseInfo_apl')) {
            let scrollX, scrollXHeight, Horizontal

            function common_x(x, all, allW) {
                scrollX = x
                Horizontal = all
                var wid = $(allW).width()

                scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                Horizontal.style.height = scrollXHeight + 'px'

                window.addEventListener('resize', function () {
                    scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                    Horizontal.style.height = scrollXHeight + 'px'
                });
            }

            common_x(document.querySelector('.pro_apl8 .fix .wrap .wrap_x'), document.documentElement.querySelector('.pro_apl8'), $('.pro_apl8 .fix .wrap'))


            function common_x_scroll(scrollTop, all, start) {
                var x_end = $(all).next().position().top - clientHeight
                if (scrollTop > start && scrollTop < x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
                } else if (scrollTop <= start) {
                    $(scrollX).css('transform', 'translate3d(0px, 0px, 0px)')
                }
                if (scrollTop >= x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollXHeight - clientHeight) + 'px, 0px, 0px)')
                }

            }

            console.log(apl_arr)

            $('.sticky').each(function (i,e) {
                var v = scrollTop - apl_arr[i]
                var end = $(e).parents('section').next().position().top
                var v_end = $(e).parents('section').height()
                if (scrollTop >= apl_arr[i] && scrollTop <= end) {
                    $(e).css('transform','translateY('+v+'px)')
                }else if (scrollTop < apl_arr[i]) {
                    $(e).css('transform','translateY(0px)')
                }

                if (scrollTop >= end) {
                    $(e).css('transform','translateY('+v_end+'px)')
                }
            })

            common_x_scroll(scrollTop, $('.pro_apl8'), $('.pro_apl8').position().top)
        }

        if (document.querySelector('#caseInfo_yzzj')) {
            var pathL = $('.pro_zj4 .wrap .r .picture')
            var index = $('.pro_zj4 .wrap .r .cut div:first-child').index()
            if (scrollTop >= pathL[0].offsetTop - clientHeight) {
                if (val) {
                    $('.pro_zj4 .wrap .r .picture .matter').eq(index).addClass('on')
                    $('.pro_zj4 .wrap .r .cut div').eq(index).addClass('on')

                    var timer_index = 0;
                    var timer_length = $('.pro_zj4 .wrap .r .cut div').length
                    timer = setInterval(function () {
                        timer_index += 1
                        if (timer_index >= timer_length) {
                            timer_index = 0
                        }

                        $('.pro_zj4 .wrap .r .cut div').removeClass('on').eq(timer_index).addClass('on')
                        $('.pro_zj4 .wrap .r .picture .matter').removeClass('on').eq(timer_index).addClass('on')
                    },5000)
                    val = false;
                }

            }

            var position_content = $('.pro_zj13').position().top
            if (scrollTop >= position_content) {
                $('.pro_zj13 .position_content').addClass('on')
            }
        }

        if (document.querySelector('#caseInfo_lwgj')) {
            let scrollX, scrollXHeight, Horizontal

            function common_x(x, all, allW) {
                scrollX = x
                Horizontal = all
                var wid = $(allW).width()

                scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                Horizontal.style.height = scrollXHeight + 'px'

                window.addEventListener('resize', function () {
                    scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                    Horizontal.style.height = scrollXHeight + 'px'
                });
            }

            common_x(document.querySelector('.pro_en3 .fix .wrap .wrap_x'), document.documentElement.querySelector('.pro_en3'), $('.pro_en3 .fix .wrap'))

            function common_x_scroll(scrollTop, all, start) {
                var x_end = $(all).next().position().top - clientHeight
                if (scrollTop > start && scrollTop < x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
                } else if (scrollTop <= start) {
                    $(scrollX).css('transform', 'translate3d(0px, 0px, 0px)')
                }
                if (scrollTop >= x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollXHeight - clientHeight) + 'px, 0px, 0px)')
                }

            }

            var mk5_st = pro_en2.position().top
            var index = Math.floor((scrollTop - mk5_st) / ((pro_en2.height() - clientHeight) / h_len))
            index <= 0 ? index = 0 : index
            index >= (h_len-1) ? index = (h_len-1) : index
            if (scrollTop>=mk5_st && scrollTop<=mk5_st+(pro_en2.height()-clientHeight)) {
                $('.pro_en2 .fix .wrap .content .right .jump .circle[data-index="'+ index +'"]').click()
                $('.pro_en2 .fix .wrap .content .left .item').removeClass('on').eq(index).addClass('on')
            }

            common_x_scroll(scrollTop, $('.pro_en3'), $('.pro_en3').position().top)


            var line_s = $('.pro_en8 .wrap .content2').position().top - (clientHeight/2)
            var line = (scrollTop - line_s) / ($('.pro_en8 .wrap .content2').height())
            if (scrollTop >= line_s && scrollTop <= line_s + ($('.pro_en8 .wrap .content2').height())) {
                $('.pro_en8 .wrap .content2 .line div').css('transform','scaleY('+ line +')')
            }else if (scrollTop <= line_s) {
                $('.pro_en8 .wrap .content2 .line div').css('transform','scaleY(0)')
            }
            if (scrollTop >= line_s + ($('.pro_en8 .wrap .content2').height())) {
                $('.pro_en8 .wrap .content2 .line div').css('transform','scaleY(1)')
            }
        }

        if (document.querySelector('#caseInfo_pdg')) {
            $('.pro_pdg10 .wrap .content .img:not(:first-child)').each(function (i,e) {
                var fix = $('.pro_pdg10').position().top
                var start = (i * clientHeight) + fix
                var y = 100 + (scrollTop - start) / clientHeight * -100
                if (scrollTop >= start && scrollTop <= start + clientHeight) {
                    $(e).css({
                        'transform': 'translateY(' + y + 'vh)',
                    })
                } else if (scrollTop <= start) {
                    $(e).css({
                        'transform': 'translateY(100vh)',
                    })
                }
                if (scrollTop >= start + clientHeight) {
                    $('.pro_pdg10 .wrap .content .img').eq(i).addClass('opacity')
                    $(e).css({
                        'transform': 'translateY(0px)',
                    })
                }else {
                    $('.pro_pdg10 .wrap .content .img').eq(i).removeClass('opacity')
                }

                if (scrollTop >= start) {
                    $('.pro_pdg10 .fix').css({
                        'transform': 'translateY('+ (scrollTop - fix) +'px)',
                    })
                }
            })
        }

        if (document.querySelector('#caseInfo_zz')) {
            let scrollX, scrollXHeight, Horizontal
            let scrollX2, scrollXHeight2, Horizontal2

            function common_x(x, all, allW) {
                scrollX = x
                Horizontal = all
                var wid = $(allW).width()

                scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                Horizontal.style.height = scrollXHeight + 'px'

                window.addEventListener('resize', function () {
                    scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                    Horizontal.style.height = scrollXHeight + 'px'
                });
            }
            function common_x2(x, all, allW) {
                scrollX2 = x
                Horizontal2 = all
                var wid2 = $(allW).width()

                scrollXHeight2 = (scrollX2.clientWidth - wid2) + clientHeight
                Horizontal2.style.height = scrollXHeight2 + 'px'

                window.addEventListener('resize', function () {
                    scrollXHeight2 = (scrollX2.clientWidth - wid2) + clientHeight
                    Horizontal2.style.height = scrollXHeight2 + 'px'
                });
            }

            common_x(document.querySelector('.pro_zz6 .fix .wrap .wrap_x'), document.documentElement.querySelector('.pro_zz6'), $('.pro_zz6 .fix .wrap'))
            common_x2(document.querySelector('.pro_zz8 .fix .wrap .wrap_x'), document.documentElement.querySelector('.pro_zz8'), $('.pro_zz8 .fix .wrap'))

            function common_x_scroll(scrollTop, all, start) {
                var x_end = $(all).next().position().top - clientHeight
                if (scrollTop > start && scrollTop < x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
                } else if (scrollTop <= start) {
                    $(scrollX).css('transform', 'translate3d(0px, 0px, 0px)')
                }
                if (scrollTop >= x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollXHeight - clientHeight) + 'px, 0px, 0px)')
                }

            }
            function common_x_scroll2(scrollTop, all, start) {
                var x_end2 = $(all).next().position().top - clientHeight
                if (scrollTop > start && scrollTop < x_end2) {
                    $(scrollX2).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
                } else if (scrollTop <= start) {
                    $(scrollX2).css('transform', 'translate3d(0px, 0px, 0px)')
                }
                if (scrollTop >= x_end2) {
                    $(scrollX2).css('transform', 'translate3d(-' + (scrollXHeight2 - clientHeight) + 'px, 0px, 0px)')
                }

            }

            function count_size(e,start,end,num_end,scrollTop) {
                if (scrollTop > start && scrollTop <= end) {
                    $(e).css('transform', 'translate3d(0px, ' + (scrollTop - start) + 'px, 0px)')
                }else if (scrollTop < start){
                    $(e).css('transform', 'translate3d(0px,0px, 0px)')
                }
                if (scrollTop >= end) {
                    $(e).css('transform', 'translate3d(0px, '+ num_end +'px, 0px)')
                }
            }


            var start_ = $('.pro_zz2 .wrap .content').position().top + (clientHeight * 0.2)
            var img1 = -200 +  (scrollTop - start_) / clientHeight *200
            var img2 = 200 +  (scrollTop - start_) / clientHeight *-200
            img1 >=0 ? img1 = 0 : img1
            img2 <=0 ? img2 = 0 : img2
            if (scrollTop >= start_) {
                $('.pro_zz2 .wrap .content .img').css('transform','translateX('+ img1 +'px)')
                $('.pro_zz2 .wrap .content .img2').css('transform','translateX('+ img2 +'px)')
            }else if (scrollTop <= start_) {
                $('.pro_zz2 .wrap .content .img').css('transform','translateX(0)')
                $('.pro_zz2 .wrap .content .img2').css('transform','translateX(200px)')
            }


            common_x_scroll(scrollTop, $('.pro_zz6'), $('.pro_zz6').position().top)
            common_x_scroll2(scrollTop, $('.pro_zz8'), $('.pro_zz8').position().top)



            var e = $('.pro_zz11 .wrap .l')

            // 上边距
            var top_ = parseInt($('.pro_zz11 .wrap').css('margin-top'))

            // 下边距
            var bottom = parseInt($('.pro_zz11 .wrap').css('margin-bottom'))

            var h = clientHeight - e.height() - (top_+bottom)

            // 开始距离
            var start = $('.pro_zz11 .wrap .r').position().top - top_

            // 结束距离
            var end = $('.pro_zz11').next().position().top - clientHeight + h

            var num_end = $('.pro_zz11 .wrap .r').height() - e.height()

            count_size(e,start,end,num_end,scrollTop,top_,bottom)
        }

        if (document.querySelector('#caseInfo_bng')) {
            var scroll = scrollTop
            textmove(scroll)
            caseInfo(scroll)
            caseInfo1(scroll)
            imgmove(scroll)
        }

        if (document.querySelector('#caseInfo_ws_zl')) {
            var scroll = scrollTop
            var active=0;
            for(var i in topArray){
                if(scroll>=topArray[i]){
                    active=i;
                }
            }

            console.log(active)

            $('.section_4 .warp .left .Pentagon .item .circular').each(function(index,ele){
                let num=index-active*1
                console.log(num);
                $(ele).css('transform','rotate('+(num*-72)+'deg)')
            })
            $('.section_4 .warp .left .Pentagon').css('transform','rotate('+(active*-72)+'deg)')
            $('.section_4 .warp .left .Pentagon .center').css('transform','rotate('+(active*72)+'deg)')
            $('.section_4 .warp .left .Pentagon .item.active').removeClass('active')
            $('.section_4 .warp .left .Pentagon .item').eq(active).addClass('active')
        }

        if (document.querySelector('#caseInfo_nk')) {
            var lw3 = $('.sec1 .scroll')
            var data_h = parseInt(lw3.attr('data-h'))
            lw3.css('height',clientHeight + data_h + 'px')
            let h = $('.sec1 .scroll').position().top
            let scale = (scrollTop-h)/data_h*(1-0.72) +0.72
            let h1  = $('.sec2').position().top - $(window).height()
            if (scrollTop>h && scrollTop<h1) {
                $('.sec1 .fix .img>img').css('transform','scale(' + scale + ')')
                $('.sec1 .wrap .fix').css('transform','translateY(' + (scrollTop-h) + 'px)')
                $('.sec1 .fix .img_text').removeClass('on')
            }else if (scrollTop>h1) {
                $('.sec1 .fix .img>img').css('transform','scale(1)')
                $('.sec1 .fix .img_text').addClass('on')
            }else if (scrollTop<h) {
                $('.sec1 .fix .img>img').css('transform','scale(0.72)')
            }

            let h2 = $('.sec3 .scroll').position().top
            let h3  = $('.sec4').position().top - $('.sec3 .fix').height()
            if (scrollTop>h2 && scrollTop<h3) {
                $('.sec3 .fix').css('transform','translateY(' + (scrollTop-h2) + 'px)')
                $('.sec3 .fix_box').css('transform','translateX(-' + (scrollTop-h2) + 'px)')
            }else if (scrollTop>h3) {

            }else if (scrollTop<h2) {
                $('.sec3 .fix').css('transform','translateY(0px)')
            }

            let h4 = $('.sec4 .view_box').position().top - $(window).height()
            if (scrollTop>h4) {
                $('.sec4 .view_box .view_item:nth-child(1) .view').css('transform','translateX(-' + ((scrollTop-h4)*0.6) + 'px)')
                $('.sec4 .view_box .view_item:nth-child(2) .view').css('transform','translateX(' + ((scrollTop-h4)*0.6) + 'px)')
            }



            let h5 = $('.sec8 .scroll').position().top
            let h6 = $('.sec9').position().top - $(window).height()
            if (scrollTop > h5 && scrollTop < h6) {
                $('.sec8 .scroll .fix').css('transform', 'translateY(' + (scrollTop - h5) + 'px)')
                $('.sec8 .scroll .fix .flex:nth-child(1)').css('transform', 'translateX(-' + (scrollTop - h5) + 'px)')
                $('.sec8 .scroll .fix .flex:nth-child(2)').css('transform', 'translateX(' + (scrollTop - h5) + 'px)')
            }else if (scrollTop < h5 ) {
                $('.sec8 .scroll .fix').css('transform', 'translateY(0px)')
                $('.sec8 .scroll .fix .flex:nth-child(1)').css('transform', 'translateX(0px)')
                $('.sec8 .scroll .fix .flex:nth-child(2)').css('transform', 'translateX(0px)')
            }else if (scrollTop > h6) {
                $('.sec8 .scroll .fix .flex:nth-child(1)').css('transform', 'translateX(-' + (w1 - $(window).width()) + 'px)')
                $('.sec8 .scroll .fix .flex:nth-child(2)').css('transform', 'translateX(' + (w1 - $(window).width()) + 'px)')
            }

            console.log(nk_arr)
            $('.sticky').each(function (i,e) {
                var v = scrollTop - nk_arr[i]
                var end = $(e).parents('section').next().position().top
                var v_end = $(e).parents('section').height()
                if (scrollTop >= nk_arr[i] && scrollTop <= end) {
                    $(e).css('transform','translateY('+v+'px)')
                }else if (scrollTop < nk_arr[i]) {
                    $(e).css('transform','translateY(0px)')
                }

                if (scrollTop >= end) {
                    $(e).css('transform','translateY('+v_end+'px)')
                }
            })
        }

        if (document.querySelector('.caseInfo_bb')) {
            let cH = document.documentElement.clientHeight
            let cW = document.documentElement.clientWidth
            var s = [];
            var zg8_img_l = $('.sec9 .wrap .content .img').length
            var zg8_h = cH * zg8_img_l
            if (scrollTop>0) {
                $('.sec1 .people img:nth-child(1)').css('transform','translateY('+ -scrollTop*0.8 +'px)')
                $('.sec1 .people img:nth-child(2)').css('transform','translateY('+ -scrollTop*0.6 +'px)')
            }

            let h1 = $('.sec6').position().top
            let h2 = $('.sec6').position().top + $('.sec6 .wrap .r').height() - $('.sec6 .wrap .l').height()- $('.sec6 .wrap .l').height()
            let scroll_height = scrollTop - h1;
            if (scrollTop>h1 && scrollTop<h2) {
                $('.sec6 .wrap .l').css('transform','translateY('+ scroll_height +'px)')
            }

            let h3 = $('.sec4').position().top - $(window).height()
            let h4 = $('.sec5').position().top
            let scroll_height1 = (scrollTop - h3)*0.12;
            if (scrollTop>h3 && scrollTop<h4) {
                $('.sec4 .title .box .item1').css('transform','translateY('+ scroll_height1*0.8 +'px)')
                $('.sec4 .title .box .item2').css('transform','translateY(-'+ scroll_height1 +'px)')
                $('.sec4 .title .box .item3').css('transform','translateY(-'+ (scroll_height1*0.9) +'px)')
            }


            let h5 = $('.sec7 .fix_box').position().top
            let h6 = $('.kuai').position().top - $(window).height()
            let scroll_height2 = scrollTop - h5;
            if (scrollTop>h5 && scrollTop<h6) {
                $('.sec7 .fix').css('transform','translateY('+ scroll_height2 +'px)')
                var value = (scrollTop - h5)*0.3
                $('.sec7 .fix .wrap .flex').css('transform','translateX(-'+value+'px)')
                $('.sec7 .fix .wrap .flex:nth-child(2)').css('transform','translateX('+value+'px)')
            }


            let h7 = $('.sec8').position().top
            let h8 = $('.sec9').position().top - $(window).height()
            let scroll_height3 = scrollTop - h7;
            if (scrollTop>h7 && scrollTop<h8) {
                $('.sec8 .fix').css('transform','translateY('+ scroll_height3 +'px)')
                var value1 = scroll_height3*0.4
                var value2 = scroll_height3*0.2
                $('.sec8 .wrap .flex .item:nth-child(1) img').css('transform','translateX(-'+value1+'px)')
                $('.sec8 .wrap .flex .item:nth-child(2) img').css('transform','translateX(-'+value2+'px)')
                $('.sec8 .wrap .flex .item:nth-child(4) img').css('transform','translateX('+value2+'px)')
                $('.sec8 .wrap .flex .item:nth-child(5) img').css('transform','translateX('+value1+'px)')
            }

            //
            var zg8_start = $('.sec9 .fix_box').position().top
            var zg8_end = $('.sec9').height() - cH - (parseInt($('.sec9 .wrap').css('top')))
            if (cW>1920) {
                zg8_start = $('.sec9 .fix_box').position().top
                zg8_end = $('.sec9').height() - cH
            }
            if (scrollTop >= zg8_start && scrollTop <= $('.sec9').next().position().top - clientHeight) {

                $('.sec9 .fix').css('transform', 'translateY(' + (scrollTop - zg8_start) + 'px)')
            } else if (scrollTop <= zg8_start) {
                $('.sec9 .fix').css('transform', 'translateY(0px)')
            }

            $('.sec9 .wrap .content .img:first-child').addClass('nb')
            $('.sec9 .wrap .content .img:nth-child(n+2)').each(function (i, e) {
                var img_start = (i * cH) + zg8_start
                var y = 100 + (scrollTop - img_start) / cH * -100
                if (scrollTop >= img_start && scrollTop <= img_start + cH) {
                    $(e).css({
                        'transform': 'translateY(' + y + 'vh)',
                    })
                } else if (scrollTop <= img_start) {
                    $(e).css({
                        'transform': 'translateY(100vh)',
                    })
                }
                var e_ = (i + 1) * 60
                s[i] = 1 - ((zg8_img_l - 1) - i) * 0.17
                if (scrollTop >= img_start + cH- ((i + 1) * 60)) {
                    $(e).addClass('nb')
                    $(e).css({
                        'transform': 'translateY(' + e_ + 'px)',
                    })
                } else {
                    $(e).removeClass('nb')
                }
                $('.sec9 .wrap .content .img').each(function (index) {
                    let num = zg8_img_l - $('.sec9 .wrap .content .img.nb').length + index
                    let scale = s[num] == undefined ? 1 : s[num]
                    $('.sec9 .wrap .content .img').eq(index).find('.img_box').css({
                        'transform': 'scale(' + scale + ')',
                        opacity: 1 - ($('.sec9 .wrap .content .img.nb').length - index - 1) * 0.1
                    })
                })

            })
        }

        if (document.querySelector('.pro_haitian')) {
            let h5 = $('.sec7 .fix_box').position().top
            let h6 = $('.kuai').position().top - $(window).height()
            let scroll_height2 = scrollTop - h5;
            if (scrollTop>h5 && scrollTop<h6) {
                $('.sec7 .fix').css('transform','translateY('+ scroll_height2 +'px)')
                var value = (scrollTop - h5)*0.3
                $('.sec7 .fix .wrap .flex').css('transform','translateX(-'+value+'px)')
                $('.sec7 .fix .wrap .flex:nth-child(2)').css('transform','translateX('+value+'px)')
            }

            let h1 = $('.pro_ht8').position().top
            let h2 = $('.pro_ht8').position().top + $('.pro_ht8 .wrap .l').height() - $('.pro_ht8 .wrap .side').height()- $('.pro_ht8 .wrap .side').height()
            let scroll_height = scrollTop - h1;
            if (scrollTop>h1 && scrollTop<h2) {
                $('.pro_ht8 .wrap .side').css('transform','translateY('+ scroll_height +'px)')
            }

            var pro_ht7 = $('.pro_ht7')
            var pro_ht7_top  = pro_ht7.position().top - clientHeight
            if (scrollTop >= pro_ht7_top) {
                $('.pro_ht7 .wrap .content .l .item:first-child').css('transform','translateY('+ ((scrollTop-pro_ht7_top)*0.1) +'px)')
                $('.pro_ht7 .wrap .content2 .r .item:first-child').css('transform','translateY('+ ((scrollTop-pro_ht7_top)*0.1) +'px)')
                $('.pro_ht7 .wrap .content .l .item:last-child').css('transform','translateY('+ ((scrollTop-pro_ht7_top)*-0.15) +'px)')
                $('.pro_ht7 .wrap .content2 .r .item:last-child').css('transform','translateY('+ ((scrollTop-pro_ht7_top)*-0.15) +'px)')
            }

            //

            var pro_ht9 = $('.pro_ht9')
            var pro_ht9_top  = pro_ht9.position().top - clientHeight
            if (scrollTop >= pro_ht9_top) {
                $('.pro_ht9 .wrap .images .img:first-child').css('transform','translateY('+ ((scrollTop-pro_ht9_top)*0.16) +'px)')
                $('.pro_ht9 .wrap .images .img:last-child').css('transform','translateY('+ ((scrollTop-pro_ht9_top)*-0.15) +'px)')
            }

            var matter2Top = $('.pro_ht1').position().top + $('.pro_ht1 .matter1')[0].clientHeight

            var y_ = 150 /1920 * clientWidth
            var y2 = 50/1920 * clientWidth
            var y = (scrollTop - matter2Top) / 500
            y>1? y = 1 : y
            y<0? y = 0 : y
            var y1_=y*-y_
            var y2_=y*-y2

            if (scrollTop >= matter2Top && scrollTop <= matter2Top + $('.pro_ht1 .matter2')[0].clientHeight - clientHeight) {
                $('.pro_ht1 .fix').css('transform','translateY('+ (scrollTop - matter2Top) +'px)')

                $('.pro_ht1 .matter2 .wrap .content .item .text .y').css({
                    'transform':'translateY('+ y1_ +'px)',
                    'opacity': 1-0.5*y
                })
                $('.pro_ht1 .matter2 .wrap .content .item .text .p3').css({
                    'transform':'translateY('+ y2_ +'px)',
                    'opacity': y,
                })
            }else if (scrollTop <= matter2Top) {
                $('.pro_ht1 .fix').css('transform','translateY(0px)')
            }

            var end =  $('.pro_ht1 .matter2')[0].clientHeight - clientHeight
            if (scrollTop >= matter2Top + $('.pro_ht1 .matter2')[0].clientHeight - clientHeight) {
                $('.pro_ht1 .fix').css('transform','translateY('+ end +'px)')

            }

            //
            var pro_ht3Top = $('.pro_ht3').position().top

            var num = 300/1920 * clientWidth
            var jindu = (scrollTop - pro_ht3Top) / 500
            jindu>1? jindu = 1 : jindu
            jindu<0? jindu = 0 : jindu
            var num1=(1-jindu)*num

            var jindu2 = (scrollTop - pro_ht3Top - 400) / 500
            jindu2>1? jindu2 = 1 : jindu2
            jindu2<0? jindu2 = 0 : jindu2

            if (scrollTop >= pro_ht3Top && scrollTop <= pro_ht3Top + $('.pro_ht3')[0].clientHeight - clientHeight) {
                $('.pro_ht3 .fix').css('transform','translateY('+ (scrollTop - pro_ht3Top) +'px)')

                $('.pro_ht3 .wrap .r .num').css('transform','translateY('+ num1 +'px)')
                $('.pro_ht3 .wrap .r img').css({
                    'opacity': jindu2,
                })
            }else if (scrollTop <= matter2Top) {
                $('.pro_ht3 .fix').css('transform','translateY(0px)')
            }

            var end2 =  $('.pro_ht3')[0].clientHeight - clientHeight
            if (scrollTop >= pro_ht3Top + $('.pro_ht3')[0].clientHeight - clientHeight) {
                $('.pro_ht3 .fix').css('transform','translateY('+ end2 +'px)')

            }
        }
        if (document.querySelector('.pro_fb')) {
            var start = $('.pro_fb7').position().top
            var disJl = 1200
            var start2 = $('.pro_fb7').position().top + disJl
            var end = start + disJl
            var end_2 = start2 + disJl
            var endAll = start + (disJl * 2)
            var fixed = (scrollTop - start)
            var clip = (scrollTop - start) / disJl
            clip <= 0 ? clip = 0 : clip
            clip >= 1 ? clip = 1 : clip

            var clip2 = (scrollTop - start2) / disJl
            clip2 <= 0 ? clip2 = 0 : clip2
            clip2 >= 1 ? clip2 = 1 : clip2

            var x_end = -((document.documentElement.clientWidth*2) + 30)
            var x = Math.round((scrollTop - start) / (disJl*2) * -(document.documentElement.clientWidth*2))
            x >= 0 ? x = 0 : x
            x <= x_end ? x = x_end : x
            if (scrollTop >= start && scrollTop <= endAll) {
                $('.pro_fb7 .fix').css({
                    'transform': 'translateY(' + fixed + 'px)'
                })
                $('.pro_fb7 .fix .wrap .content .overlay').css({
                    '--x': x
                })
            } else if (scrollTop <= start) {
                $('.pro_fb7 .fix').css({
                    'transform': 'translateY(0)'
                })
                $('.pro_fb7 .fix .wrap .content .overlay').css({
                    '--x': 0
                })
            }
            if (scrollTop >= endAll) {
                $('.pro_fb7 .fix').css({
                    'transform': 'translateY(2400px)'
                })
                $('.pro_fb7 .fix .wrap .content .overlay').css({
                    '--x': x_end
                })
            }

            if (scrollTop>=start2 && scrollTop <= end_2) {
                $('.pro_fb7 .fix .wrap .content .style:nth-child(2)').css({
                    '--clip-progress': clip2
                })
            }else if (scrollTop <= end_2) {
                $('.pro_fb7 .fix .wrap .content .style:nth-child(2)').css({
                    '--clip-progress': '0'
                })
            }

            if (scrollTop >= end_2) {
                $('.pro_fb7 .fix .wrap .content .style:nth-child(2)').css({
                    '--clip-progress': 1
                })
            }

            if (scrollTop >= start && scrollTop <= end) {
                $('.pro_fb7 .fix .wrap .content .style.default').css({
                    '--clip-progress': clip
                })


            } else if (scrollTop <= start) {
                $('.pro_fb7 .fix .wrap .content .style.default').css({
                    '--clip-progress': 0
                })

            }
            if (scrollTop >= end) {
                $('.pro_fb7 .fix .wrap .content .style.default').css({
                    '--clip-progress': 1
                })

            }

            //
            var project_dis = 80 / 1920 *document.documentElement.clientWidth
            var project = $('.pro_fb4').position().top -project_dis
            var projectEnd = project + ($('.pro_fb4').height() - document.documentElement.clientHeight)
            var ding = scrollTop - project
            if (scrollTop>=project && scrollTop <= projectEnd) {
                $('.pro_fb4 .wrap .l').css('transform','translateY('+ ding +'px)')
            }else if (scrollTop <= project) {
                $('.pro_fb4 .wrap .l').css('transform','translateY(0px)')
            }


            //
            var fix = $('.pro_fb12')
            var about_fix = fix.position().top + parseInt($('.pro_fb12').css('margin-top'))
            var fixed2 = (scrollTop - about_fix)
            var end2 = about_fix+fix.height()-document.documentElement.clientHeight
            var fix_h = (clientHeight * $('.pro_fb12 .wrap .img').length) + 200
            fix.css('height',fix_h +'px')

            if (scrollTop>=about_fix && scrollTop<=end2) {
                $('.pro_fb12 .fix').css({
                    'transform': 'translateY('+ fixed2 +'px)'
                })
            }else if (scrollTop <= about_fix) {
                $('.pro_fb12 .fix').css({
                    'transform': 'translateY(0)'
                })
            }
            if (scrollTop>=end2) {
                $('.pro_fb12 .fix').css({
                    'transform': 'translateY('+ fix.height()-document.documentElement.clientHeight +'px)'
                })
            }

            $('.pro_fb12 .wrap .img:not(:first-child)').each(function (i,e) {
                var start = (i * clientHeight) + about_fix
                var y = 100 + (scrollTop - start) / clientHeight * -100

                if (scrollTop >= start && scrollTop <= start + clientHeight) {
                    gsap.to($(e), {
                        y: y + 'vh',
                        duration: 0.7,
                        ease: 'power2.out',
                    });
                } else if (scrollTop <= start) {
                    gsap.to($(e), {
                        y: '100vh',
                        duration: 0.7,
                        ease: 'power2.out',
                    });
                }

                if (scrollTop >= start + clientHeight - ((i + 1))) {
                    gsap.to($(e), {
                        y: '0vh',
                        duration: 0.7,
                        ease: 'power2.out',
                    });
                }
            })

            //
            gsap.to('.pro_fb1 .eng .flex:first-child .bigText:first-child', {
                x: scrollTop*0.2,
                duration: 0.7,
                ease: 'power2.out',
            })
            gsap.to('.pro_fb1 .eng .flex:first-child .bigText:last-child', {
                x: scrollTop*-0.2,
                duration: 0.7,
                ease: 'power2.out',
            })
            gsap.to('.pro_fb1 .eng .flex:nth-child(2) .bigText', {
                x: scrollTop*0.5,
                duration: 0.7,
                ease: 'power2.out',
            })

            if (scrollTop>=fb3) {
                gsap.to('.pro_fb3 .wrap .content .item:not(:nth-child(2))', {
                    y: (scrollTop-fb3)*0.05,
                    duration: 0.7,
                    ease: 'power2.out',
                })
                gsap.to('.pro_fb3 .wrap .content .item:nth-child(2)', {
                    y: (scrollTop-fb3)*-0.15,
                    duration: 0.7,
                    ease: 'power2.out',
                })
            }

            // new
            var newLength = $('.fb1Swiper .swiper-slide').length
            var newStart = $('.pro_fb8').position().top
            var newEnd = newStart + ($('.pro_fb8').height() - document.documentElement.clientHeight)
            var newFixed = (scrollTop - newStart)
            var newIndex = Math.round((scrollTop-newStart) / ($('.pro_fb8').height() / newLength) )
            newIndex<=0?newIndex=0:newIndex
            newIndex>=newLength-1?newIndex=newLength-1:newIndex
            if (thatIndex!==newIndex) {
                fb1Swiper.slideTo(newIndex)
            }
            thatIndex = newIndex
            if (scrollTop>= newStart && scrollTop <= newEnd) {
                $('.pro_fb8 .fix').css({
                    'transform': 'translateY('+ newFixed +'px)'
                })
            }else if (scrollTop <= newStart){
                $('.pro_fb8 .fix').css({
                    'transform': 'translateY(0)'
                })

            }
            if (scrollTop>=newEnd){
                $('.pro_fb8 .fix').css({
                    'transform': 'translateY('+ ($('.pro_fb8').height() - document.documentElement.clientHeight) +'px)'
                })
            }
        }

        if (document.querySelector('.pro_dy')) {
            let cH = document.documentElement.clientHeight
            let cW = document.documentElement.clientWidth
            var s = [];
            var zg8_img_l = $('.sec12 .fix .r .img').length
            var zg8_h = cH * zg8_img_l
            $('.sec12').css('height', zg8_h + 'px')
            var zg8_start = $('.sec12').position().top
            var zg8_end = $('.sec12').height() - cH

            let y = 400 - 400 * (scrollTop - zg8_start)/ (zg8_h - cH)
            if (scrollTop >= zg8_start && scrollTop <= $('.sec12').next().position().top - clientHeight) {
                $('.sec12 .fix').css('transform', 'translateY(' + (scrollTop - zg8_start) + 'px)')
                $('.sec12 .fix .wrap .l .l_box .l_list .scroll_y1').css('transform', 'translateY('+ y +'px)')
            } else if (scrollTop <= zg8_start) {
                $('.sec12 .fix').css('transform', 'translateY(0px)')
                $('.sec12 .fix .wrap .l .l_box .l_list .scroll_y1').css('transform', 'translateY(400px)')
            } else if (scrollTop >= $('.sec12').next().position().top - clientHeight) {
                $('.sec12 .fix .wrap .l .l_box .l_list .scroll_y1').css('transform', 'translateY(-1px)')
            }

            $('.sec12 .wrap .r .img:first-child').addClass('nb')
            $('.sec12 .wrap .r .img:nth-child(n+2)').each(function (i, e) {
                var img_start = (i * cH) + zg8_start
                var y = 100 + (scrollTop - img_start) / cH * -100
                if (scrollTop >= img_start && scrollTop <= img_start + cH) {
                    $(e).css({
                        'transform': 'translateY(' + y + 'vh)',
                    })
                } else if (scrollTop <= img_start) {
                    $(e).css({
                        'transform': 'translateY(100vh)',
                    })
                }
                var e_ = (i + 1) * 50
                s[i] = 1 - ((zg8_img_l - 1) - i) * 0.17
                if (scrollTop >= img_start + cH- ((i + 1) * 50)) {
                    $(e).addClass('nb')
                    $(e).css({
                        'transform': 'translateY(' + e_ + 'px)',
                    })
                } else {
                    $(e).removeClass('nb')
                }
                $('.sec12 .wrap .r .img').each(function (index) {
                    let num = zg8_img_l - $('.sec12 .wrap .r .img.nb').length + index
                    let scale = s[num] == undefined ? 1 : s[num]
                    $('.sec12 .wrap .r .img').eq(index).find('img').css({
                        'filter': 'brightness(' + scale + ')',
                    })
                })

            })


            let h5 = $('.sec13 .fix_box').position().top
            let h6 = $('.sec13').next().position().top - $(window).height()
            let scroll_height2 = scrollTop - h5;
            if (scrollTop>h5 && scrollTop<h6) {
                $('.sec13 .fix').css('transform','translateY('+ scroll_height2 +'px)')
                var value = (scrollTop - h5)*0.3
                $('.sec13 .fix .flex').css('transform','translateX(-'+value+'px)')
                $('.sec13 .fix .flex:nth-child(2)').css('transform','translateX('+value+'px)')
            }

            let h7 = $('.sec14').position().top
            let h8 = $('.sec14').next().position().top - $(window).height()
            let scroll_height3 = scrollTop - h7;
            if (scrollTop>h7 && scrollTop<h8) {
                var value = (scrollTop - h7)*0.3
                $('.sec14 .fix').css('transform','translateY('+ scroll_height3 +'px)')
                $('.sec14 .fix .img').css('transform','translateY(-'+value+'px)')
                $('.sec14 .fix .img:nth-child(2)').css('transform','translateY('+value+'px)')
            } else if (scrollTop <= h7) {
                $('.sec14 .fix').css('transform','translateY(0px)')
                $('.sec14 .fix .img').css('transform','translateY(0px)')
                $('.sec14 .fix .img:nth-child(2)').css('transform','translateY(0px)')
            }

        }

        if (document.querySelector('.caseInfo_gxgk1')) {

            let scrollX, scrollXHeight, Horizontal
            function common_x(x, all, allW) {
                scrollX = x
                Horizontal = all
                var wid = $(allW).width()
                scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                Horizontal.style.height = scrollXHeight + 'px'
                window.addEventListener('resize', function () {
                    scrollXHeight = (scrollX.clientWidth - wid) + clientHeight
                    Horizontal.style.height = scrollXHeight + 'px'
                });
            }
            common_x(document.querySelector('.caseInfo_gxgk9 .fix .wrap .wrap_x'), document.documentElement.querySelector('.caseInfo_gxgk9'), $('.caseInfo_gxgk9 .fix .wrap'))
            var thatIndex = Math.round((scrollTop - $('.caseInfo_gxgk9').position().top) / ($('.caseInfo_gxgk9').height() / itemL))
            thatIndex<=0?thatIndex=0:thatIndex
            thatIndex>=itemL-1?thatIndex=itemL-1:thatIndex
            listClick.removeClass('on').eq(thatIndex).addClass('on')
            $('.caseInfo_gxgk9 .fix .wrap .title .title_list').removeClass('on').eq(thatIndex).addClass('on')

            function common_x_scroll(scrollTop, all, start) {
                var x_end = $(all).next().position().top - clientHeight
                if (scrollTop > start && scrollTop < x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollTop - start) + 'px, 0px, 0px)')
                } else if (scrollTop <= start) {
                    $(scrollX).css('transform', 'translate3d(0px, 0px, 0px)')
                }
                if (scrollTop >= x_end) {
                    $(scrollX).css('transform', 'translate3d(-' + (scrollXHeight - clientHeight) + 'px, 0px, 0px)')
                }
            }
            common_x_scroll(scrollTop, $('.caseInfo_gxgk9'), $('.caseInfo_gxgk9').position().top)
        }

        if (document.querySelector('.caseInfo_yf1')) {
            let cH = document.documentElement.clientHeight
            let cW = document.documentElement.clientWidth
            let caseInfo_yf6_height = $('.caseInfo_yf6 .scroll_box .fix .crosswise').innerWidth()-cW+cH
            $('.caseInfo_yf6 .scroll_box').css('height', caseInfo_yf6_height + 'px')
            var caseInfo_yf6_start = $('.caseInfo_yf6 .scroll_box').position().top
            if (scrollTop >= caseInfo_yf6_start && scrollTop <= (caseInfo_yf6_start+caseInfo_yf6_height-cH)) {
                $('.caseInfo_yf6 .scroll_box .fix').css('transform', 'translateY(' + (scrollTop - caseInfo_yf6_start) + 'px)')
                $('.caseInfo_yf6 .scroll_box .fix .crosswise').css('transform', 'translateX(-' + (scrollTop - caseInfo_yf6_start) + 'px)')
            } else if (scrollTop <= caseInfo_yf6_start) {
                $('.caseInfo_yf6 .scroll_box .fix').css('transform', 'translateY(0px)')
                $('.caseInfo_yf6 .scroll_box .fix .crosswise').css('transform', 'translateX(0px)')
            }
        }
    });

    scrollbar.update()


    // 侧边栏初始化
    $('.header').removeClass('on hide')

    // AOS

    setTimeout(function () {
        if (clientWidth <= all_mobile) {
            Scrollbar.destroyAll()
            window.addEventListener('scroll',function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                scroll_content(scrollTop)
                // scrollTop_start(scrollTop)
            })
            setTimeout(function () {
                AOS.init({scroll: window.pageYOffset, mobile: all_mobile, once: true,});
            },10)
        }else {
            setTimeout(function () {
                AOS.init({scroll: window.pageYOffset, mobile: all_mobile, once: true,});
            },10)
        }
    },100)

    $('.index3 .wrap .content .item').find('.attr').each(function (i, e) {
        var attr = $(e).find('p').html()
        $(e).attr('data-text', attr)
    })


    var magnets = document.querySelectorAll('.magnetic')
    for (let i = 0; i < magnets.length; i++) {
        var speed = magnets[i].getAttribute('data-speed')
        if (!speed) {
            speed = 20
        }
        var strength = speed
    }


    magnets.forEach( (magnet) => {
        magnet.addEventListener('mousemove', moveMagnet );
        magnet.addEventListener('mouseout', function(event) {
            TweenMax.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
        } );
    });

    function moveMagnet(event) {
        var magnetButton = event.currentTarget
        var bounding = magnetButton.getBoundingClientRect()

        TweenMax.to( magnetButton, 1, {
            x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
            y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
            ease: Power4.easeOut
        })
    }

    var hover_button = document.querySelectorAll('.hover_button')
    for (let i = 0; i < hover_button.length; i++) {
        var speed2 = hover_button[i].getAttribute('data-speed')
        if (!speed2) {
            speed2 = 50
        }
        var strength2 = speed2
    }


    hover_button.forEach( (magnet2) => {
        magnet2.addEventListener('mousemove', moveMagnet2 );
        magnet2.addEventListener('mouseout', function(event) {
            TweenMax.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
        } );
    });

    function moveMagnet2(event2) {
        var magnetButton2 = event2.currentTarget
        var bounding2 = magnetButton2.getBoundingClientRect()

        TweenMax.to( magnetButton2, 1, {
            x: ((( event2.clientX - bounding2.left)/magnetButton2.offsetWidth) - 0.5) * strength2,
            y: ((( event2.clientY - bounding2.top)/magnetButton2.offsetHeight) - 0.5) * strength2,
            ease: Power4.easeOut
        })
    }

    var banner = new Swiper('.banner .swiper', {
        speed: 1000,
        effect: 'fade',
        allowTouchMove: false,
        init:true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        on: {
            init() {
                setTimeout(function () {
                    $('.banner .swiper .swiper-slide:first-child').addClass('on')
                },10)
                var this_swiper = this
                    , video = this.slides[0].querySelector('video');
                !!video && this.autoplay.stop();
                video.play();
                document.querySelector('.banner .swiper').querySelectorAll('video').forEach(e => e.addEventListener('ended', function () {
                    this_swiper.slideNext()
                }))
            },
            slideChange() {
                $('.banner .swiper .swiper-slide').removeClass('on').eq(this.realIndex).addClass('on')
                $('.banner .swiper .swiper-slide').eq(this.realIndex).removeClass('unset').siblings().addClass('unset')
                var video = this.slides[this.realIndex].querySelector('video');
                var prev_video = this.slides[this.previousIndex].querySelector('video');

                !!video ? this.autoplay.stop() : this.autoplay.start();
                !!prev_video && prev_video.pause();
                setTimeout(function () {
                    !!prev_video && (prev_video.currentTime = 0);
                    !!video && (video.currentTime = 0);
                }, 500)
                !!video && video.play();

                if (this.realIndex > 0) {
                    this.params.autoplay.delay = 3000
                }
            }
        }
    })

    var inline = new Swiper('.index1 .inline .swiper', {
        speed: 800,
        loop: true,
        direction: 'vertical',
        allowTouchMove: false,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
    })

    new Swiper('.index1 .content .picture .img .swiper', {
        speed: 800,
        loop: true,
        direction: 'vertical',
        allowTouchMove: false,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
    })

}
getUpdate()


// js 代码
if (document.querySelector('.index1')) {
    if (clientWidth < all_mobile) {
        setTimeout(function () {
            $('.each_animate').addClass('on')
        }, 10)
        window.addEventListener('scroll', function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (clientWidth < all_mobile) {
                $('.index3 .wrap .sj_content li').each(function (i, e) {
                    var h = $(e).height()
                    var start = (i * h) + $('.index3 .wrap .sj_content ul').position().top
                    var value = 1 + (scrollTop - start) / 700 * -0.08
                    if (scrollTop >= start) {
                        $(e).css('transform', `scale(${value})`)
                    }else if (scrollTop <= start) {
                        $(e).css('transform', 'scale(1)')
                    }
                })
            }
        })
    }else {
        setTimeout(function () {
            $('.each_animate').addClass('on')
        },10)
    }
}


$(document).on('click','.section_9 .warp .main .lift',function () {
    $('.section_9 .warp .main .img img').toggleClass('on')
})

$(document).on('click','.pro_en2 .fix .wrap .content .right .jump .circle',function () {
    if ($(this).is('.circle1')) {
        $('.pro_en2 .circle2').css('left','0')
        $('.pro_en2 .circle2').addClass('circle1').removeClass('circle2 circle3')
        $(this).addClass('circle2').removeClass('circle1 circle3')
        $(this).css('left','50%')
    }else {
        $('.pro_en2 .circle2').css('left','100%')
        $('.pro_en2 .circle2').addClass('circle3').removeClass('circle1 circle2')
        $(this).addClass('circle2').removeClass('circle1 circle3')
        $(this).css('left','50%')
    }
    $(this).addClass('blue').siblings().removeClass('blue')
})


$(document).on('click', '.index3 .wrap .content .item', function () {
    let old = $('.index3 .wrap .content .item.on').index()
    var index = $(this).index()
    on(this)
    var h = document.querySelector('.index3 .wrap .content .item').clientHeight
    $('.index3 .wrap .content .move').css({
        'transform': 'translateY(' + index * h + 'px)'
    })
    if (old != index) {
        $('.picture .animate_video video').removeClass('on').trigger('pause')
        $('.picture .animate_video .' + (old + 1) + '_' + (index + 1))[0].currentTime = 0
        $('.picture .animate_video .' + (old + 1) + '_' + (index + 1)).addClass('on').trigger('play')
    }
})
$(document).on('click', '.common_case_banner .scroll-down', function () {
    scrollbar.scrollTo(0,clientHeight,1000);
})

// var html = `<!--<img src="http://cdn.seniorart.cn/images/20240530/b6db0c8e82726fd3626348a261390156.webp" class="back sj_back" style="display: none" alt="">-->`
var html = `<div class="sj_banner_video" data-video="static/images/banner.ts?v=1" style="display:none;"></div>`

if (document.documentElement.clientWidth < 1024) {
    $('.banner .swiper_banner video').remove()
    $('.banner .swiper_banner .swiper-slide:first-child').append(html)
    $('.sj_banner_video').each(function (i,e) {
        var videoUrl = $(e).attr('data-video')
        var player = new JSMpeg.VideoElement(e, videoUrl,{
            loop: true,
            autoplay: true,
            control: false,
            audio: false,
            volume: 0,
        });
        player.volume = 0;
    })
}

// 弹窗
document.addEventListener('mouseout', function(e) {
    if(e.clientY<0){
        if (!sessionStorage.getItem('get')) {
            $('.fixed_get').addClass('on')
        }
        sessionStorage.setItem('get','get');
    }
})

$('.fixed_get .content .close').click(function() {
    $('.fixed_get').removeClass('on')
})


function Time() {
    var d = new Date()
    var y = d.getFullYear()
    var m = d.getMonth()
    var daysOfWeek = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
    var currentDayText = daysOfWeek[m];
    var r = d.getDate()
    return currentDayText + ' '  + r + ',' + y
}

if (document.querySelector('.case1')) {
    $('.case1 .wrap .insert .swiper .swiper-slide .time').html(Time())
}

$(document).on('mouseenter','.canvas_alert',function() {
    $('body').css('cursor','unset')
})

function head_animate() {
    if (document.body.clientWidth > 1365) {
        $('.header .logo').addClass('animated fadeInDown')
        $('.header .nav li').addClass('animated fadeInDown')
        $('.header .nav li').each(function (index, item) {
            var delay = index * 200 + 200
            $(this).css('animation-delay', delay + 'ms')
        })
        $('.header .r .outdated svg').addClass('animated fadeInDown').css('animation-delay', '1300ms')
        $('.header .r .sun').addClass('animated fadeInDown').css('animation-delay', '1400ms')
    }


    $(document).on('mouseenter','.header .l .nav li',function(){
        $('.header').addClass('undertone')
    });

    $(document).on('mouseleave','.header .l .nav li',function(){
        $('.header').removeClass('undertone')
    });

}

function scroll_content(scrollTop) {

    setTimeout(function () {
        AOS.init({scroll: scrollTop, mobile: all_mobile, once: true,});
        scrollTop_start(scrollTop)
    },100)

    var distance = clientHeight - $('.header').height() / 2
    if (!document.querySelector('#index')) {
        distance = 100
    }
    scrollTop > distance ? $('.header').addClass('on') : $('.header').removeClass('on')

    if (document.querySelector('.public_text')) {
        $('.public_text').each(function (i, e) {
            var speed = $(e).attr('data-speed')
            var len = $(e).find('.p:first-child p').length
            $(e).find('.p:first-child p').each(function (i, e) {
                var dis = 200
                if (speed) {
                    dis = speed*1
                }
                var all_dis = dis * len
                var start = $(e).offset().top - (clientHeight / 1.2)
                var end = start + all_dis
                var ban = (end - start) / len
                var value = 100 + (scrollTop - (start + (i * ban))) / ban * -100
                if (scrollTop >= start + (i * ban) && scrollTop <= end) {
                    $(e).css('clip-path', 'inset(0 ' + value + '% 0 0)')
                } else if (scrollTop <= start + (i * ban)) {
                    $(e).css('clip-path', 'inset(0 100% 0 0)')
                }
                if (scrollTop >= end) {
                    $(e).css('clip-path', 'inset(0 0 0 0)')
                }
            })
        })
    }

    if (document.querySelector('.caseInfo')) {
        var pro_h1 = scrollTop * 0.5
        var pro_p = scrollTop * 0.53

        if (scrollTop >= 0 && scrollTop <= 300) {
            var pro_start = 115 + (scrollTop / 300) * -15
            $('.public_pro .wrap .content').css('width', pro_start + '%')
        }

        $('.public_pro .wrap .title h1').css('transform', 'translateY(' + pro_h1 + 'px)')

        $('.public_pro .wrap .title p').css('transform', 'translateY(' + pro_p + 'px)')

        if (document.querySelector('.apl_content')) {
            if (scrollTop >= 0 && scrollTop <= 500) {
                var v = 1 + scrollTop / 500 * 0.4
                $('.public_pro .apl_content img').css('transform','scale('+v+')')
            }else if (scrollTop === 0){
                $('.public_pro .apl_content img').css('transform','scale(1)')
            }
        }
    }

    if (scrollTop >= 300) {
        $('.fixed_side').addClass('on')
    }else {
        $('.fixed_side').removeClass('on')
    }
}
function MouseScroll() {
    // if ($('.scroll-content').height() >= clientHeight) {
    //     $(document).on('mousewheel', function (event) {
    //         var delta = event.originalEvent.deltaY || -event.originalEvent.detail;
    //         if (clientWidth > all_mobile) {
    //             if (delta > 0) {
    //                 $('.header').addClass('hide')
    //             } else {
    //                 $('.header').removeClass('hide')
    //             }
    //         }
    //
    //     });
    // }
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            // 鼠标滚轮向下
            $('.header').addClass('hide')
        } else if (e.deltaY < 0) {
            // 鼠标滚轮向上
            $('.header').removeClass('hide')
        }
    });
    // console.log($('.scroll-content').height(),clientHeight,$('.scroll-content').height() >= clientHeight)
    // if ($('.scroll-content').height() >= clientHeight) {
    //     console.log('进')
    //     if (window.addEventListener)
    //         window.addEventListener('DOMMouseScroll', wheel, false);
    //     window.onmousewheel = document.onmousewheel = wheel;
    //     function wheel(event){
    //         var delta = 0;
    //         if (!event) event = window.event;
    //         if (event.wheelDelta) {
    //             delta = event.wheelDelta/120;
    //             if (window.opera) delta = -delta;
    //         } else if (event.detail) {
    //             delta = -event.detail/3;
    //         }
    //         if (delta)
    //             handle(delta);
    //     }
    //     function handle(delta) {
    //         if (delta <0){
    //             //向下滚动
    //             console.log('下')
    //             $('.header').addClass('hide')
    //         }else{
    //             //向上滚动
    //             console.log('上')
    //             $('.header').removeClass('hide')
    //         }
    //     }
    // }
}

function each_animate() {
    $('.each_animate').each(function (index, ele) {
        var $span = $(ele).find('span');
        var text = $(ele).html();

        if ($span.length === 0) {
            var textArray = text.split('');
            var html = '';
            for (var i in textArray) {
                html += '<div style="display: inline-block;">' + textArray[i] + '</div>';
            }
            $(ele).html(html);
        } else {
            var spanText = $span.html();
            var spanTextArray = spanText.split('');
            var spanHtml = '';
            for (var i in spanTextArray) {
                spanHtml += '<div style="display: inline-block;">' + spanTextArray[i] + '</div>';
            }
            $span.html(spanHtml);
        }

        $(ele).contents().filter(function () {
            return this.nodeType === 3;
        }).each(function () {
            var text = $(this).text();
            var textArray = text.split('');
            var html = '';
            for (var i in textArray) {
                html += '<div style="display: inline-block;">' + textArray[i] + '</div>';
            }
            $(this).replaceWith(html);
        });

        $(ele).find('div').each(function (index, ele) {
            let delay = index * 0.08 + 0.3;
            if ($(ele).text() == ' ') {
                $(ele).css({
                    'transition-delay': delay + 's',
                    'opacity': '0',
                    'transform': 'translateX(10px)',
                    'min-width': '10px'
                });
            } else {
                $(ele).css({
                    'transition-delay': delay + 's',
                    'opacity': '0',
                    'transform': 'translateX(10px)',
                });
            }
        });
    });
}

function MouseFollow() {
    let d = $('.cursor'),
        speed = d.attr('data-speed')

    speed === null ? speed = 0.9 : speed = speed / 10

    d && function (e) {
        gsap.set(e, {
            xPercent: -50,
            yPercent: -50
        });
        let t = e,
            r = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            },
            o = {
                x: r.x,
                y: r.y
            },
            a = gsap.quickSetter(t, "x", "px"),
            n = gsap.quickSetter(t, "y", "px");
        document.body.addEventListener("mousemove", e => {
            o.x = e.x, o.y = e.y
        }), gsap.ticker.add(() => {
            const e = 1 - Math.pow(speed, gsap.ticker.deltaRatio());
            r.x += (o.x - r.x) * e, r.y += (o.y - r.y) * e, a(r.x), n(r.y)
        })
    }(d)

    var mouseDownTime;

    function do_div() {
        var $generatedDiv = $('<div class="bor"></div>');
        $('.fixed_cursor .whole').append($generatedDiv);
        setTimeout(function () {
            $generatedDiv.addClass('on');
        }, 10)
        setTimeout(function () {
            $generatedDiv.addClass('hide');
            setTimeout(function () {
                $generatedDiv.remove()
            }, 300)
        }, 250);
    }

    $(document).on('mousedown', function () {
        mouseDownTime = new Date().getTime();
        $('.fixed_cursor .cursor .whole').addClass('on')
        do_div()
    });

    $(document).on('mouseup', function () {
        $('.fixed_cursor .cursor .whole').removeClass('on')
        var mouseUpTime = new Date().getTime();
        var timeDifference = mouseUpTime - mouseDownTime;
        if (timeDifference > 300) {
            do_div();
        }
    });

    $(document).on('mouseenter','.public_hover .item .img,.public_hover .background,.item_hover',function () {
        $('.fixed_cursor').addClass('cut')
    })

    $(document).on('mouseleave','.public_hover .item .img,.public_hover .background,.item_hover',function () {
        $('.fixed_cursor').removeClass('cut')
    })
}










$(document).on('mouseenter','.case1 .wrap .cut_content .matter2 .item',function () {
    var h = blue.height()
    var index = $(this).index()
    blue.addClass('on')
    blue.css('transform','translateY('+ (index * h) +'px)')
    $('.case_cursor').addClass('on')
    case_swiper.slideTo(index)
})

$(document).on('click','.design4 .wrap .content .cut .joke .item',function () {
    design4.slideTo($(this).index())
})

head_animate()

MouseScroll()

each_animate()


MouseFollow()

var link_transition = ['#FEE952', '#FEE952', '#FEE952', '#FF6E7B', '#FF6E7B', '#F78CFE', '#2D75FF', '#05E2FA', '#05E2FA', '#1AF8FD', '#05E2FA'];

var circles = document.querySelectorAll('.link_transition .circle');

for (let i = 0; i < circles.length; i++) {
    circles[i].style.background = link_transition[i];
    circles[i].style.top = circles[i].getBoundingClientRect().top / 9.6 + 'vh'
    circles[i].style.left = circles[i].getBoundingClientRect().left / 19.2 + 'vw'
}


if (clientWidth > all_mobile) {
    // $('body').on('click', 'a', function(e){
    //     if(!$(this).attr('target')){
    //         e.preventDefault();
    //         var href = $(this).attr('href');
    //         if (!$(this).is('.none')) {
    //             !!href && ($('.link_transition').removeClass('on after_on'),e.preventDefault(),setTimeout(function(){window.location.href = href;},1200));
    //         }
    //     }
    // })
    //
    // window.onpageshow = function (event) {
    //     event.persisted ? event.persisted = !event.persisted : event.persisted
    //     if (event.persisted === true) {
    //         popstate()
    //     }
    // }

    // function popstate() {
    //     setTimeout(function () {
    //         $('.link_transition').addClass('after_on')
    //         setTimeout(function () {
    //             $('.link_transition').addClass('on')
    //         },500)
    //         setTimeout(function () {
    //             AOS.init({scroll: 0, mobile: all_mobile, once: true});
    //             $('.each_animate').addClass('on')
    //         }, 600)
    //     },300)
    // }
    // popstate()



}

// if (!sessionStorage.getItem('load')) {
//     load()
// } else {
//     load_hide()
// }
//
// sessionStorage.setItem('load', '加载')

var blue = $('.case1 .wrap .cut_content .matter2 .blue')


$(document).on('mouseleave','.case1 .wrap .cut_content .matter2 .item',function () {
    blue.removeClass('on')
    $('.case_cursor').removeClass('on')
})

$(document).on('click','.case1 .wrap .screen .list',function () {
    on(this,$('.case1 .wrap .cut_content .matter'))
    if ($(this).index() === 1) {
        setTimeout(function () {
            $('.case1 .wrap .cut_content .matter2').addClass('on_')
        },100)
    }else {
        $('.case1 .wrap .cut_content .matter2').removeClass('on_')
    }
})

$('.case1 .wrap .cut_content .matter2 .item').each(function (i,e) {
    var delay = i * 0.15
    $(e).css('transition','all 0.4s '+ delay +'s')
})

$(document).on('click','.contact1 form .end .agree .text,.contact1 form .end .agree .bor',function () {
    $('.contact1 form .end .agree .bor').toggleClass('on')
})

$(document).on('click','.contact1 .white .list-i',function () {
    $(this).find('.bor').toggleClass('on')
})


$(document).on('click','.public_pro .mk_content .flex .item',function () {
    on(this,$('.public_pro .mk_content .img img'))
})

$(document).on('click','.pro_ht7 .wrap .content .l .item',function () {
    on(this,$('.pro_ht7 .wrap .content .r img'))
})
//
// $(document).on('click','.pro_zj4 .wrap .r .cut div',function () {
//     on(this,$('.pro_zj4 .wrap .r .picture .matter'))
// })
//


// $('.page .wrap .content > *:not(div)').each(function (i,e) {
//     var delay = 300 + i * 100
//     $(e).attr('aos','fade-top')
//     $(e).attr('aos-delay',delay)
// })

$(document).on('mouseenter','.position_translate:nth-child(3)',function(){
    $('.img_translate').addClass('left')
});

$(document).on('mouseleave','.position_translate:nth-child(3)',function(){
    $('.img_translate').removeClass('left')
});

$(document).on('mouseenter','.position_translate:nth-child(2)',function(){
    $('.img_translate').addClass('right')
});
$(document).on('mouseleave','.position_translate:nth-child(2)',function(){
    $('.img_translate').removeClass('right')
});


// 初始判断
var currentTime = new Date();

const currentHour = currentTime.getHours();
var allTime1 = 8;
var allTime2 = 19;

var ifTime = true
var lastTime = sessionStorage.getItem('ifTime')
if (currentHour >= allTime1 && currentHour < allTime2) {
    // 8:00
    console.log('white')
    if (lastTime !== 'false') {
        localStorage.removeItem('Pattern');
        $('body').attr('id','')
        if (document.querySelector('#index')) {
            $('body .index3 .wrap .content .picture .pc').addClass('animate_video')
            $('body .index3 .wrap .content .picture .hy').removeClass('animate_video')
        }
        P = false;
    }
} else {
    // 19:00
    console.log('black')
    if (lastTime !== 'false') {
        sessionStorage.setItem('Pattern','Pattern')
        $('body').attr('id','Pattern')
        if (document.querySelector('#index')) {
            $('body .index3 .wrap .content .picture .pc').removeClass('animate_video')
            $('body .index3 .wrap .content .picture .hy').addClass('animate_video')
        }
        P = true;
    }

}

// 模式
var P = false;
var Pattern = sessionStorage.getItem('Pattern')


$(document).on('click','.header .r .sun',function () {
    ifTime = false;
    sessionStorage.setItem('ifTime',ifTime)
    if (P) {
        sessionStorage.removeItem('Pattern');
        $('body').attr('id','')
        if (document.querySelector('#index')) {
            $('body .index3 .wrap .content .picture .pc').addClass('animate_video')
            $('body .index3 .wrap .content .picture .hy').removeClass('animate_video')
        }
        P = false;
    }else {
        sessionStorage.setItem('Pattern','Pattern')
        $('body').attr('id','Pattern')
        if (document.querySelector('#index')) {
            $('body .index3 .wrap .content .picture .pc').removeClass('animate_video')
            $('body .index3 .wrap .content .picture .hy').addClass('animate_video')
        }
        P = true;
    }
})

$(document).on('click','.fixed_side .item.mode',function () {
    if ($(this).index() === 0) {
        sessionStorage.removeItem('Pattern');
        $('body').attr('id','')
        P = false;
    }else {
        sessionStorage.setItem('Pattern','Pattern')
        $('body').attr('id','Pattern')
        P = true;
    }
})

if (Pattern) {
    P = true;
    $('body').attr('id','Pattern')
    if (document.querySelector('#index')) {
        $('body .index3 .wrap .content .picture .pc').removeClass('animate_video')
        $('body .index3 .wrap .content .picture .hy').addClass('animate_video')
    }
}


$(document).on('click','.contact1 .wrap .top .r .position_circle',function () {
    $('.fixed_alert').addClass('on')
})

$(document).on('click','.fixed_alert .content .clone',function () {
    $('.fixed_alert').removeClass('on')
})

$(document).on('click','.fixed_alert .mask',function () {
    $('.fixed_alert').removeClass('on')
})

$(document).on('click','.fixed_side .item.ClickTop',function () {
    scrollbar.scrollTo(0, 0, 1200);
})

$(document).on('click','.header .menu', function () {
    if ($(this)[0].classList.length <= 1) {
        $(this).addClass('active')
        $('.menuList').removeClass('done')
        $('.menuList').addClass('on')
        $('.menuList .box').addClass('active')
        console.log($(this))
    }else {
        $(this).removeClass('active')
        $('.menuList').addClass('done')
        $('.menuList').removeClass('on')
        $('.menuList .box').removeClass('active')
    }

    $('.header').toggleClass('sj_on')

    if ($('.menu_background').is('.on')) {
        $('body').css('overflow','unset')
    }else{
        $('body').css('overflow','hidden')
    }

    $('.menu_background').toggleClass('on')
})

$('.menu_background .joke ul li .headline').click(function () {
    $(this).siblings('.hidden').stop().slideToggle(300);
    $(this).parent().siblings().find('.hidden').stop().slideUp(300);
    $(this).find('.iconfont').toggleClass('on')
    $(this).parent().siblings().find('.iconfont').removeClass('on')
})

function parsePercent(val, type, ele) {
    if (val && val.toString().includes('%')) {
        const percent = parseFloat(val) / 100
        const rect = ele.getBoundingClientRect()

        // x 按宽度算，y 按高度算
        return type === 'x'
            ? rect.width * percent
            : rect.height * percent
    }
    return parseFloat(val)
}

function scrollTop_start(e) {
    var scrollTop = e;
    $('[data-view]').each(function (index, ele) {
        var overall_height =  document.documentElement.clientHeight;
        var overall_width =  document.documentElement.clientWidth;
        var start = $(ele).parents('section').position().top;
        var distance = $(ele).attr('data-distance')
        var ease = $(ele).attr('data-ease')
        distance = distance === undefined ? 0 : distance
        var unit = $(ele).attr('data-unit')
        if (unit === 'vh') {
            if (distance.includes('-')) {
                distance = - overall_height / 10 * (distance*-1/10)
            }
        }

        var start_distance = start + parseFloat(distance)
        var animate_end = parseFloat($(ele).attr('data-animate'))
        var end = $(ele).parents('section').next().position().top - overall_height
        var end_value = $(ele).parents('section').height() - overall_height
        var distance_end = $(ele).attr('data-distance-end')
        if (distance_end) {
            var vh = overall_height / 10 * (distance_end/10)
            end = end + vh
            end_value = end_value + vh
        }

        var scale = $(ele).attr('data-scale')
        if (scale) {
            var scale_and;
            var scale_start = parseFloat(scale.split(',')[0])
            var scale_end = parseFloat(scale.split(',')[1])
            if (ease === '') {
                scale_and = scale_start + easeOutQuad((scrollTop - start_distance) / animate_end) * ((scale_start - scale_end) * -1)
            }else {
                scale_and = scale_start + (scrollTop - start_distance) / animate_end * ((scale_start - scale_end) * -1)
            }
        }
        scale_start = scale_start === undefined ? 1 : scale_start
        scale_and = scale_and === undefined ?  1 :scale_and
        scale_end = scale_end === undefined ?  1 :scale_end

        var x = $(ele).attr('data-x')
        x = x === undefined ? '0,0' : x
        if (x) {
            var x_and;
            var xArr = x.split(',')
            var x_start = parsePercent(xArr[0], 'x', ele)
            var x_end = parsePercent(xArr[1], 'x', ele)
            if (ease === '') {
                x_and = x_start + easeOutQuad((scrollTop - start_distance) / animate_end) * (x_start * -1)
            }else {
                x_and = x_start + (scrollTop - start_distance) / animate_end * ((x_start - x_end) * -1)
            }
            x_and = x_and ? x_and : 0
        }

        var y = $(ele).attr('data-y')
        y = y === undefined ? '0,0' : y
        if (y) {
            var y_and;
            var yArr = y.split(',')
            var y_start = parsePercent(yArr[0], 'y', ele)
            var y_end = parsePercent(yArr[1], 'y', ele)
            if (ease === '') {
                y_and = y_start + easeOutQuad((scrollTop - start_distance) / animate_end) * (y_start*-1)
            }else {
                y_and = y_start + (scrollTop - start_distance) / animate_end * ((y_start - y_end) *-1)
            }
            y_and = y_and ? y_and : 0
        }

        var opacity = $(ele).attr('data-opacity')
        if (opacity) {
            var opacity_and;
            var opacity_start = parseFloat(opacity.split(',')[0])
            var opacity_end = parseFloat(opacity.split(',')[1])
            if (ease === '') {
                opacity_and = opacity_start + easeOutQuad((scrollTop - start_distance) / animate_end) * (opacity_start*-1)
            }else {
                opacity_and = opacity_start + (scrollTop - start_distance) / animate_end * ((opacity_start - opacity_end) *-1)
            }
            opacity_and = opacity_and ? opacity_and : 1
        }

        var blur = $(ele).attr('data-blur')
        if (blur) {
            var blur_and;
            var blur_start = parseFloat(blur.split(',')[0])
            var blur_end = parseFloat(blur.split(',')[1])
            if (ease === '') {
                blur_and = blur_start + easeOutQuad((scrollTop - start_distance) / animate_end) * ((blur_start - blur_end) * -1)
            }else {
                blur_and = blur_start + (scrollTop - start_distance) / animate_end * ((blur_start - blur_end) * -1)
            }
        }
        blur_start = blur_start === undefined ? 0 : blur_start
        blur_and = blur_and === undefined ?  0 :blur_and
        blur_end = blur_end === undefined ?  0 :blur_end

        if (scrollTop >= start_distance && scrollTop < start_distance + animate_end) {
            $(ele).css({
                'transform': 'translate('+ x_and +'px,'+ y_and +'px) scale('+ scale_and +')',
                'opacity': opacity_and,
                'filter': 'blur(' + blur_and + 'px)'
            })
        }else if (scrollTop < start_distance) {
            $(ele).css({
                'transform': 'translate('+ x_start +'px,'+ y_start +'px) scale('+ scale_start +')',
                'opacity': opacity_start,
                'filter': 'blur(' + blur_start + 'px)'

            })
        }

        if (scrollTop >= start_distance + animate_end) {
            $(ele).css({
                'transform': 'translate('+ x_end +'px,'+ y_end +'px) scale('+ scale_end +')',
                'opacity': opacity_end,
                'filter': 'blur(' + blur_end + 'px)'
            })
        }

        if ($(ele).attr('data-view') === 'auto') {
            if (scrollTop >= start_distance && scrollTop < end) {
                $(ele).css({
                    'transform': 'translate(0px,' + (scrollTop - start_distance) + 'px)'
                })
            }else if (scrollTop < start_distance) {
                $(ele).css({
                    'transform': 'translate(0px,0px)'
                })
            }
            if (scrollTop >= end) {
                $(ele).css({
                    'transform': 'translate(0px,'+ end_value +'px)'
                })
            }
        }
    })
}

function easeOutQuad(t) {
    return t * (2 - t);
}