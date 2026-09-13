/* T00R 动效复现 demo —— 占位内容，与产品代码完全解耦。
   每个函数头部注明对应的 SPEC.md 条目编号与公式出处。
   参考站在 sources/ 下（function.js / index.css / main.js），本文件是它的最小可运行复刻。 */
(function () {
  'use strict';

  var MOBILE_BP = 1024;                                  // function.js:1  all_mobile = 1024
  var isDesktop = window.innerWidth > MOBILE_BP;         // function.js:6  clientWidth > all_mobile
  var clientHeight = window.innerHeight;
  var clientWidth = window.innerWidth;

  var scroller = document.getElementById('scroller');
  var content = document.getElementById('content');

  /* ============================================================
     M-01 惯性滚动
     公式（sources/main.js 的 smooth-scrollbar `_nextTick`）：
       momentum *= (1 - damping);  position += momentum_prev - momentum_next;
       |momentum| <= 0.1 → 归零
     damping：桌面 0.08，≤1024px 不启用（function.js:5-8 / 4290-4291）
     ============================================================ */
  var damping = isDesktop ? 0.08 : 0.25;                 // function.js:5-8
  var y = 0;          // 当前滚动位置（等价 scrollbar.scrollTop）
  var momentum = 0;

  function docTop(el) {                                  // 等价 jQuery.offset().top
    return el.getBoundingClientRect().top + y;
  }
  /* #scroller 是 position:fixed，文档高度恒等于视口高度，
     所以可滚动上限必须取自 #content 自身的布局高度（等价参考站
     smooth-scrollbar 的 size.content.height - size.container.height）。 */
  function limitY() {
    var h = content.offsetHeight || 0;
    return Math.max(0, h - clientHeight);
  }

  function applyTransform() {
    content.style.transform = 'translate3d(0,' + (-y) + 'px,0)';
  }

  function onNativeScroll() {                            // ≤1024px：只跑 scroll_content（M-02）
    y = window.scrollY || document.documentElement.scrollTop || 0;
    scrollContent(y);
  }

  var rafId = 0;
  function tick() {
    rafId = requestAnimationFrame(tick);
    var limit = limitY();
    if (momentum > 0.1 || momentum < -0.1) {             // 归零阈值 0.1
      var next = momentum * (1 - damping);
      y += momentum - next;
      momentum = next;
      if (y < 0) { y = 0; momentum = 0; }
      if (y > limit) { y = limit; momentum = 0; }
      applyTransform();
      scrollContent(y);
      scrollTopStart(y);                                 // 桌面：延迟 100ms 由 scrollContent 内部模拟
    } else if (momentum !== 0) {
      momentum = 0;
    }
    cursorTick();
  }

  window.addEventListener('wheel', function (e) {
    window.__t00r.wheelCount++;
    if (!isDesktop) return;
    momentum += e.deltaY;                                // sources/main.js addMomentum：delta 直接进 momentum
    if (e.cancelable) e.preventDefault();
  }, { passive: false });

  /* ============================================================
     M-02 滚动驱动管线：scroll_content 同步段 + setTimeout(100) 的
     AOS.init / scrollTop_start（sources/function.js:4580-4585）
     ============================================================ */
  var slowTimer = null;
  function scrollContent(scrollTop) {
    clearTimeout(slowTimer);
    slowTimer = setTimeout(function () {                 // 100ms 延迟
      aosInit();
      scrollTopStart(scrollTop);
    }, 100);

    /* ---- M-04 页头 .on：阈值 = clientHeight - headerHeight/2 ---- */
    var hh = header.offsetHeight;
    var distance = clientHeight - hh / 2;                 // function.js:4587
    if (scrollTop > distance) header.classList.add('on');
    else header.classList.remove('on');

    /* ---- M-13 public_text 擦除（function.js:4593-4617） ---- */
    var texts = document.querySelectorAll('.public_text');
    for (var t = 0; t < texts.length; t++) {
      var box = texts[t];
      if (!isVisible(box)) continue;
      var speed = box.getAttribute('data-speed');
      var paras = box.querySelectorAll('.p:first-child p');
      var len = paras.length;
      if (!len) continue;
      var dis = speed ? parseFloat(speed) : 200;          // 缺省 200
      var allDis = dis * len;
      for (var i = 0; i < paras.length; i++) {
        var p = paras[i];
        var start = docTop(p) - clientHeight / 1.2;       // 每个段落各自算 start
        var end = start + allDis;
        var ban = allDis / len;
        var value = 100 + (scrollTop - (start + i * ban)) / ban * -100;
        if (scrollTop >= start + i * ban && scrollTop <= end) {
          p.style.clipPath = 'inset(0 ' + value + '% 0 0)';
        } else if (scrollTop <= start + i * ban) {
          p.style.clipPath = 'inset(0 100% 0 0)';
        }
        if (scrollTop >= end) p.style.clipPath = 'inset(0 0 0 0)';
      }
    }

    /* ---- M-12 index2 双列视差（function.js:2693-2707） ---- */
    var i2 = document.querySelector('.index2');
    if (i2) {
      var flex1 = docTop(i2) - clientHeight / 3;
      if (scrollTop >= flex1) {
        setY(q(i2, '.fist:first-child .flex:first-child'), (scrollTop - flex1) * -0.02);
        setY(q(i2, '.fist:first-child .flex:nth-child(2)'), (scrollTop - flex1) * 0.1);
      }
      var firstFist = q(i2, '.fist:first-child');
      var flex2 = docTop(i2) + (firstFist ? firstFist.offsetHeight : 0);
      if (scrollTop >= flex2) {
        setY(q(i2, '.fist:last-child .flex:first-child'), (scrollTop - flex2) * -0.02);
        setY(q(i2, '.fist:last-child .flex:nth-child(2)'), (scrollTop - flex2) * 0.1);
      }
    }

    /* ---- M-18 / M-19 / M-20 index4 ---- */
    var i4 = document.querySelector('.index4');
    if (i4) {
      var index4H = clientHeight + 7000;                  // function.js:2710
      i4.style.height = index4H + 'px';
      var index4Start = docTop(i4);
      var mask = q(i4, '.mask');
      var bg = q(i4, '.bg');
      if (mask && bg) {
        var v = (scrollTop - index4Start) / 5000 * -8;     // function.js:2713
        var bgH = bg.getBoundingClientRect().height;
        var px = bgH - clientHeight;                       // function.js:2714
        var bgY = (scrollTop - index4Start) / (index4H - clientHeight) * -px;
        if (scrollTop >= index4Start) {
          mask.style.animationDelay = v + 's';
          bg.style.transform = 'translateY(' + bgY + 'px)';
        } else if (scrollTop <= index4Start) {
          mask.style.animationDelay = '0s';
          bg.style.transform = 'translateY(0px)';
        }
        var nextTop = i4.nextElementSibling ? docTop(i4.nextElementSibling) : Infinity;
        if (scrollTop >= nextTop - clientHeight) {         // function.js:2723-2726
          mask.style.animationDelay = '-8s';
          bg.style.transform = 'translateY(' + (-px) + 'px)';
        }
      }
    }

    /* ---- M-08 banner 视差 + 满屏隐藏（function.js:2686-2690 / 2730-2734） ---- */
    var bp = document.querySelector('.banner .parallax');
    if (bp) {
      if (scrollTop > 0 && scrollTop <= clientHeight) {
        bp.style.transform = 'translate3d(0px,' + (scrollTop * 0.9) + 'px,0px)';
      } else {
        bp.style.transform = 'translate3d(0px,0px,0px)';
      }
      bp.style.display = scrollTop >= clientHeight ? 'none' : 'block';
    }

    /* ---- M-32 fixed_side（function.js:4642-4646） ---- */
    if (scrollTop >= 300) fixedSide.classList.add('on');
    else fixedSide.classList.remove('on');
  }

  function q(root, sel) { return root.querySelector(sel); }
  function setY(el, px) { if (el) el.style.transform = 'translate3d(0px,' + px + 'px,0px)'; }
  function isVisible(el) { return el.offsetParent !== null && getComputedStyle(el).display !== 'none'; }

  /* ============================================================
     M-23 data-view 通用插值引擎（sources/function.js:5128-5272）
     缺省（没有 data-ease）→ 线性；data-ease="" → easeOutQuad(t) = t*(2-t)
     ============================================================ */
  function easeOutQuad(t) { return t * (2 - t); }          // function.js:5270-5272

  function scrollTopStart(scrollTop) {
    var nodes = document.querySelectorAll('[data-view]');
    for (var n = 0; n < nodes.length; n++) {
      var el = nodes[n];
      var section = el.closest('section') || el.parentElement;
      var distance = el.getAttribute('data-distance');
      distance = distance === null ? 0 : parseFloat(distance);
      var ease = el.getAttribute('data-ease');
      var start = docTop(section);
      var startDistance = start + distance;                // function.js:5144
      var animateEnd = parseFloat(el.getAttribute('data-animate')) || 0;
      var end = (section.nextElementSibling ? docTop(section.nextElementSibling) : start + section.offsetHeight) - clientHeight;
      var endValue = section.offsetHeight - clientHeight;  // function.js:5147
      var dEnd = el.getAttribute('data-distance-end');
      if (dEnd) {
        var vh = clientHeight / 10 * (parseFloat(dEnd) / 10);
        end += vh; endValue += vh;
      }
      var t = animateEnd ? (scrollTop - startDistance) / animateEnd : 0;
      var f = ease === '' ? easeOutQuad(t) : t;            // 空串才用 easeOutQuad

      if (el.hasAttribute('data-scale') || el.hasAttribute('data-opacity') || el.hasAttribute('data-blur')) {
        var scale = el.getAttribute('data-scale');
        var opacity = el.getAttribute('data-opacity');
        var blur = el.getAttribute('data-blur');
        var s = 1, o = null, b = 0;
        if (scale) { var sa = scale.split(','); s = parseFloat(sa[0]) + f * ((parseFloat(sa[0]) - parseFloat(sa[1])) * -1); }
        if (opacity) { var oa = opacity.split(','); o = parseFloat(oa[0]) + f * ((parseFloat(oa[0]) - parseFloat(oa[1])) * -1); }
        if (blur) { var ba = blur.split(','); b = parseFloat(ba[0]) + f * ((parseFloat(ba[0]) - parseFloat(ba[1])) * -1); }
        var write = function (sc, op, bl) {
          el.style.transform = 'scale(' + sc + ')';
          if (op !== null) el.style.opacity = op;
          el.style.filter = 'blur(' + bl + 'px)';
        };
        if (scrollTop >= startDistance && scrollTop < startDistance + animateEnd) write(s, o, b);
        else if (scrollTop < startDistance) {
          write(scale ? parseFloat(scale.split(',')[0]) : 1, opacity ? parseFloat(opacity.split(',')[0]) : null, blur ? parseFloat(blur.split(',')[0]) : 0);
        }
        if (scrollTop >= startDistance + animateEnd) {
          write(scale ? parseFloat(scale.split(',')[1]) : 1, opacity ? parseFloat(opacity.split(',')[1]) : null, blur ? parseFloat(blur.split(',')[1]) : 0);
        }
      }

      if (el.getAttribute('data-view') === 'auto') {       // function.js:5251-5266
        if (scrollTop >= startDistance && scrollTop < end) {
          el.style.transform = 'translate(0px,' + (scrollTop - startDistance) + 'px)';
        } else if (scrollTop < startDistance) {
          el.style.transform = 'translate(0px,0px)';
        }
        if (scrollTop >= end) {
          el.style.transform = 'translate(0px,' + endValue + 'px)';
        }
      }
    }
  }

  /* ============================================================
     M-24 AOS（sources/function.js:13-33）
     offset = rect.top - clientHeight + all_num；all_num = 150（>1024px）否则 0
     ============================================================ */
  function aosInit() {
    var allNum = clientWidth > 1024 ? 150 : 0;             // function.js:9-12
    var nodes = document.querySelectorAll('[data-aos]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var offset = el.getBoundingClientRect().top - clientHeight + allNum;
      if (offset < 0) el.classList.add('aos-animate');      // once:true → 不再移除
    }
  }

  /* ============================================================
     M-10 each_animate：拆字符 + 逐字延迟（sources/function.js:4703-4755）
     delay = index * 0.08 + 0.3 s；初始 opacity 0 / translateX(10px)
     ============================================================ */
  function eachAnimate() {
    var nodes = document.querySelectorAll('.each_animate');
    for (var n = 0; n < nodes.length; n++) {
      var el = nodes[n];
      var chars = el.textContent.split('');
      el.textContent = '';
      for (var i = 0; i < chars.length; i++) {
        var div = document.createElement('div');
        div.style.display = 'inline-block';
        div.textContent = chars[i] === ' ' ? '\u00a0' : chars[i];
        var delay = i * 0.08 + 0.3;
        div.style.transitionDelay = delay + 's';
        div.style.opacity = '0';
        div.style.transform = 'translateX(10px)';
        if (chars[i] === ' ') div.style.minWidth = '10px';
        el.appendChild(div);
      }
    }
    setTimeout(function () {                                // 加载后 10ms 加 .on
      var all = document.querySelectorAll('.each_animate');
      for (var k = 0; k < all.length; k++) all[k].classList.add('on');
    }, 10);
  }

  /* ============================================================
     M-27 / M-28 自定义光标：speed = data-speed/10（缺省 0.9）
     每帧 e = 1 - speed^deltaRatio；r += (o - r) * e
     ============================================================ */
  var cursor = document.querySelector('.fixed_cursor .cursor');
  var curSpeed = 0.9;
  if (cursor) {
    var ds = cursor.getAttribute('data-speed');
    curSpeed = ds === null ? 0.9 : parseFloat(ds) / 10;    // 首页 data-speed=8 → 0.8
  }
  var cur = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  var target = { x: cur.x, y: cur.y };
  var lastT = performance.now();

  document.body.addEventListener('mousemove', function (e) { target.x = e.clientX; target.y = e.clientY; });

  function cursorTick() {
    if (!cursor || !isDesktop) return;
    var now = performance.now();
    var deltaRatio = Math.max(0.001, (now - lastT) / 16.667);
    lastT = now;
    var e = 1 - Math.pow(curSpeed, deltaRatio);
    cur.x += (target.x - cur.x) * e;
    cur.y += (target.y - cur.y) * e;
    cursor.style.transform = 'translate(-50%, -50%) translate(' + cur.x + 'px, ' + cur.y + 'px)';
  }

  /* M-28 点击波纹：+10ms 加 .on、+250ms 加 .hide、再 +300ms 移除 */
  var mouseDownTime = 0;
  function doDiv() {
    var bor = document.createElement('div');
    bor.className = 'bor';
    cursor.querySelector('.whole').appendChild(bor);
    setTimeout(function () { bor.classList.add('on'); }, 10);
    setTimeout(function () {
      bor.classList.add('hide');
      setTimeout(function () { bor.remove(); }, 300);
    }, 250);
  }
  document.addEventListener('mousedown', function () {
    mouseDownTime = Date.now();
    cursor.querySelector('.whole').classList.add('on');
    doDiv();
  });
  document.addEventListener('mouseup', function () {
    cursor.querySelector('.whole').classList.remove('on');
    if (Date.now() - mouseDownTime > 300) doDiv();
  });

  /* ============================================================
     M-30 磁吸：x = ((clientX-left)/offsetWidth - 0.5) * strength
     strength = data-speed 或 50；TweenMax.to(el, 1, {ease: Power4.easeOut})
     Power4.easeOut = 1 - (1-t)^5
     ============================================================ */
  function power4Out(t) { return 1 - Math.pow(1 - t, 5); }

  function tween(el, dur, to) {
    var from = { x: parseFloat(el.dataset.tx || 0), y: parseFloat(el.dataset.ty || 0) };
    var t0 = performance.now();
    (function step() {
      var p = Math.min(1, (performance.now() - t0) / dur);
      var k = power4Out(p);
      var cx = from.x + (to.x - from.x) * k;
      var cy = from.y + (to.y - from.y) * k;
      el.dataset.tx = cx; el.dataset.ty = cy;
      el.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      if (p < 1) requestAnimationFrame(step);
    })();
  }

  var magnets = document.querySelectorAll('.hover_button');
  for (var mi = 0; mi < magnets.length; mi++) {
    (function (el) {
      var speedAttr = el.getAttribute('data-speed');
      var strength = speedAttr ? parseFloat(speedAttr) : 50;   // function.js:4344-4347 缺省 50
      el.addEventListener('mousemove', function (ev) {
        var r = el.getBoundingClientRect();
        tween(el, 1000, {
          x: ((ev.clientX - r.left) / el.offsetWidth - 0.5) * strength,
          y: ((ev.clientY - r.top) / el.offsetHeight - 0.5) * strength
        });
      });
      el.addEventListener('mouseout', function () { tween(el, 1000, { x: 0, y: 0 }); });
    })(magnets[mi]);
  }

  /* ============================================================
     M-14 / M-15 index3 服务切换
     transform: translateY(index * item.clientHeight px)；transition all .4s
     视频/插槽：旧的移除 .on，目标 currentTime=0 → 加 .on → play
     ============================================================ */
  var items = document.querySelectorAll('.index3 .wrap .content .item');
  var move = document.querySelector('.index3 .l .move');
  var slots = document.querySelectorAll('.picture .animate_video .slot');
  for (var ii = 0; ii < items.length; ii++) {
    (function (el, idx) {
      var attr = el.querySelector('.attr p');
      if (attr) el.querySelector('.attr').setAttribute('data-text', attr.innerHTML);
      el.addEventListener('click', function () {
        var old = 0;
        for (var k = 0; k < items.length; k++) if (items[k].classList.contains('on')) old = k;
        var index = idx;
        for (var m = 0; m < items.length; m++) items[m].classList.remove('on');
        el.classList.add('on');
        if (move) move.style.transform = 'translateY(' + index * items[0].clientHeight + 'px)';
        if (old !== index) {
          for (var s = 0; s < slots.length; s++) slots[s].classList.remove('on');
          var next = document.querySelector('.picture .animate_video ._' + (old + 1) + '_' + (index + 1));
          if (next) next.classList.add('on');
        }
      });
    })(items[ii], ii);
  }

  /* ============================================================
     M-03 / M-05 / M-06 页头
     ============================================================ */
  var header = document.getElementById('header');
  var fixedSide = document.getElementById('fixedSide');

  if (document.body.clientWidth > 1365) {                  // function.js:4558
    var logo = header.querySelector('.logo');
    logo.classList.add('animated', 'fadeInDown');
    var lis = header.querySelectorAll('.nav li');
    for (var li = 0; li < lis.length; li++) {
      lis[li].classList.add('animated', 'fadeInDown');
      lis[li].style.animationDelay = (li * 200 + 200) + 'ms';   // index*200 + 200
    }
  }
  header.querySelectorAll('.nav li').forEach(function (li) {
    li.addEventListener('mouseenter', function () { header.classList.add('undertone'); });
    li.addEventListener('mouseleave', function () { header.classList.remove('undertone'); });
  });
  window.addEventListener('wheel', function (e) {               // function.js:4662-4670
    if (e.deltaY > 0) header.classList.add('hide');
    else if (e.deltaY < 0) header.classList.remove('hide');
  });

  /* M-32 回顶：scrollTo(0, 0, 1200) */
  document.getElementById('clickTop').addEventListener('click', function () {
    var y0 = y, t0 = performance.now();
    (function step() {
      var p = Math.min(1, (performance.now() - t0) / 1200);
      y = y0 * (1 - p);
      applyTransform();
      scrollContent(y);
      if (p < 1) requestAnimationFrame(step);
    })();
  });

  /* ============================================================
     M-29 `.cut` 光标变形态（sources/function.js:4817-4824）
     触发区：.public_hover .item .img / .public_hover .background / .item_hover
     ============================================================ */
  document.addEventListener('mouseenter', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('.public_hover .item .img, .public_hover .background, .item_hover')) {
      document.querySelector('.fixed_cursor').classList.add('cut');
    }
  }, true);
  document.addEventListener('mouseleave', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('.public_hover .item .img, .public_hover .background, .item_hover')) {
      document.querySelector('.fixed_cursor').classList.remove('cut');
    }
  }, true);

  /* ============================================================
     M-17 .canvas_alert 弹层链（sources/bundle.js 内 pointerIs(e)，偏移 ~589907）
       t+0     : .canvas_alert 加 .on；#canvas / .canvasSide pointer-events:none
       t+1200ms: .canvas_alert .matter 清 .on 后第 e 项加 .on；恢复 pointer-events
       关闭     : 移除 .canvas_alert / 所有 .matter 的 .on；1200ms 后恢复 pointer-events
     ============================================================ */
  var canvasAlert = document.getElementById('canvasAlert');
  var alertTimer = null;
  function pointerIs(e) {
    if (!canvasAlert) return;
    var matters = canvasAlert.querySelectorAll('.matter');
    if (e !== -1) {
      canvasAlert.classList.add('on');
      clearTimeout(alertTimer);
      alertTimer = setTimeout(function () {
        for (var i = 0; i < matters.length; i++) matters[i].classList.remove('on');
        if (matters[e]) matters[e].classList.add('on');
      }, 1200);
    } else {
      clearTimeout(alertTimer);
      canvasAlert.classList.remove('on');
      for (var k = 0; k < matters.length; k++) matters[k].classList.remove('on');
    }
  }
  if (canvasAlert) {
    // 参考站初始内联 display:none，由内联 setTimeout(…,100) 改为 flex
    setTimeout(function () { canvasAlert.style.display = 'flex'; }, 100);
    canvasAlert.addEventListener('click', function (e) {
      if (e.target.classList.contains('close') || e.target.classList.contains('mask')) pointerIs(-1);
    });
  }
  // 首页入口：点击 .index3 的服务项 → pointerIs(index)
  for (var pi = 0; pi < items.length; pi++) {
    (function (idx) {
      items[idx].addEventListener('click', function () { pointerIs(idx); });
    })(pi);
  }

  /* ============================================================
     启动
     ============================================================ */
  function setMode() {
    isDesktop = window.innerWidth > MOBILE_BP;
    clientHeight = window.innerHeight;
    clientWidth = window.innerWidth;
    damping = isDesktop ? 0.08 : 0.25;
    document.body.classList.toggle('native-scroll', !isDesktop);
    if (!isDesktop) { momentum = 0; y = window.scrollY; content.style.transform = ''; }
  }

  /* 调试/取证钩子：等价参考站采集脚本里的 window.__setY / window.__y。
     非产品代码，仅供本 demo 自测与截图复现。 */
  window.__t00r = {
    wheelCount: 0,
    get y() { return y; },
    get momentum() { return momentum; },
    get limit() { return limitY(); },
    setY: function (v) { y = v; momentum = 0; applyTransform(); scrollContent(v); scrollTopStart(v); }
  };

  function boot() {
    setMode();
    eachAnimate();
    aosInit();
    applyTransform();
    scrollContent(0);
    scrollTopStart(0);
  }

  window.addEventListener('resize', function () {
    var wasDesktop = isDesktop;
    setMode();
    if (wasDesktop !== isDesktop) {
      y = isDesktop ? 0 : window.scrollY;
      momentum = 0;
      window.scrollTo(0, 0);
      if (isDesktop) applyTransform();
    }
    scrollContent(y);
  });

  if (isDesktop) {
    rafId = requestAnimationFrame(tick);
  } else {
    window.addEventListener('scroll', onNativeScroll);
    setInterval(function () { aosInit(); }, 200);          // 手机：AOS 由 scroll 驱动（此处做轻量补强）
  }

  boot();
})();

